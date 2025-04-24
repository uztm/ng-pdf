import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DocumentContentComponent } from './components/document-content-component/document-content-component.component';
import { NgDocumentReaderComponent } from 'ng-document-reader';
import { ExcelExportService } from './components/document-content-component/excel.service';
import { Data } from './components/document-content-component/data';

@Component({
  selector: 'app-root',
  imports: [DocumentContentComponent, NgDocumentReaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Document no-0012190506';
  data: any = Data;
  dataContent: any = []

  constructor(private excelExportService: ExcelExportService) { }

  orientation: 'portrait' | 'landscape' = 'portrait';

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleContentChange(updatedContent: any) {
    this.dataContent = JSON.parse(JSON.stringify(updatedContent))
  }

  exportToExcel() {
    this.excelExportService.exportToExcel(this.dataContent, this.data);
  }

}
