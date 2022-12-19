import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-don-off',
  templateUrl: './don-off.component.html',
  styleUrls: ['./don-off.component.css']
})
export class DonOffComponent implements OnInit {
  orderdata:any;
  p:number=1;
  Orderdata: any;
  statusName:any;
  constructor(private service:OrderService,private toastr: ToastrService,
              private modalService: NgbModal) {
    this.load7();
  }

  ngOnInit(): void {
  }
load7(){
  this.service.getBy7().subscribe(result =>{
    this.orderdata=result;
  })
}
}
