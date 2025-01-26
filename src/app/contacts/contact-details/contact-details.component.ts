import { Component, Input } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {
  @Input() contact: Contact;
}
