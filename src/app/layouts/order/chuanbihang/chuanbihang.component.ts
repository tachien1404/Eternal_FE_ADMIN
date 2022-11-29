import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-chuanbihang',
  templateUrl: './chuanbihang.component.html',
  styleUrls: ['./chuanbihang.component.css']
})
export class ChuanbihangComponent implements OnInit {
  orderdata: any;
  p: number = 1;
  constructor(private service: OrderService, private toastr: ToastrService) {
    this.loadAll1();
  }

  ngOnInit(): void {
  }
  loadAll1() {
    this.service.getBy1().subscribe(result => {
      this.orderdata = result;
    })
  }
}
