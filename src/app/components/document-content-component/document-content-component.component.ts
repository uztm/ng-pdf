import { AfterViewInit, Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Data } from './data';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ExcelExportService } from './excel.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-content-component',
  templateUrl: "./document-content-component.component.html",
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  styleUrls: ['./document-content-component.component.css']
})
export class DocumentContentComponent implements AfterViewInit, OnInit, OnDestroy {
  Data = Data
  DataContent = JSON.parse(JSON.stringify(Data.rowData));
  @ViewChild('mainTable') mainTable: ElementRef | undefined;
  private intervalId: ReturnType<typeof setInterval> | undefined;
  private previousWidth: number = 0;

  constructor(private excelExportService: ExcelExportService) { }

  exportToExcel() {
    this.excelExportService.exportToExcel(this.DataContent, this.Data);
  }

  ngOnInit(): void {
    // Dastlabki yuklash paytida kechiktirish bilan bajarilishi kerak
    setTimeout(() => {
      this.autoResizeTextareas();
    }, 300);
  }

  ngAfterViewInit() {
    // DOM to'liq yuklangandan keyin ishga tushadi
    setTimeout(() => {
      this.setupResizeWatcher();
      this.autoResizeTextareas();
    }, 500);
  }

  setupResizeWatcher() {
    // const table = document.querySelector('.main-table');
    if (this.mainTable) {
      this.previousWidth = this.mainTable.nativeElement.clientWidth;

      // Jadval o'lchamlaridagi o'zgarishlarni kuzatish
      this.intervalId = setInterval(() => {
        if (this.mainTable) {
          const currentWidth = this.mainTable.nativeElement.clientWidth;
          if (currentWidth !== this.previousWidth) {
            this.previousWidth = currentWidth;
            this.autoResizeTextareas();
          }
        }
      }, 100);
    }

    // Window o'lchamlari o'zgarganda ham yangilash
    window.addEventListener('resize', () => {
      this.autoResizeTextareas();
    });
  }

  ngOnDestroy() {
    // Intervallarni to'xtatish
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Resize eventlarni o'chirish
    window.removeEventListener('resize', () => {
      this.autoResizeTextareas();
    });
  }

  // TextArea larni o'lchamlarini moslash
  autoResizeTextareas() {
    const textareas = document.querySelectorAll('.cell-textarea');

    // Har bir textarea hajmini sozlash
    textareas.forEach((element) => {
      const textarea = element as HTMLTextAreaElement;
      // Balandlikni oldin minimal qilish
      textarea.style.height = '0px';
      // Keyin kontentga moslashtirish
      textarea.style.height = textarea.scrollHeight + 'px';

      // Event listener qo'shish (faqat birinchi marta)
      if (!textarea.dataset['resizeInitialized']) {
        textarea.addEventListener('input', () => {
          textarea.style.height = '0px';
          textarea.style.height = textarea.scrollHeight + 'px';
        });
        textarea.dataset['resizeInitialized'] = 'true';
      }
    });

    // Jadval kontentining ko'rinishini yangilash uchun
    if (this.mainTable) {
      this.mainTable.nativeElement.classList.add('initialized');
    }
  }
}