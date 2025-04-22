import { Component, OnInit } from '@angular/core';
import { Data } from './data';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-document-content-component',
  templateUrl: "./document-content-component.component.html",
  imports: [NgFor],
  styleUrls: ['./document-content-component.component.css']
})
export class DocumentContentComponent implements OnInit {

  Data = Data
  ngOnInit(){
    console.log(this.Data)

  }
}
