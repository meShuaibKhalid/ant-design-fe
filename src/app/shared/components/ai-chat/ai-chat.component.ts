import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss',
})
export class AiChatComponent {
  chat: any[] = [];
  message: FormControl<string> = new FormControl();

  ngOnInit() {
    const message = {
      text: 'Hello',
      type: 'sender',
    };

    const message1 = {
      text: 'Hello, how can I help you?',
      type: 'receiver',
    };

    this.chat.push(message, message1)
  }

  sendMessage(event?: any): void {
    if (event?.keyCode === 13) {
      event.preventDefault();
      const message = {
        text: this.message.value,
        type: 'sender',
      };
      this.chat.push(message);
      if (message?.text?.toLowerCase()?.trim() === 'hello') {
        const message = {
          text: 'Hello, how can I help you?',
          type: 'receiver',
        };
        this.chat.push(message);
      }
      this.message.setValue('');
    }
  }
}
