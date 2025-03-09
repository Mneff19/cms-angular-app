import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages : Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) { 
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    message.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{message: string, newMessage: Message}>('http://localhost:3000/messages', message, {headers: headers}).subscribe(
      ({message, newMessage}) => {
        this.messages.push(newMessage);
        this.send();
      }
    );
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): Message[] {
    this.http.get<{message: string, messages: Message[]}>('http://localhost:3000/messages').subscribe(
      ({message, messages}) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.send();
      },
      (error: any) => {
        console.error(error);
      }
    );
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  send() {
    this.messageChangedEvent.next(this.messages.slice());
  }
}