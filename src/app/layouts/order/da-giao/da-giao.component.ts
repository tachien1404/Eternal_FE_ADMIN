import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";

@Component({
  selector: 'app-da-giao',
  templateUrl: './da-giao.component.html',
  styleUrls: ['./da-giao.component.css']
})
export class DaGiaoComponent implements OnInit {
  orderdata:any;
  constructor(private service:OrderService) { this.loadAll2(); }

  ngOnInit(): void {
  }
loadAll2(){
  this.service.getBy2().subscribe(result =>{
    this.orderdata=result;
  })
}

}
