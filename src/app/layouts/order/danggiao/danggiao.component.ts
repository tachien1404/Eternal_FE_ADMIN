import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";

@Component({
  selector: 'app-danggiao',
  templateUrl: './danggiao.component.html',
  styleUrls: ['./danggiao.component.css']
})
export class DanggiaoComponent implements OnInit {
  orderdata:any;
  constructor( private service:OrderService) {
    this.loadAll1();
  }

  ngOnInit(): void {
  }
loadAll1(){
    this.service.getBy1().subscribe(result =>{
      this.orderdata=result;
    })
}
}
