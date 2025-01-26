import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages : Message[] = [
    {
      id: '1',
      subject: 'This is a subject',
      msgText: 'This is a message',
      sender: 'Matthew Neff'
    },
    {
      id: '2',
      subject: 'This is another subject',
      msgText: 'This is another message',
      sender: 'Matthew Neff'
    }
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
