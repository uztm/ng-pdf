import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-document-content-component',
  template: `
    <div class="document-container">
      <h1>My Dynamic Document</h1>

      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Topic</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let item of data; let i = index">
          <td>{{ i + 1 }}</td>
          <td>{{ item.topic }}</td>
          <td>{{ item.description }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  imports: [
    NgForOf
  ],
  styleUrls: ['./document-content-component.component.css']
})
export class DocumentContentComponent {
  data = Array.from({ length: 100 }, (_, i) => ({
    topic: `Topic ${i + 1}`,
    description: `Description for topic ${i + 1}`
  }));
}
