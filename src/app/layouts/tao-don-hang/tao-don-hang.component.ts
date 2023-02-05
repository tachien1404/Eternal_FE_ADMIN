import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CustomerService } from "../../service/customer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../@core/services/products.service";
import { SCDetailsService } from "../../@core/services/s-c.-details.service";
import { OrderService } from "../../service/order.service";
import { OrderDeteo } from "../../@core/models/OrderDeteo.";
import { OrderTimeline } from "../../@core/models/OrderTimeline";
import { TokenStorageService } from "../../@core/services/Token-storage.service";
import { OrdertimlineService } from "../../service/ordertimline.service";
import { S_CDetails } from "../../@core/models/SCDetails";
import { SaimauService } from "../../service/saimau.service";
import { AdminunitService } from "../../service/adminunit.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tao-don-hang',
  templateUrl: './tao-don-hang.component.html',
  styleUrls: ['./tao-don-hang.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaoDonHangComponent implements OnInit {
  //Tab
  tabs: any[] = []; // [order1 in tab1, order2 intab2]
  selected = new FormControl(0);

  onFocusout() {
    if (this.tabs.length != 0) {
      localStorage.setItem("taodonhang", JSON.stringify(this.tabs))
    }
  }

  addTab() {
    if (this.tabs.length >= 5) {
      this.toastr.warning("Max order size", "Warning")
    }
    this.tabs.push(`Order ${this.tabs.length + 1}`);
    this.selected.setValue(this.tabs.length - 1);
    localStorage.setItem("taodonhang", JSON.stringify(this.tabs))
  }

  removeTab(index: number) {
    var result = confirm("Are you sure?");
    if (result) {
      this.tabs.splice(index, 1);
      localStorage.removeItem("Order"+index)
      localStorage.setItem("taodonhang", JSON.stringify(this.tabs))
    }
  }

  removeSucces(index: number) {
    this.tabs.splice(index, 1);
    localStorage.removeItem("Order"+index)
    localStorage.setItem("taodonhang", JSON.stringify(this.tabs))
  }

  tru: S_CDetails[] = [];//mảng trừ sl
  fordon: any[] = [1];//ra các hóa đơn chờ
  orderdetail: OrderDeteo = {};
  orderdeteogiaquantity: OrderDeteo = {};
  customer: any;
  quantity: any = 1;//số lượng tsp
  price: any;//giá
  note: any;
  khachdua: any = 0;
  giamgia: any = 0;
  tongthu: any;
  valuekenh: any = 1;
  valuesize: any;
  valuecolor: any;
  size: any;
  litthanhpho: any;
  lithuyen: any;
  litxa: any
  tp_id: any;
  huyen_id: any;
  xa_id: any;
  addres: any = "";
  mau: any;
  order: any;
  namesot: any;
  namecus: any;
  litproduct: any;
  message!: String;
  orderdeteo: any;
  litorderdeteo: any;
  listhoadoncho: any;
  p: number = 1;
  username: any;
  type: any;
  description?: String;
  ordertimeline: OrderTimeline = {};
  listordertimeline: any;

  constructor(private adminunitservice: AdminunitService, private saimauService: SCDetailsService, private orderService: OrderService, private tokenservice: TokenStorageService,
    private saimauservice: SaimauService, private ordertimelineservice: OrdertimlineService, private toastr: ToastrService, private router: Router, private service: CustomerService, private modalService: NgbModal, private productService: ProductService
  ) {
  }

  adminunitFrom = new FormGroup({
    parentId: new FormControl()
  })

  customerFrom = new FormGroup({
    name: new FormControl('', Validators.required),

    sdt: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  })
  orderFrom = new FormGroup({
    id: new FormControl(''),
    note: new FormControl(''),

    price: new FormControl(''),
    status: new FormControl('6'),
    kenh: new FormControl(''),
    account_id: new FormControl(''),
    customer_id: new FormControl('')
  })
  orderdeteoFrom = new FormGroup({
    productId: new FormControl(''),
    sizeId: new FormControl(''),
    colorId: new FormControl(''),
    orderId: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl('1')
  })
  productFrom = new FormGroup({
    name: new FormControl(''),
  })

  ngOnInit(): void {
    this.getAll();
    this.tinh();
    const taodonhang = localStorage.getItem('taodonhang');
    if (taodonhang) {
      this.tabs = JSON.parse(taodonhang);
    }
  }

  sumquantitygia() {
    this.orderService.sumgiaquantity(this.order.id).subscribe(result => {
      this.orderdeteogiaquantity = result;
      this.price = this.orderdeteogiaquantity.price;
      this.tongthu = this.price - this.giamgia;

    })
  }

  changeQuantity(quantity: any, id: any, quantitysaimau: any) {
    this.orderdetail.detail_id = id;
    this.orderdetail.quantity = quantity;
    if (quantity > quantitysaimau) {
      this.orderdetail.quantity = quantitysaimau;
      this.toastr.success("Số lượng sản phẩm vượt quá số lượng hàng có sẵn");
    }
    this.orderService.savedeteo(this.orderdetail).subscribe(result => {

      this.getByOrderId();
      this.sumquantitygia()
    })

  }

  back() {

    location.reload()
    this.namesot = "";
    this.getAll();
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

  laykenh(kenhvalue: any) {
    this.valuekenh = kenhvalue;

  }

  savecustomer() {
    if (this.customerFrom.valid) {
      this.customerFrom.value.address += " " + this.addres;
      this.service.save(this.customerFrom.value).subscribe(result => {
        this.customer = result;
        console.log(this.customer)
        this.toastr.success("Thêm mới thành công");
        this.modalService.dismissAll();

      }, error => {
        this.toastr.success("Thêm mới thất bại");
      })
    }
  }

  timkiemcus() {
    this.service.searchSdt(this.namecus).subscribe(result => {
      this.customer = result;


    }, error => {
      this.toastr.success("Không có thông tin kahch hàng");
    });
  }

  timkiemdon() {
    this.orderService.getByOrderId(this.namesot).subscribe(result => {
      this.litorderdeteo = result;
    });

    this.orderService.getOrderById(this.namesot).subscribe(result => {
      this.order = result;
      console.log(this.order);
      this.service.searchSdt(this.order.sdtCustomer).subscribe(result => {
        this.customer = result;

      })
    }, error => {
      this.toastr.error("Đơn hàng không tồn tại");
    });
    this.service.searchSdt(this.order.sdtCustomer).subscribe(result => {
      this.customer = result;

    })

  }

  delete(id: any) {
    //xóa đơn chi tiết
    console.log(id)


    if (confirm("Bạn chắc chắn muốn xóa chứ?")) {
      this.orderService.delete(id).subscribe(result => {
        this.getByOrderId();
      });
    }
  }

  laysize(sizevalue: any) {
    this.valuesize = sizevalue;

  }
  saimauform = new FormGroup({
    product_id: new FormControl(''),
    size_id: new FormControl(''),
    color_id: new FormControl(''),

  })
  laycolor(colorvalue: any, id: any) {
    this.valuecolor = colorvalue;
    console.log(id)
    this.saimauform.value.color_id = colorvalue;
    this.saimauform.value.product_id = id;
    console.log(this.saimauform.value)
    console.log(colorvalue)
    this.saimauservice.getsize(this.saimauform.value).subscribe(result => {
      this.size = result;

    })
    console.log(this.size)
  }


  giohang(order_id: any, product_id: any, gia: any) {
    this.orderdeteoFrom.value.productId = product_id;
    this.orderdeteoFrom.value.colorId = this.valuecolor;
    this.orderdeteoFrom.value.sizeId = this.valuesize;
    this.orderdeteoFrom.value.orderId = this.order.id;
    this.orderdeteoFrom.value.price = gia;
    this.orderService.savedeteo(this.orderdeteoFrom.value).subscribe(result => {
      this.orderdeteo = result;

      if (this.orderdeteo != null) {
        this.toastr.success("Đã thêm vào giỏ");
        this.getByOrderId();
        this.sumquantitygia();
      } else {
        this.toastr.success("ko có màu size phù hợp ");
      }

    }, error => {
      this.toastr.success("ko có màu size phù hợp ");
    })

  }

  openthem(content: any) {
    this.modalService.open(content, {
      size: 'lg', centered: true, scrollable: true,
    });
  }

  openedit(content: any, id: any) {
    this.modalService.open(content, {
      size: 'lg', centered: true, scrollable: true,
    });
    if (id != null) {
      this.service.getById(id).subscribe(result => {
        this.customer = result;
      });
      this.customerFrom.value.address = this.customer.address;
      this.customerFrom.value.sdt = this.customer.sdt;

      this.customerFrom.value.name = this.customer.name;
    }
  }

  openProduct(product: any) {
    this.serchNameProduct();

    this.getAllmau();
    this.modalService.dismissAll();
    this.modalService.open(product, {
      size: 'xl', centered: true
    })
  }

  getAllmau() {
    this.saimauService.getAllColor().subscribe(result => {
      this.mau = result;

    })
  }

  getByOrderId() {
    this.orderService.getByOrderId(this.order.id).subscribe(result => {
      this.litorderdeteo = result;
      for (let item of this.litorderdeteo) {
        this.tru.push({
          id: item.scId,
          quantity: item.quantity
        })
      }
    })
  }

  getAllsize() {

  }

  serchNameProduct() {
    this.productFrom.value.name = this.namesot
    this.productService.serchName(this.productFrom.value).subscribe(result => {
      this.litproduct = result;
    })


  }

  taodonhang() {
    this.order = null;
    this.orderService.save(this.orderFrom.value).subscribe(result => {
      this.order = result;
      this.namesot = '';
      this.username = this.tokenservice.getUser();
      this.ordertimeline.account_name = this.username;
      this.ordertimeline.order_id = this.order.id;
      this.type = 'Tạo đơn hàng';
      this.ordertimeline.type = this.type;

      this.ordertimeline.description = this.username + " tạo đơn hàng";

      this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {


      })
    })
  }

  enddonhang() {
    this.orderFrom.value.id = this.order.id;
    this.orderFrom.value.kenh = this.valuekenh;
    this.orderFrom.value.status = '3';
    if (this.customer != null) {
      this.orderFrom.value.customer_id = this.customer.id;
    }

    this.orderFrom.value.price = this.tongthu;
    this.orderFrom.value.note = this.note;
    this.orderService.save(this.orderFrom.value).subscribe(result => {
      this.order = result;
      this.toastr.success("Thành công");


    }, error => {
      this.toastr.success("eroooo");
    })
    //trừ sl sai màu
    this.saimauservice.trusl(this.tru).subscribe(result => {

    })
    //tham lai
    this.username = this.tokenservice.getUser();
    this.ordertimeline.account_name = this.username;
    this.ordertimeline.order_id = this.order.id;
    this.type = 'Hoàn thành đơn hàng';
    this.ordertimeline.type = this.type;

    this.ordertimeline.description = this.username + " hoàn thành đơn hàng";

    this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
      this.ordertimeline = result;

    })
  }

  enddonnhap() {
    this.orderFrom.value.id = this.order.id;
    this.orderFrom.value.kenh = this.valuekenh;

    if (this.customer != null) {
      this.orderFrom.value.customer_id = this.customer.id;
    }
    this.orderFrom.value.status = '6';
    this.orderFrom.value.price = this.tongthu;
    this.orderFrom.value.note = this.note;
    this.orderService.save(this.orderFrom.value).subscribe(result => {
      this.order = result;
      this.toastr.success("Thành công");
      console.log(this.order)
    }, error => {
      this.toastr.success("eroooo");
    })
  }

  getAll() {
    this.orderService.getBy6().subscribe(result => {
      this.listhoadoncho = result;

    })
  }

  deletehoadoncho(id: any) {
    this.orderService.deleteorder(id).subscribe(result => {

      this.toastr.success("Xóa thành công");
      this.getAll();
    }, error => {
      this.toastr.error("Xóa thất bại");
    })
  }

  get email() {
    return this.customerFrom.get('email');
  }

  get sdt() {
    return this.customerFrom.get('sdt');
  }

  get address() {
    return this.customerFrom.get('address');
  }

  get name() {
    return this.customerFrom.get('name');
  }


}
