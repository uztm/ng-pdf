import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import {DecimalPipe, NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-document-reader-container',
  templateUrl: './document-reader-container.component.html',
  styleUrl: './document-reader-container.component.css',
  imports: [
    NgStyle,
    DecimalPipe,
    NgClass
  ],
})
export class DocumentReaderContainerComponent implements AfterViewInit {
  @Input() orientation: 'portrait' | 'landscape' = 'portrait';
  @ViewChild('stagingContainer') stagingRef!: ElementRef;
  @ViewChild('documentRef') documentRef!: ElementRef;

  setPortrait(): void {
    this.orientation = 'portrait';
  }

  setLandscape(): void {
    this.orientation = 'landscape';
  }


  zoomLevel: number = 1; // 1 = 100%

  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 2); // max 200%
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5); // min 50%
  }




  constructor() {}

  ngAfterViewInit() {}

  printPDF(): void {
    const element = this.stagingRef.nativeElement;
    const content = element.innerHTML;

    const printWindow = window.open('', '_blank', );
    if (printWindow) {
      const sizeStyle = this.orientation === 'landscape'
        ? '@page { size: A4 landscape; }'
        : '@page { size: A4 portrait; }';

      printWindow.document.write(`
  <html>
    <head>
      <title>Print</title>
      <style>
        ${sizeStyle}
        body {
          margin: 0;
          padding: 20mm;
          font-family: sans-serif;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        table, th, td {
          border: 1px solid #000;
        }
        th, td {
          padding: 8px;
          text-align: left;
        }
      </style>
    </head>
    <body onload="window.print(); window.close();">
      ${content}
    </body>
  </html>
`);

      printWindow.document.close();
    }
  }

}
