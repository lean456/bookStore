import { Component, OnInit } from '@angular/core';

import { DataApiService } from '../../services/data-api.service';
import { BookInterface } from '../../models/book';

DataApiService
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
books:BookInterface[];
  constructor(private dataApi: DataApiService) { }

  ngOnInit(): void {
    this.getListBooks();
  }



  getListBooks(){
    this.dataApi.getAllBooks().subscribe(data => {
      this.books = data;
     console.log(data);
    })
  }

  // checkOffer(){
  //  let ofers:BookInterface[] = this.getListBooks();
  //   for(let i = 0; i<ofers.length;i++){
  //     if()
  //   }
  // }
}
