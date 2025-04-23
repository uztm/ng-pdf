import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDocumentReaderComponent } from './ng-document-reader.component';

describe('NgDocumentReaderComponent', () => {
  let component: NgDocumentReaderComponent;
  let fixture: ComponentFixture<NgDocumentReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDocumentReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgDocumentReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
