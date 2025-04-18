import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  DocumentReaderContainerComponent
} from './components/document-reader-container/document-reader-container.component';
import {DocumentContentComponent} from './components/document-content-component/document-content-component.component';

@Component({
  selector: 'app-root',
  imports: [ DocumentReaderContainerComponent, DocumentContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-pdf';
}
