import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderdata: any;
  start?: any=null;
  end?: any=null;
  Orderdata: any;
  statusName: any;
  p: number = 1;
  status: any=null;
  keyword: any=null;
index:any=0;
  constructor(private service: OrderService,
              private toastr: ToastrService,
              private modalService: NgbModal) {
    this.loadAll('')
  }

  ngOnInit(): void {


  }

  Input = new FormGroup(
    {
      start: new FormControl(),
      end: new FormControl(),
      keyword: new FormControl(),
      status: new FormControl()
    }
  )
timkiem(){
  this.Input.value.status = this.status;
  if(this.keyword==""){
    this.Input.value.keyword=null;
  }else{
    this.Input.value.keyword=this.keyword;
  }

  this.Input.value.end=this.end;
  this.Input.value.start=this.start;
  this.service.timkiem(this.Input.value).subscribe(result =>{
    this.orderdata=result
  })
}
  loadAll(status: any) {
    //trường hợp getall
    if (status == '') {
      this.Input.value.status = null;

      this.service.getByPage(this.Input.value).subscribe(data => {
        this.orderdata = data;
      })

    } else {
      //trường hợp get theo trạng thái
      this.Input.value.status = status;
      this.status=status;
      this.service.getByPage(this.Input.value).subscribe(data => {
        this.orderdata = data;
      })
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


}
