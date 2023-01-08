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
  statusName: any;
  p: number = 1;
  status: any;

  constructor(
    private service: OrderService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {


  }

  ngOnInit(): void {
    this.loadAll(this.status);
  }

  Input = new FormGroup(
    {
      pageIndex: new FormControl('1'),
      pageSize: new FormControl('1000'),
      keyword: new FormControl('', Validators.required),
      status: new FormControl('')
    }
  )

  loadAll(status: any) {
    if (this.Input.valid) {
      if (status != 100) {
        this.Input.value.status = status;
        this.service.getByPage(this.Input.value).subscribe(result => {
          this.orderdata = result;
        })
      }else{
        this.service.getByPage(this.Input.value).subscribe(result => {
          this.orderdata = result;
        })
      }

    } else {
      if (status != 100) {
        this.Input = new FormGroup({
          pageIndex: new FormControl('1'),
          pageSize: new FormControl('1000'),
          keyword: new FormControl(),
          status: new FormControl()
        });
        this.Input.value.status = status;
        this.service.getByPage(this.Input.value).subscribe(result => {
          this.orderdata = result;
        })
      }else{
        this.Input = new FormGroup({
          pageIndex: new FormControl('1'),
          pageSize: new FormControl('1000'),
          keyword: new FormControl(),
          status: new FormControl()
        });

        this.service.getByPage(this.Input.value).subscribe(result => {
          this.orderdata = result;
        })
      }

    }

  };


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

  get keyword() {
    return this.Input.get('keyword');
  }
}
