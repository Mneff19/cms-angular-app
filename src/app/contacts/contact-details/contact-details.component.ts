import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent implements OnInit{
  contact: Contact;

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.contact = this.contactsService.getContact(id);
    });
  }

  onDelete() {
    this.contactsService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}
