import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public localStorage = localStorage;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // if (!!localStorage.getItem('token')) {
    //   if (!!localStorage.getItem('admin')) {
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     this.router.navigate(['/home']);
    //   }
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }
}
