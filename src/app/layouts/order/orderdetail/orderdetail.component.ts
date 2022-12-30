import {TokenStorageService} from './../../../@core/services/Token-storage.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup} from "@angular/forms";
import {ExportService} from "../../../service/export.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderTimeline} from "../../../@core/models/OrderTimeline";
import {OrdertimlineService} from "../../../service/ordertimline.service";

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  Orderid: any;
  orderdetail: any;
  order: any;
  status: any;
  username: any;
  type: any;
  description?:String;
  ordertimeline: OrderTimeline = {};
listordertimeline:any;
  constructor(private modalService: NgbModal,
              private ordertimelineservice: OrdertimlineService,
              private tokenservice: TokenStorageService,
              private route: ActivatedRoute,
              private service: OrderService,
              private toastr: ToastrService, private router: Router, private exportService: ExportService,
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

  logout() {
    this.tokenService.logout();
    this.toastr.success("Đã đăng xuất")
    this.router.navigate(['/login']);
  }

  delete(id: any) {
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

  pdfphieugiaohang(id: any) {
    this.exportService.pdfphieugiaohang(id).subscribe(result => {

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

  updatetrangthai(id: any) {
    this.username = this.tokenservice.getUser();
    this.ordertimeline.account_name = this.username;
    this.ordertimeline.order_id = this.order.id;
    if (this.status == 1) {
      if (confirm("xác nhận đơn hàng")) {
        this.Input.value.status = this.status
        this.type = 'Xác nhận đơn hàng';
        this.ordertimeline.type = this.type;

        this.ordertimeline.description = this.description;
        console.log(this.description)
        console.log(this.ordertimeline)
        this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
          this.ordertimeline = result;
          console.log(this.ordertimeline)
        })

        this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
          this.router.navigate(['/order/chuanbihang'])
        });
      }
    } else if (this.status == 4) {
      if (confirm("Xác nhân hủy đơn hàng")) {
        this.Input.value.status = this.status
        this.type = 'Hủy đơn hàng';
        this.ordertimeline.type = this.type;
        this.ordertimeline.description = this.description;
        console.log(this.description)
        console.log(this.ordertimeline)
        this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
          this.ordertimeline = result;
          console.log(this.ordertimeline)
        })
        this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
          this.router.navigate(['/order/dahuy'])
        });
      }
    } else if (this.status == 2) {
      if (confirm("Xác nhân giao đơn hàng")) {
        this.Input.value.status = this.status
        this.type = 'Giao đơn hàng';
        this.ordertimeline.type = this.type;

        this.ordertimeline.description = this.description;
        console.log(this.description)
        console.log(this.ordertimeline)
        this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
          this.ordertimeline = result;
          console.log(this.ordertimeline)
        })
        this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
          location.reload()
        });
      }
    } else if (this.status == 3) {
      if (confirm("Hoàn thành đơn hàng")) {
        this.Input.value.status = this.status;
        this.type = 'Hoàn thành đơn hàng';
        this.ordertimeline.type = this.type;

        this.ordertimeline.description = this.description;
        console.log(this.description)
        console.log(this.ordertimeline)
        this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
          this.ordertimeline = result;
          console.log(this.ordertimeline)
        })
        this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
          location.reload()
        });
      }
    }
  }

  openmadal(content: any, status: any) {
    this.status = status;
    this.modalService.open(content, {
        size: 'lg', centered: true, scrollable: true,


      }
    );

  }
  openmodaltimeline(timeline:any){
    this.username = this.tokenservice.getUser();
    this.ordertimeline.account_name = this.username;
    this.ordertimeline.order_id = this.order.id;
    this.ordertimelineservice.getby(this.ordertimeline).subscribe(data=>{
      this.listordertimeline=data;
    })
    this.modalService.open(timeline, {
        size: 'xl', centered: true, scrollable: true,


      }
    );
  }
}
