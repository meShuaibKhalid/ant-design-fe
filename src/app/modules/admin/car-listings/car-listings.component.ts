import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Observable, Subject, forkJoin, map, takeUntil } from 'rxjs';
import { CAR_FEATURES } from '../../../shared/constants';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Loader } from '../../../shared/services/loader.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export interface CarI {
  _id?: string;
  model: string;
  images: string[];
  description: string;
  year: number;
  mileage: number;
  price: number;
  sale: boolean;
  transmission: string;
  doors: number;
  fuelType: string;
  seats: number;
  engine: string;
  color: string;
  condition: string;
  features: string;
}
@Component({
  selector: 'app-car-listings',
  templateUrl: './car-listings.component.html',
  styleUrl: './car-listings.component.scss',
})
export class CarListingsComponent {
  cars: CarI[] = [];
  isVisible = false;
  editId!: string;
  isEdit = false;
  validateForm!: FormGroup;
  features: string[] = [];
  ngDestroy$ = new Subject<void>();
  uploadedFiles = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService,
    private loader: Loader
  ) {}

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  ngOnInit(): void {
    this.initForm();
    this.getCars();
    this.features = CAR_FEATURES;
  }

  initForm() {
    this.validateForm = this.fb.group({
      model: ['', [Validators.required]],
      images: [[]],
      description: ['', [Validators.required]],
      year: ['', [Validators.required]],
      mileage: ['', [Validators.required]],
      price: ['', [Validators.required]],
      sale: [false, [Validators.required]],
      transmission: ['', [Validators.required]],
      doors: [null, [Validators.required]],
      fuelType: ['', [Validators.required]],
      seats: [null, [Validators.required]],
      engine: ['', [Validators.required]],
      color: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      features: [[], [Validators.required]],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  getCars() {
    this.loader.show();
    this.apiService
      .getallCars()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((cars: any) => {
        this.cars = cars;
        this.loader.hide();
      });
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.validateForm.updateValueAndValidity();
    this.isVisible = false;
    this.isEdit = false;
    this.loader.hide();
  }

  handleOk(): void {
    this.loader.show();
    if (this.isEdit) {
      const filesToBeUploaded = this.fileList.filter((file) => !file.url);
      const alreadyUploadedFiles = this.fileList
        .filter((file) => file.url)
        .map((file) => file.url);
      if (filesToBeUploaded.length) {
        this.uploadImagesToFirebase().subscribe((urls) => {
          this.loader.hide();
          if (alreadyUploadedFiles?.length) {
            this.validateForm.value.images = [...alreadyUploadedFiles, ...urls];
          } else {
            this.validateForm.value.images = urls;
          }
          this.apiService
            .updateCarData(this.validateForm.value, this.editId)
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(() => {
              this.loader.hide();
              this.getCars();
            });
        });
      } else {
        this.validateForm.value.images = alreadyUploadedFiles;
        this.apiService
          .updateCarData(this.validateForm.value, this.editId)
          .pipe(takeUntil(this.ngDestroy$))
          .subscribe(() => {
            this.loader.hide();
            this.getCars();
          });
      }
    } else {
      this.uploadImagesToFirebase().subscribe((urls) => {
        this.validateForm.value.images = urls;
        this.apiService
          .addCarData(this.validateForm.value)
          .pipe(takeUntil(this.ngDestroy$))
          .subscribe(() => {
            this.loader.hide();
            this.getCars();
          });
      });
    }
    this.isVisible = false;
    this.isEdit = false;
  }

  deleteRow(id?: string) {
    this.loader.show();
    this.apiService
      .deleteCarData(id!)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        this.loader.hide();
        this.getCars();
      });
  }

  editRow(data: any) {
    this.editId = data._id;
    this.isEdit = true;
    this.validateForm.patchValue(data);
    this.fileList = data.images
      .filter((img) => img)
      .map((image, index) => {
        return {
          uid: `-${index}`,
          status: 'done',
          url: image,
        };
      });
    this.validateForm.updateValueAndValidity();
    this.showModal();
  }

  onFileUpload(ev) {
    this.uploadedFiles = ev.fileList.map((file) => {
      return file.originFileObj;
    });
  }

  uploadImagesToFirebase(): Observable<string[]> {
    const uploadObservables: Observable<any>[] = this.uploadedFiles.map(
      (file) => {
        return this.apiService.uploadFile(file);
      }
    );

    return forkJoin(uploadObservables).pipe(
      map((urls: any[]) => {
        return urls.map((url) => url.imageUrl);
      })
    );
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
