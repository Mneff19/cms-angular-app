import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../contacts.model';
import { NgForm } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactsService.getContact(id);
      if (!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
    });
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let newContact = new Contact();
    newContact.name = value.name;
    newContact.email = value.email;
    newContact.phone = value.phone;
    newContact.imageUrl = value.imageUrl;
    newContact.group = null;

    if (this.editMode) {
      newContact.id = this.contact.id;
      this.contactsService.updateContact(this.contact, newContact);
    }
    else {
      this.contactsService.addContact(newContact);
    }
  }
}
