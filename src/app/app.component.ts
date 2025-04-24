import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DocumentContentComponent } from './components/document-content-component/document-content-component.component';
import { NgDocumentReaderComponent } from 'ng-document-reader';

@Component({
  selector: 'app-root',
  imports: [DocumentContentComponent, NgDocumentReaderComponent, CommonModule],
templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Document no-0012190506';


  orientation: 'portrait' | 'landscape' = 'portrait';

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
