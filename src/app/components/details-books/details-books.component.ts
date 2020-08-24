import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookInterface } from '../../models/book';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details-books',
  templateUrl: './details-books.component.html',
  styleUrls: ['./details-books.component.css']
})
export class DetailsBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route:ActivatedRoute) { }

  public book: BookInterface = {};
  ngOnInit(): void {
    const idBook = this.route.snapshot.params['id'];
    this.getDeatils(idBook);
  }


  getDeatils(id:string):void{
    this.dataApi.getOneBook(id).subscribe(book => {
      this.book = book;
    });
  }
}
