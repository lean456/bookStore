import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { BookInterface } from '../../../models/book';
import {NgForm} from '@angular/forms'
@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
   books: BookInterface[];

  ngOnInit(): void {
    this.getListBooks();
  }

  getListBooks(){
    this.dataApi.getAllBooks().subscribe(data => {
      this.books = data;
     console.log(data);
    })
  }

  onDeleteBook(idBook:string){
    const confirmacion = confirm('Are you sure?')
    if(confirmacion) {

      this.dataApi.deleteBook(idBook)
    }
  }

 
  
}
