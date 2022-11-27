import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {FormControl, FormGroup} from "@angular/forms";

import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-choxacnhan',
  templateUrl: './choxacnhan.component.html',
  styleUrls: ['./choxacnhan.component.css']
})
export class ChoxacnhanComponent implements OnInit {
  orderdata: any;
  isActive: boolean = true;
  p: number = 1;
  Orderdata: any;
  statusName: any;
  private liste: any [] = [];

  constructor(private service: OrderService, private toastr: ToastrService,
              private modalService: NgbModal) {
    this.loadAll0();
  }

  ngOnInit(): void {
  }

  loadAll0() {
    this.service.getBy0().subscribe(result => {
      this.orderdata = result;
    })
  }

  Input = new FormGroup({

    status: new FormControl()
  })

  updatetatca(status: any) {
    this.service.updatetatca(status).subscribe(result => {
      this.loadAll0()
    })


  }


  updatetrangthai(id: any, status: any) {

    if (status == 1) {
      this.Input.value.status = status
      this.service.updatetrangthai(this.Input.value, id).subscribe(result => {

        this.loadAll0()

      });
    } else if (status == 3) {
      this.Input.value.status = status
      this.service.updatetrangthai(this.Input.value, id).subscribe(result => {

        this.loadAll0()

      });
    }
  }


  openLg(content: any, id: any, status: any) {

    this.service.getOrderId(id).subscribe(result => {
      this.Orderdata = result;
      this.statusName = status
      console.log(this.Orderdata)
    })
    this.modalService.open(content, {
      size: 'lg', centered: true, scrollable: true,


    })
  }

}
