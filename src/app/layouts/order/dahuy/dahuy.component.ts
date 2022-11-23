import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";

import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-dahuy',
  templateUrl: './dahuy.component.html',
  styleUrls: ['./dahuy.component.css']
})
export class DahuyComponent implements OnInit {
  orderdata:any;
  p:number=1;
  Orderdata: any;
  statusName:any;
  constructor(private service:OrderService,private toastr: ToastrService,
              private modalService: NgbModal) {
    this.loadAll3();
  }

  ngOnInit(): void {
  }

  loadAll3(){
    this.service.getBy3().subscribe(result =>{
      this.orderdata=result;
    })
  }
  Input = new FormGroup({

    status:new FormControl()
  })

  updatetrangthai(id:any,status:any) {

    if(status==0){
      this.Input.value.status=status
      this.service.updatetrangthai(this.Input.value,id).subscribe(result => {

        this.loadAll3()

      });
    }else if(status==3){
      this.Input.value.status=status
      this.service.updatetrangthai(this.Input.value,id).subscribe(result => {

        this.loadAll3()

      });
    }
  }

  openLg(content: any,id:any,status:any) {

    this.service.getOrderId(id).subscribe(result => {
      this.Orderdata = result;
      this.statusName=status
      console.log(this.Orderdata)
    })
    this.modalService.open(content, {
      size: 'lg', centered: true, scrollable: true,


    })
  }
}
