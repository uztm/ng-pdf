import { Component } from '@angular/core';

import {DocumentContentComponent} from './components/document-content-component/document-content-component.component';
import {NgReportContainerComponent} from './components/ng-report-container/ng-report-container.component';

@Component({
  selector: 'app-root',
  imports: [ DocumentContentComponent, NgReportContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Document no-0012190506';


  orientation: 'portrait' | 'landscape' = 'portrait';

}
