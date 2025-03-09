import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    this.http.get<{message: string, contacts: Contact[]}>('http://localhost:3000/contacts').subscribe(
      ({message, contacts}) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.send();
      },
      (error: any) => {
        console.error(error);
      }
    );
    return this.contacts.slice();
  }

  getContact(id: string) {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id).subscribe(
      (response: Response) => {
        this.contacts.splice(pos, 1);
        this.send();
      }
    );
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    contact.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{message: string, contact: Contact}>('http://localhost:3000/contacts', contact, {headers: headers}).subscribe(
      ({message, contact}) => {
        this.contacts.push(contact);
        this.send();
      }
    );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/contacts/' + originalContact.id, newContact, {headers: headers}).subscribe(
      (response: Response) => {
        this.contacts[pos] = newContact;
        this.send();
      }
    );
  }

  send() {
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
