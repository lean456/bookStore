import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
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

  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid:string;

  ngOnInit(): void {
  }

  onSaveBook(bookForm:NgForm):void {
  //Si es vacio, creo un nuevo libro
    if(bookForm.value.id === null){

      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    } else{
      //Si no es vacio(viene id) estamos actualizando un registro
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
