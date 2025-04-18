import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-document-reader-container',
  templateUrl: './document-reader-container.component.html',
  styleUrls: ['./document-reader-container.component.css']
})
export class DocumentReaderContainerComponent implements AfterViewInit {
  @ViewChild('stagingContainer') stagingRef!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    // Nothing to do here for now
  }

  printPDF(): void {
    const element = this.stagingRef.nativeElement;
    const content = element.innerHTML;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body onload="window.print(); window.close();">
          ${content}
        </body>
      </html>
    `);
      printWindow.document.close();
    }
  }





  downloadPDF(): void {
    const doc = new jsPDF();

    const element = this.stagingRef.nativeElement;




    // You can specify the margins and other configurations here for the PDF
    doc.html(element, {
      callback: function (doc) {
        // After generating the PDF, save it
        doc.save('document.pdf');

      },
      margin: [10, 0, 25, 0], // Margins (Top, Right, Bottom, Left)
      x: 10,  // x position
      y: 10,  // y position
      width: 190,  // Set width for content (A4 page width)
      windowWidth: 650,  // Adjust according to the width of your document content


    });
  }
}
