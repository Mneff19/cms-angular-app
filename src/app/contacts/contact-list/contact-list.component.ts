import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contacts.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
    this.subscription = this.contactsService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
