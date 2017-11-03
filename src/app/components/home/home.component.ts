import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   active:boolean[] = [];
   tabs:{ header:string }[] = [
      { header: "1st" },
   ];

   constructor() {
   }

   ngOnInit() {
   }

}
