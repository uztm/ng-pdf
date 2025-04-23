import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DecimalPipe, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'lib-ng-document-reader',
  standalone: true,
  imports: [DecimalPipe, NgClass, NgStyle],
  styleUrls: ['./ng-document-reader.component.css'],
  template: `
    <div class="header">
      <div class="header-inner">
        <h1 class="title">NgPDF</h1>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2"></div>
          <div class="flex gap-2">
            <button (click)="printPDF()" type="button" class="btn">
              print
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="control-panel">
      <div class="control-box">
        <div class="w-12 text-center font-medium">{{ (zoomLevel * 100) | number:'1.0-0' }}%</div>

        <button (click)="zoomIn()" class="control-btn">
+
        </button>

        <button (click)="zoomOut()" class="control-btn">
          -
        </button>
      </div>

      <div class="control-box mt-5">
        <button
          (click)="setPortrait()"
          [ngClass]="{ 'active': orientation === 'portrait' }"
          class="control-btn">
          V
        </button>

        <button
          (click)="setLandscape()"
          [ngClass]="{ 'active': orientation === 'landscape' }"
          class="control-btn">
          H
        </button>
      </div>
    </div>

    <div class="document-wrapper">
      <div
        id="document"
        #documentRef
        class="document"
        [ngStyle]="{ width: orientation === 'landscape' ? '297mm' : '210mm', padding: '20mm' }"
        [style.transform]="'scale(' + zoomLevel + ')'">
        <div #stagingContainer>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class NgDocumentReaderComponent implements AfterViewInit {
  @Input() orientation: 'portrait' | 'landscape' = 'portrait';
  @ViewChild('stagingContainer') stagingRef!: ElementRef;
  @ViewChild('documentRef') documentRef!: ElementRef;

  zoomLevel: number = 1;

  constructor() {}

  ngAfterViewInit(): void {}

  setPortrait(): void {
    this.orientation = 'portrait';
  }

  setLandscape(): void {
    this.orientation = 'landscape';
  }

  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 2);
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5);
  }

  // Corrected this method to be inside the class
  getStyledHTML(element: HTMLElement): string {
    const clone = element.cloneNode(true) as HTMLElement;
    const allElements = clone.querySelectorAll("*");

    allElements.forEach((el, i) => {
      const original = element.querySelectorAll("*")[i] as HTMLElement;
      const style = window.getComputedStyle(original);

      let styleString = "";
      for (let j = 0; j < style.length; j++) {
        const key = style[j];
        styleString += `${key}:${style.getPropertyValue(key)};`;
      }
      (el as HTMLElement).setAttribute("style", styleString);
    });

    return clone.outerHTML;
  }

  printPDF(): void {
    const element = this.stagingRef.nativeElement;
    const styledContent = this.getStyledHTML(element);

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            @page { size: A4 portrait; }
            body {
              font-family: sans-serif;
              margin: 0;
            }

            /* Injecting the print color fix */
            @media print {
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${styledContent}
        </body>
      </html>
    `);
      printWindow.document.close();
    }
  }

// code send
}



