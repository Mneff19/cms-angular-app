import { Component, OnInit } from '@angular/core';
import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WindRefService } from '../../win-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.document = this.documentsService.getDocument(id);
    });
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (this.document && this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
