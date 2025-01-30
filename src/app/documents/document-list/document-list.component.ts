import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents : Document[] = [
    {
      name: 'Document 1',
      description: 'This is the first document',
      url: 'http://example.com/doc1'
    },
    {
      name: 'Document 2',
      description: 'This is the second document',
      url: 'http://example.com/doc2'
    },
    {
      name: 'Document 3',
      description: 'This is the third document',
      url: 'http://example.com/doc3'
    },
    {
      name: 'Document 4',
      description: 'This is the fourth document',
      url: 'http://example.com/doc4'
    }
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
