import { Component } from '@angular/core';
import {NgDocumentReaderComponent} from 'ng-document-reader';
import {DocumentContentComponent} from './components/document-content-component/document-content-component.component';

@Component({
  selector: 'app-root',
  imports: [NgDocumentReaderComponent, DocumentContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-pdf';
}
