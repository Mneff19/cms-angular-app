import { Component, Input } from '@angular/core';
import { Contact } from './contacts.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  selectedContact : Contact;
}
