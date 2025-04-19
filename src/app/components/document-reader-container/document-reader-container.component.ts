import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-document-reader-container',
  templateUrl: './document-reader-container.component.html',
  styleUrls: ['./document-reader-container.component.css'],
  imports: [
    DecimalPipe
  ]
})
export class DocumentReaderContainerComponent implements AfterViewInit, OnChanges {
  @Input() orientation: 'portrait' | 'landscape' = 'portrait'; // explicitly typed Input
  @ViewChild('stagingContainer') stagingRef!: ElementRef;
  @ViewChild('documentRef') documentRef!: ElementRef;

  zoomLevel: number = 1; // 1 = 100%

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.orientation) {
    //   // Handle orientation changes if needed
    // }
  }

  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 2); // max 200%
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5); // min 50%
  }

  resetZoom(): void {
    this.zoomLevel = 1;
  }

  printPDF(): void {
    const element = this.stagingRef.nativeElement;
    const content = element.innerHTML;

    const printWindow = window.open();
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

  constructor() {}

  ngAfterViewInit() {
    // Any other initialization can go here
  }
}
