import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-tatca',
  templateUrl: './tatca.component.html',
  styleUrls: ['./tatca.component.css']
})
export class TatcaComponent implements OnInit {
  orderdata: any;
  dataSource: any;
  Orderdata: any;
 statusName:any;
  p: number = 1;

  constructor(
    private service: OrderService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.loadAll();

  }

  ngOnInit(): void {
  }

  Input = new FormGroup(
    {
      pageIndex: new FormControl('1'),
      pageSize: new FormControl('1000'),
      keyword: new FormControl('', Validators.required)
    }
  )

  loadAll() {
    if (this.Input.valid) {
      this.service.getByPage(this.Input.value).subscribe(result => {
        this.orderdata = result;
        console.log(this.orderdata)

      })
    } else {

      this.Input = new FormGroup({
        pageIndex: new FormControl('1'),
        pageSize: new FormControl('1000'),
        keyword: new FormControl()
      });
      this.service.getByPage(this.Input.value).subscribe(result => {
        this.orderdata = result;
        console.log(this.orderdata)

      })
    }

  };



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

  get keyword() {
    return this.Input.get('keyword');
  }
}
