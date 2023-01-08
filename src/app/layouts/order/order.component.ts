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

  Orderdata: any;
  statusName: any;
  p: number = 1;
  status: any;

  constructor(private service: OrderService,
              private toastr: ToastrService,
              private modalService: NgbModal) {
    this.loadAll('')
  }

  ngOnInit(): void {


  }

  Input = new FormGroup(
    {

      keyword: new FormControl(),
      status: new FormControl()
    }
  )

  loadAll(status: any) {
    //trường hợp getall
   if(status==''){
     this.Input.value.status=null;
     this.service.getByPage(this.Input.value).subscribe(data=>{
       this.orderdata=data;
     })

   }else {
     //trường hợp get theo trạng thái
     this.Input.value.status=status;
     this.service.getByPage(this.Input.value).subscribe(data=>{
       this.orderdata=data;
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

  get keyword() {
    return this.Input.get('keyword');
  }
}
