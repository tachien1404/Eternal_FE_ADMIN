import {TokenStorageService} from './../../../@core/services/Token-storage.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExportService} from "../../../service/export.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderTimeline} from "../../../@core/models/OrderTimeline";
import {OrdertimlineService} from "../../../service/ordertimline.service";
import {CustomerinfoService} from "../../../service/customerinfo.service";
import {SCDetailsService} from "../../../@core/services/s-c.-details.service";
import {ProductService} from "../../../@core/services/products.service";

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  Orderid: any;
  orderdetail: any;
  litorderdetail: any;
  order: any;
  status: any;
  username: any;
  type: any;
  description?: String;
  ordertimeline: OrderTimeline = {};
  listordertimeline: any;
  sdt4: any;
  name4: any;
  diachi4: any;
  size: any;
  mau: any;
  litproduct: any;
  namesot: any=null;
  valuesize: any;
  valuecolor: any;

  constructor(private modalService: NgbModal,
              private saimauService: SCDetailsService,
              private cus4: CustomerinfoService,
              private ordertimelineservice: OrdertimlineService,
              private tokenservice: TokenStorageService,
              private route: ActivatedRoute,
              private service: OrderService,
              private toastr: ToastrService, private router: Router, private exportService: ExportService,
              private productService: ProductService,
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

  productFrom = new FormGroup({
    name: new FormControl(''),
  })
  orderdeteoFrom = new FormGroup({
    productId: new FormControl(''),
    sizeId: new FormControl(''),
    colorId: new FormControl(''),
    orderId: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl('1')
  })
  customerinfoFrom = new FormGroup({
    name: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    sdt: new FormControl('', Validators.required),
    address: new FormControl('')
  })

  logout() {
    this.tokenService.logout();
    this.toastr.success("Đã đăng xuất")
    this.router.navigate(['/login']);
  }

  delete(id: any) {
    //xóa đơn chi tiết
    this.Orderid = this.route.snapshot.paramMap.get('id');
    console.log(this.Orderid)
    if (confirm("bnaj có chắc muốn xóa sản phẩm này khói giỏ hàng?")) {
      this.service.delete(id).subscribe(result => {
        this.getByOrderId(this.Orderid);
        this.toastr.success("Xóa thành công")
      });
    }
  }

  getByOrderId(id: any) {//lấy ra chi tiết đơn
    this.service.getByOrderId(id).subscribe(result => {
      this.litorderdetail = result;


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
        this.modalService.dismissAll();
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
        this.modalService.dismissAll();
      }
    } else if (this.status == 2) {
      if (confirm("Xác nhân giao đơn hàng")) {
        this.Input.value.status = this.status
        this.type = 'Giao đơn hàng';
        this.ordertimeline.type = this.type;

        this.ordertimeline.description = this.description;

        this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
          this.ordertimeline = result;
          console.log(this.ordertimeline)
        })
        this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
          location.reload()
        });
        this.modalService.dismissAll();
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
        this.modalService.dismissAll();
      }
    }
  }

  editcustomerinfo(id: any) {
    this.customerinfoFrom.value.id = id;
    this.customerinfoFrom.value.name = this.name4;
    this.customerinfoFrom.value.sdt = this.sdt4;
    this.customerinfoFrom.value.address = this.diachi4;
    this.username = this.tokenservice.getUser();
    this.ordertimeline.account_name = this.username;
    this.ordertimeline.order_id = this.order.id;
    this.cus4.edit(this.customerinfoFrom.value).subscribe(result => {
      this.type = 'Sửa thông tin đơn hàng';
      this.ordertimeline.type = this.type;

      this.ordertimeline.description = 'Sửa thông tin giao hàng';

      this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
        this.ordertimeline = result;
        console.log(this.ordertimeline)
      })
      this.Orderid = this.route.snapshot.paramMap.get('id');
      this.getOrderById(this.Orderid);
      this.toastr.success("Thay đổi thành công")
      this.modalService.dismissAll();
    })
  }
//thêm sp
  laysize(sizevalue: any) {
    this.valuesize = sizevalue;
    console.log(this.valuesize)
  }

  laycolor(colorvalue: any) {
    this.valuecolor = colorvalue;
    console.log(this.valuecolor)
  }

  giohang(order_id: any, product_id: any, gia: any) {
    this.Orderid = this.route.snapshot.paramMap.get('id');
    this.orderdeteoFrom.value.productId = product_id;
    this.orderdeteoFrom.value.colorId = this.valuecolor;
    this.orderdeteoFrom.value.sizeId = this.valuesize;
    this.orderdeteoFrom.value.orderId = this.order.id;
    this.orderdeteoFrom.value.price = gia;
    this.service.savedeteo(this.orderdeteoFrom.value).subscribe(result => {
      this.orderdetail = result;

      if (this.orderdetail != null) {
        this.toastr.success("Đã thêm vào giỏ");
        this.getByOrderId(this.Orderid);

      } else {
        this.toastr.success("ko có màu size phù hợp ");
      }

    }, error => {
      this.toastr.success("ko có màu size phù hợp ");
    })

  }

  opencustomerinfo(content: any) {
    this.diachi4 = this.order.addressinfo;
    this.name4 = this.order.nameinfo;
    this.sdt4 = this.order.sdtinfo;
    this.modalService.open(content, {
        size: 'lg', centered: true, scrollable: true,


      }
    );
  }

  openmadal(content: any, status: any) {
    this.status = status;
    this.modalService.open(content, {
        size: 'lg', centered: true, scrollable: true,


      }
    );

  }

  openmodaltimeline(timeline: any) {
    this.username = this.tokenservice.getUser();
    this.ordertimeline.account_name = this.username;
    this.ordertimeline.order_id = this.order.id;
    this.ordertimelineservice.getby(this.ordertimeline).subscribe(data => {
      this.listordertimeline = data;
    })
    this.modalService.open(timeline, {
        size: 'xl', centered: true, scrollable: true,


      }
    );
  }

  openProduct(product: any) {
    this.serchNameProduct();
    this.getAllsize();
    this.getAllmau();
    this.modalService.open(product, {
      size: 'xl', centered: true
    })
  }

  getAllmau() {
    this.saimauService.getAllColor().subscribe(result => {
      this.mau = result;

    })
  }

  getAllsize() {
    this.saimauService.getAllSize().subscribe(result => {
      this.size = result;

    })
  }

  serchNameProduct() {
    this.productFrom.value.name = this.namesot;
    this.productService.serchName(this.productFrom.value).subscribe(result => {
      this.litproduct = result;

    })


  }


  get sdt() {
    return this.customerinfoFrom.get('sdt');
  }

  get address() {
    return this.customerinfoFrom.get('address');
  }

  get name() {
    return this.customerinfoFrom.get('name');
  }
}
