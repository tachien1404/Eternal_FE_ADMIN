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
    this.toastr.success("???? ????ng xu???t")
    this.router.navigate(['/login']);
  }

  delete(id: any) {
    //x??a ????n chi ti???t
    this.Orderid = this.route.snapshot.paramMap.get('id');
    console.log(this.Orderid)
    if (confirm("bnaj c?? ch???c mu???n x??a s???n ph???m n??y kh??i gi??? h??ng?")) {
      this.service.delete(id).subscribe(result => {
        this.getByOrderId(this.Orderid);
        this.toastr.success("X??a th??nh c??ng")
      });
    }
  }

  getByOrderId(id: any) {//l???y ra chi ti???t ????n
    this.service.getByOrderId(id).subscribe(result => {
      this.litorderdetail = result;


    })
  }

  pdfphieugiaohang(id: any) {
    this.exportService.pdfphieugiaohang(id).subscribe(result => {

    })


  }

  getOrderById(id: any) {//l???y ra th??ng tin ?????t h??ng
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
      if (confirm("x??c nh???n ????n h??ng")) {
        this.Input.value.status = this.status
        this.type = 'X??c nh???n ????n h??ng';
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
      if (confirm("X??c nh??n h???y ????n h??ng")) {
        this.Input.value.status = this.status
        this.type = 'H???y ????n h??ng';
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
      if (confirm("X??c nh??n giao ????n h??ng")) {
        this.Input.value.status = this.status
        this.type = 'Giao ????n h??ng';
        this.ordertimeline.type = this.type;

        this.ordertimeline.description = this.description;

        this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
          this.ordertimeline = result;
          console.log(this.ordertimeline)
        })
        this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
          location.reload()
        });
      }
    } else if (this.status == 3) {
      if (confirm("Ho??n th??nh ????n h??ng")) {
        this.Input.value.status = this.status;
        this.type = 'Ho??n th??nh ????n h??ng';
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

  editcustomerinfo(id: any) {
    this.customerinfoFrom.value.id = id;
    this.customerinfoFrom.value.name = this.name4;
    this.customerinfoFrom.value.sdt = this.sdt4;
    this.customerinfoFrom.value.address = this.diachi4;
    this.username = this.tokenservice.getUser();
    this.ordertimeline.account_name = this.username;
    this.ordertimeline.order_id = this.order.id;
    this.cus4.edit(this.customerinfoFrom.value).subscribe(result => {
      this.type = 'S???a th??ng tin ????n h??ng';
      this.ordertimeline.type = this.type;

      this.ordertimeline.description = 'S???a th??ng tin giao h??ng';

      this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
        this.ordertimeline = result;
        console.log(this.ordertimeline)
      })
      this.Orderid = this.route.snapshot.paramMap.get('id');
      this.getOrderById(this.Orderid);
      this.toastr.success("Thay ?????i th??nh c??ng")
      this.modalService.dismissAll();
    })
  }
//th??m sp
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
        this.toastr.success("???? th??m v??o gi???");
        this.getByOrderId(this.Orderid);

      } else {
        this.toastr.success("ko c?? m??u size ph?? h???p ");
      }

    }, error => {
      this.toastr.success("ko c?? m??u size ph?? h???p ");
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
