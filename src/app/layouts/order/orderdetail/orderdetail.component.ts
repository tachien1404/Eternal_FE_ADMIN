import {DOCUMENT} from '@angular/common';
import {TokenStorageService} from './../../../@core/services/Token-storage.service';
import {Component, OnInit, ElementRef, Inject} from '@angular/core';
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
import {SaimauService} from "../../../service/saimau.service";
import {AdminunitService} from "../../../service/adminunit.service";
import {OrderDeteo} from "../../../@core/models/OrderDeteo.";
import {S_CDetails} from "../../../@core/models/SCDetails";

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
  litthanhpho: any;
  lithuyen: any;
  litxa: any
  tp_id: any;
  huyen_id: any;
  xa_id: any;
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
  namesot: any = null;
  biendem: any;
  valuesize: any;
  valuecolor: any;
  addres: any = "";
  listsole: any;
  category_id: any;
  brand_id: any;
  sole_id: any;
  startgia: any;
  endgia: any;
  listcategory: any;
  listbrand: any;
  orderdeteogiaquantity: OrderDeteo = {};
  price: any;
  saimau: any;//lấy obj scdeteo
  countsl: any;//số lượng có trong giỏ hàng
  tru:S_CDetails[]=[];//lưu các thứu đê cộng trừ khi hủy hoặc tạo đơn
  constructor(private modalService: NgbModal, private adminunitservice: AdminunitService,
              private saimauservice: SaimauService,
              private saimauService: SCDetailsService,
              private cus4: CustomerinfoService,
              private ordertimelineservice: OrdertimlineService,
              private tokenservice: TokenStorageService,
              private route: ActivatedRoute,
              private service: OrderService,
              private toastr: ToastrService, private router: Router, private exportService: ExportService,
              private productService: ProductService,
              private tokenService: TokenStorageService,
              @Inject(DOCUMENT) document: Document, private ElByClassName: ElementRef,) {
    this.Orderid = this.route.snapshot.paramMap.get('id');

    if (this.Orderid != null && this.Orderid >= 0) {
      this.getByOrderId(this.Orderid);
      this.getOrderById(this.Orderid);
    }
  }

  ngOnInit(): void {
    this.tinh();
    this.sumquantitygia();
  }

  status1: boolean = false;

  productFrom = new FormGroup({
    name: new FormControl(''),
    hang_id: new FormControl(''),
    sole_id: new FormControl(''),
    category_id: new FormControl(''),
    startgia: new FormControl(''),
    endgia: new FormControl(''),
  })
  orderdeteoFrom = new FormGroup({
    productId: new FormControl(),
    sizeId: new FormControl(),
    colorId: new FormControl(),
    orderId: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl('1')
  })
  customerinfoFrom = new FormGroup({
    name: new FormControl('', Validators.required),
    id: new FormControl(),
    sdt: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  })
  adminunitFrom = new FormGroup({
    parentId: new FormControl()
  })

  logout() {
    this.tokenService.logout();
    this.toastr.success("Đã đăng xuất")
    this.router.navigate(['/login']);
  }

  tinh() {
    if (this.adminunitFrom.value.parentId == null) {
      this.adminunitservice.gettinhhuyenxa(this.adminunitFrom.value).subscribe(result => {
        this.litthanhpho = result;
      })
    }

  }

  xa() {

    if (this.adminunitFrom.value.parentId != null) {
      this.adminunitservice.gettinhhuyenxa(this.adminunitFrom.value).subscribe(result => {
        this.litxa = result;
      })
    }

  }

  huyen() {

    if (this.adminunitFrom.value.parentId != null) {
      this.adminunitservice.gettinhhuyenxa(this.adminunitFrom.value).subscribe(result => {
        this.lithuyen = result;
      })
    }
  }

  laytp(value: any) {
    this.tp_id = value;
    this.diachi4='';
    this.addres='';
    this.adminunitFrom.value.parentId = this.tp_id;
    for (let item of this.litthanhpho) {
      if (item.id == this.tp_id) {
        this.addres += item.name;
      }
    }

    this.huyen()
  }

  layhuyen(value: any) {
    this.huyen_id = value;
    this.adminunitFrom.value.parentId = this.huyen_id;
    for (let item of this.lithuyen) {
      if (item.id == this.huyen_id) {
        this.addres = item.name + " " + this.addres;
      }
    }
    this.xa()
  }

  layxa(value: any) {
    this.xa_id = value
    for (let item of this.litxa) {
      if (item.id == this.xa_id) {
        this.addres = item.name + " " + this.addres;
      }
    }
    console.log(this.addres)
  }

  laycategory(value: string) {
    if (value == '100') {
      this.category_id = null;
      console.log("có")
      console.log(this.category_id)
    } else {
      this.category_id = value;
    }

  }

  laybrand(value: string) {

    if (value == '100') {
      console.log("có")
      this.brand_id = null;
    } else {
      this.brand_id = value;
    }

  }

  laysole(value: string) {
    if (value == '100') {
      console.log("có")
      this.sole_id = null;
    } else {
      this.sole_id = value;
    }

  }


  delete(id: any) {
    //xóa đơn chi tiết
    this.Orderid = this.route.snapshot.paramMap.get('id');
    this.username = this.tokenservice.getUser();
    this.ordertimeline.account_name = this.username;
    this.ordertimeline.order_id = this.order.id;

    if (confirm("bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      console.log(this.countsl)
      if (this.countsl > 1) {
        console.log(this.countsl)
        this.service.delete(id).subscribe(result => {
          this.getByOrderId(this.Orderid);
          this.type = 'Sửa đơn hàng';
          this.ordertimeline.type = this.type;

          this.ordertimeline.description = 'Xóa sản phẩm ';

          this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
            this.ordertimeline = result;

          })
          this.sumquantitygia()
          this.toastr.success("Xóa thành công")
        });
      } else {
        this.toastr.success("Không đuợc xóa hết khỏi giỏ hàng")
      }
    }
  }

  sumquantitygia() {//tổng số lượng mua và tổng giá
    this.Orderid = this.route.snapshot.paramMap.get('id');
    this.service.sumgiaquantity(this.Orderid).subscribe(result => {
      this.orderdeteogiaquantity = result;
      this.price = this.orderdeteogiaquantity.price;

    })
  }

  getByOrderId(id: any) {//lấy ra chi tiết đơn
    this.service.getByOrderId(id).subscribe(result => {
      this.litorderdetail = result;
      for (let item of this.litorderdetail){
        this.tru.push({
          id:item.scId,
          quantity:item.quantity
        })
      }
      this.service.countsoluong(this.Orderid).subscribe(result => {
        this.countsl = result;

      })

    })
  }

  pdfphieugiaohang(id: any) {
    this.exportService.pdfphieugiaohang(id).subscribe(result => {

    })


  }

  getOrderById(id: any) {//lấy ra thông tin đặt hàng
    this.service.getOrderById(id).subscribe(result => {
      this.order = result;

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
          location.reload()
        });
        this.modalService.dismissAll();
      }

    } else if (this.status == 4) {
      if (confirm("Xác nhân hủy đơn hàng")) {
        this.Input.value.status = this.status
        this.type = 'Hủy đơn hàng';
        this.ordertimeline.type = this.type;
        this.ordertimeline.description = this.description;

        this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
          this.ordertimeline = result;
          this.saimauservice.congsl(this.tru).subscribe(result =>{
            this.toastr.success("Thay đổi thành công")
          })
        })
        this.service.updatetrangthai(this.Input.value, id).subscribe(result => {
          location.reload()
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
    this.customerinfoFrom.value.address = this.diachi4+""+this.addres;
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
  saimauform = new FormGroup({
    product_id: new FormControl(''),
    size_id: new FormControl(''),
    color_id: new FormControl(''),

  })

  laysize(sizevalue: any, id: any) {
    this.valuesize = sizevalue;
    this.saimauform.value.size_id = this.valuesize;
    this.saimauform.value.color_id = this.valuecolor;
    this.saimauform.value.product_id = id;
    this.saimauservice.soluongsaimau(this.saimauform.value).subscribe(result => {
      this.saimau = result;
      if (this.saimau != null) {
        console.log(this.saimau)

        this.biendem = this.saimau.quantity;
        console.log(this.biendem)
      }
    })
  }

  laycolor(colorvalue: any, id: any) {
    this.valuecolor = colorvalue;

    this.saimauform.value.color_id = colorvalue;
    this.saimauform.value.product_id = id;

    this.saimauservice.getsize(this.saimauform.value).subscribe(result => {
      this.size = result;

    })


  }

  giohang(order_id: any, product_id: any, gia: any) {
    this.Orderid = this.route.snapshot.paramMap.get('id');
    this.orderdeteoFrom.value.productId = product_id;
    this.orderdeteoFrom.value.colorId = this.valuecolor;
    this.orderdeteoFrom.value.sizeId = this.valuesize;
    this.orderdeteoFrom.value.orderId = this.Orderid;
    this.orderdeteoFrom.value.price = gia;
    this.username = this.tokenservice.getUser();
    this.ordertimeline.account_name = this.username;
    this.ordertimeline.order_id = this.order.id;
    if (this.valuesize != null && this.valuecolor != null && this.valuesize != '' && this.valuecolor != '') {
      if (this.biendem > 0) {
        this.service.savedeteo(this.orderdeteoFrom.value).subscribe(result => {
          this.orderdetail = result;
          this.type = 'Sửa đơn hàng';
          this.ordertimeline.type = this.type;

          this.ordertimeline.description = 'Thêm sản phẩm ';

          this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
            this.ordertimeline = result;

          })
          if (this.orderdetail != null) {
            this.toastr.success("Đã thêm vào giỏ");
            this.biendem = this.biendem - 1;
            this.getByOrderId(this.Orderid);

            this.sumquantitygia();
          } else {
            this.toastr.success("Sản phẩm đã hết màu hoặc size bạn chọn , mời chọn màu hoặc size khác");
          }

        }, error => {
          this.toastr.success("Sản phẩm đã hết màu hoặc size bạn chọn , mời chọn màu hoặc size khác");
        })
      } else {
        this.toastr.success("Sản phẩm đã hết màu hoặc size bạn chọn , mời chọn màu hoặc size khác");

      }
    } else {
      this.toastr.success("Mời bạn chọn màu và size của sản phẩm ");
    }
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

  bocloc() {
    this.serchNameProduct();
  }

  serchNameProduct() {
    this.productFrom.value.name = this.namesot;
    this.productFrom.value.hang_id = this.brand_id;
    this.productFrom.value.category_id = this.category_id;
    this.productFrom.value.sole_id = this.sole_id;
    this.productFrom.value.startgia = this.startgia;
    this.productFrom.value.endgia = this.endgia;
    this.productService.serchName(this.productFrom.value).subscribe(result => {
      this.litproduct = result;

    })


  }

  laygia(value: string) {
    if (value == '100') {
      this.startgia = null;
      this.endgia = null;
    }
    if (value == '1') {
      this.startgia = 400000;
      this.endgia = 1000000;
    }
    if (value == '2') {
      this.startgia = 1000000;
      this.endgia = 1500000;
    }
    if (value == '3') {
      this.startgia = 1500000;
      this.endgia = 2000000;
    }
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


  clickEvent() {
    this.status1 = !this.status;
  }

  greet() {
    console.log('hello');
    const btnElement = (<HTMLElement>this.ElByClassName.nativeElement).querySelector(
      '.dropdown-menu'
    );
    console.log(btnElement);

    // btnElement.innerHTML = 'This is Button';
  }

  selected(id: string) {
    let uri = "" + this.router.url
    console.log(uri);
    if (uri.indexOf(id) !== -1) {
      document.getElementById(id)?.classList.add('selected');
    }
  }

}
