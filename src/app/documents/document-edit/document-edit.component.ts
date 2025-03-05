import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentsService: DocumentsService,
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

      this.originalDocument = this.documentsService.getDocument(id);
      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let newDocument = new Document();
    newDocument.name = value.name;
    newDocument.description = value.description;
    newDocument.url = value.url;

    if (this.editMode) {
      newDocument.id = this.document.id;
      this.documentsService.updateDocument(this.originalDocument, newDocument);
    }
    else {
      this.documentsService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
}
