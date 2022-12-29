import { TokenStorageService } from './../../../@core/services/Token-storage.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup} from "@angular/forms";
import {ExportService} from "../../../service/export.service";

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  Orderid: any;
  orderdetail: any;
  order: any;


  constructor(
    private route: ActivatedRoute,
    private service: OrderService,
    private toastr: ToastrService,private router: Router,private exportService :ExportService,
    private tokenService: TokenStorageService,) {
    this.Orderid = this.route.snapshot.paramMap.get('id');
    console.log(this.Orderid)
    if (this.Orderid != null && this.Orderid >= 0) {
      this.getByOrderId(this.Orderid);
      this.getOrderById(this.Orderid);
    }
  }

  ngOnInit(): void {
  }
  logout(){
    this.tokenService.logout();
    this.toastr.success("Đã đăng xuất")
    this.router.navigate(['/login']);
  }
  delete(id:any){
    //xóa đơn chi tiết
    console.log(id)

    this.Orderid = this.route.snapshot.paramMap.get('id');
    console.log(this.Orderid)
    if (confirm("Do you want remove?")) {
      this.service.delete(id).subscribe(result => {
        this.getByOrderId(this.Orderid);
      });
    }
  }
  getByOrderId(id: any) {//lấy ra chi tiết đơn
    this.service.getOrderId(id).subscribe(result => {
      this.orderdetail = result;

      console.log(this.orderdetail)
    })
  }
  pdfphieugiaohang(id:any){
    this.exportService.pdfphieugiaohang(id).subscribe(result=>{

    })


  }
  getOrderById(id: any) {//lấy ra thông tin đặt hàng
    this.service.getOrderById(id).subscribe(result => {
      this.order = result;
      console.log(this.order)
    })
  }
  Input = new FormGroup({

    status: new FormControl()
  })
  updatetrangthai(id: any, status: any) {

    if (status == 1) {
      if (confirm("xác nhận đơn hàng")) {
      this.Input.value.status = status
      console.log(id)
      this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
        this.router.navigate(['/order/chuanbihang'])
      });}
    } else if (status == 4) {
      if (confirm("Xác nhân hủy đơn hàng")) {
      this.Input.value.status = status
      this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
        this.router.navigate(['/order/dahuy'])
      });
    }
    } else if (status == 2) {
      if (confirm("Xác nhân giao đơn hàng")) {
        this.Input.value.status = status
        this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
          location.reload()
        });
      }
    } else if (status == 3) {
      if (confirm("Hoàn thành đơn hàng")) {
        this.Input.value.status = status
        this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
          location.reload()
        });
      }}
  }
}
