import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";

@Component({
  selector: 'app-dahuy',
  templateUrl: './dahuy.component.html',
  styleUrls: ['./dahuy.component.css']
})
export class DahuyComponent implements OnInit {
  orderdata:any;
  constructor(private service:OrderService) {
    this.loadAll3();
  }

  ngOnInit(): void {
  }

  loadAll3(){
    this.service.getBy3().subscribe(result =>{
      this.orderdata=result;
    })
  }
}
