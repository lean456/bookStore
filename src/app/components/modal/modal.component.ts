import { Component, OnInit } from '@angular/core';
import { BookInterface } from '../../models/book';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }

  ngOnInit(): void {
  }

  onSaveBook(bookForm:NgForm):void {
    this.dataApi.addBook(bookForm.value);
    console.log('se guardo');
  }
}
