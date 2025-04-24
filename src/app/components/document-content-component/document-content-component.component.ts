import { AfterViewInit, Component, OnInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { Data } from './data';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-content-component',
  templateUrl: "./document-content-component.component.html",
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  styleUrls: ['./document-content-component.component.css']
})
export class DocumentContentComponent implements AfterViewInit, OnInit, OnDestroy {

  Data = Data
  DataContent = JSON.parse(JSON.stringify(this.Data.rowData));
  @Output() dataContentChange = new EventEmitter<any>();

  onContentChanged() {
    this.dataContentChange.emit(this.DataContent);
  }
  // @Output() DataContentChange: any;

  @ViewChild('mainTable') mainTable?: ElementRef<HTMLTableElement>;
  @ViewChildren('cellTextarea') textareas!: QueryList<ElementRef<HTMLTextAreaElement>>;

  private intervalId: ReturnType<typeof setInterval> | undefined;
  private previousWidth: number = 0;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.autoResizeTextareas();
    }, 300);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupResizeWatcher();
      this.autoResizeTextareas();
    }, 500);
  }

  setupResizeWatcher() {
    if (this.mainTable) {
      this.previousWidth = this.mainTable.nativeElement.clientWidth;

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

    window.addEventListener('resize', () => {
      this.autoResizeTextareas();
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    window.removeEventListener('resize', () => {
      this.autoResizeTextareas();
    });
  }

  autoResizeTextareas() {
    this.textareas.forEach((element: ElementRef<HTMLTextAreaElement>) => {
      const textarea = element.nativeElement;
      textarea.style.height = '0px';
      textarea.style.height = textarea.scrollHeight + 'px';

      if (!textarea.dataset['resizeInitialized']) {
        textarea.addEventListener('input', () => {
          textarea.style.height = '0px';
          textarea.style.height = textarea.scrollHeight + 'px';
        });
        textarea.dataset['resizeInitialized'] = 'true';
      }
    });

    if (this.mainTable) {
      this.mainTable.nativeElement.classList.add('initialized');
    }
  }
}