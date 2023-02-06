import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../@core/services/products.service";
import {SCDetailsService} from "../../@core/services/s-c.-details.service";
import {OrderService} from "../../service/order.service";
import {OrderDeteo} from "../../@core/models/OrderDeteo.";
import {OrderTimeline} from "../../@core/models/OrderTimeline";
import {TokenStorageService} from "../../@core/services/Token-storage.service";
import {OrdertimlineService} from "../../service/ordertimline.service";
import {S_CDetails} from "../../@core/models/SCDetails";
import {SaimauService} from "../../service/saimau.service";
import {AdminunitService} from "../../service/adminunit.service";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  @Input() tabIndex: number | undefined
  @Output() childEvent = new EventEmitter();
  @Output() childEventCreateDra = new EventEmitter();

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
  valuekenh: any = 0;
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
  namecity: any;
  nameDistrict: any;
  p: number = 1;
  username: any;
  type: any;
  description?: String;
  ordertimeline: OrderTimeline = {};
  listordertimeline: any;
  shippingFee: any = 0;

  constructor(private adminunitservice: AdminunitService, private saimauService: SCDetailsService, private orderService: OrderService, private tokenservice: TokenStorageService,
              private saimauservice: SaimauService, private ordertimelineservice: OrdertimlineService, private toastr: ToastrService, private router: Router, private service: CustomerService, private modalService: NgbModal, private productService: ProductService
  ) {
  }

  adminunitFrom = new FormGroup({
    parentId: new FormControl()
  })

  customerFrom = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    sdt: new FormControl('', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]),
    address: new FormControl('', Validators.required),
    active: new FormControl("true")
  })
  orderFrom = new FormGroup({
    id: new FormControl(''),
    note: new FormControl(''),
    giamgia: new FormControl(''),
    ship: new FormControl(''),

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
    this.taodonhang()
    this.tinh();
    this.getDataFromLocal()
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
        this.namecity = item.name;
        this.addres = '';
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
        this.nameDistrict = item.name;
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

  }

  laykenh(kenhvalue: any) {
    this.valuekenh = kenhvalue;
  }

  savecustomer() {
    if (this.customerFrom.valid) {
      this.customerFrom.value.address += " " + this.addres;
      this.service.save(this.customerFrom.value).subscribe(result => {
        this.customer = result;
        this.getFeeShip();
        this.toastr.success("Thêm mới thành công");
        this.modalService.dismissAll();
        // localStorage.setItem("customer", this.customer)
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


  giohang(product_id: any, gia: any) {
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

        this.childEventCreateDra.emit();
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

    this.orderFrom.value.giamgia=this.giamgia;
    this.orderFrom.value.ship=this.shippingFee;
    this.tongthu = this.tongthu - this.giamgia;
    this.orderFrom.value.price = this.tongthu;
    this.orderFrom.value.note = this.note;
    this.orderService.save(this.orderFrom.value).subscribe(result => {
      this.order = result;
      this.toastr.success("Thành công");
      this.childEvent.emit();

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

  enddononlai() {
    this.orderFrom.value.id = this.order.id;
    this.orderFrom.value.kenh = this.valuekenh;
    this.orderFrom.value.status = '0';
    if (this.customer != null) {
      this.orderFrom.value.customer_id = this.customer.id;
    }

    this.orderFrom.value.giamgia=this.giamgia;
    this.orderFrom.value.ship=this.shippingFee;
    this.tongthu = this.tongthu - this.giamgia;
    this.orderFrom.value.price = this.tongthu;
    this.orderFrom.value.note = this.note;
    this.orderService.save(this.orderFrom.value).subscribe(result => {
      this.order = result;
      this.toastr.success("Thành công");
      this.childEvent.emit();

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
    this.type = 'Tạo đơn hàng';
    this.ordertimeline.type = this.type;

    this.ordertimeline.description = this.username + " tạo đơn hàng";

    this.ordertimelineservice.save(this.ordertimeline).subscribe(result => {
      this.ordertimeline = result;

    })
  }

  getAll() {
    this.orderService.getBy6().subscribe(result => {
      this.listhoadoncho = result;
    })
  }

  getFeeShip() {
    if (this.nameDistrict != null && this.namecity != null && this.valuekenh == 2) {

      this.service
        .getFeeShip(
          this.addres, this.namecity, this.nameDistrict
        )
        .subscribe((res) => {
          this.shippingFee = res;
        }, error => {
          this.toastr.error("Lỗi tính phí ship");
        });
    }
  };

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

  onFocusout() {
    this.service.save(this.customerFrom.value).subscribe(result => {
      this.customer = result;
      this.getFeeShip();
      // localStorage.setItem("customer", this.customer)
    }, error => {
    })
    this.orderFrom.value.id = this.order.id;
    this.orderFrom.value.kenh = this.valuekenh;
    this.orderFrom.value.status = '0';
    if (this.customer != null) {
      this.orderFrom.value.customer_id = this.customer.id;
    }

    this.orderFrom.value.giamgia=this.giamgia;
    this.orderFrom.value.ship=this.shippingFee;
    this.tongthu = this.tongthu - this.giamgia;
    this.orderFrom.value.price = this.tongthu;
    this.orderFrom.value.note = this.note;
    //tham lai
    this.username = this.tokenservice.getUser();
    this.ordertimeline.account_name = this.username;
    this.ordertimeline.order_id = this.order.id;
    this.type = 'Tạo đơn hàng';
    this.ordertimeline.type = this.type;

    this.ordertimeline.description = this.username + " tạo đơn hàng";

    let data = {
      tru: this.tru,
      fordon: this.fordon,
      orderdetail: this.orderdetail,
      orderdeteogiaquantity: this.orderdeteogiaquantity,
      customer: this.customer,
      quantity: this.quantity,
      price: this.price,
      note: this.note,
      khachdua: this.khachdua,
      giamgia: this.giamgia,
      tongthu: this.tongthu,
      valuekenh: this.valuekenh,
      valuesize: this.valuesize,
      valuecolor: this.valuecolor,
      size: this.size,
      litthanhpho: this.litthanhpho,
      lithuyen: this.lithuyen,
      litxa: this.litxa,
      tp_id: this.tp_id,
      huyen_id: this.huyen_id,
      xa_id: this.xa_id,
      addres: this.addres,
      mau: this.mau,
      order: this.order,
      namesot: this.namesot,
      namecus: this.namecus,
      litproduct: this.litproduct,
      message: this.message,
      orderdeteo: this.orderdeteo,
      litorderdeteo: this.listhoadoncho,
      listhoadoncho: this.listhoadoncho,
      namecity: this.namecity,
      nameDistrict: this.nameDistrict,
      p: this.p,
      username: this.username,
      type: this.type,
      description: this.description,
      ordertimeline: this.ordertimeline,
      listordertimeline: this.listordertimeline,
      shippingFee: this.shippingFee
    }
    localStorage.setItem("Order" + this.tabIndex, JSON.stringify(data));
  }

  getDataFromLocal() {
    var data = localStorage.getItem("Order" + this.tabIndex);
    if (data) {
      const dataOb = JSON.parse(data);
      this.tru = dataOb.tru
      this.fordon = dataOb.fordon
      this.orderdetail = dataOb.orderdetail
      this.orderdeteogiaquantity = dataOb.orderdeteogiaquantity
      this.customer = dataOb.customer
      this.quantity = dataOb.quantity
      this.price = dataOb.price
      this.note = dataOb.note
      this.khachdua = dataOb.khachdua
      this.giamgia = dataOb.giamgia
      this.tongthu = dataOb.tongthu
      this.valuekenh = dataOb.valuekenh
      this.valuesize = dataOb.valuesize
      this.valuecolor = dataOb.valuecolor
      this.size = dataOb.size
      this.litthanhpho = dataOb.litthanhpho
      this.lithuyen = dataOb.lithuyen
      this.litxa = dataOb.litxa
      this.tp_id = dataOb.tp_id
      this.huyen_id = dataOb.huyen_id
      this.xa_id = dataOb.xa_id
      this.addres = dataOb.addres
      this.mau = dataOb.mau
      this.order = dataOb.order
      this.namesot = dataOb.namesot
      this.namecus = dataOb.namecus
      this.litproduct = dataOb.litproduct
      this.message = dataOb.message
      this.orderdeteo = dataOb.orderdeteo
      this.litorderdeteo = dataOb.listhoadoncho
      this.listhoadoncho = dataOb.listhoadoncho
      this.namecity = dataOb.namecity
      this.nameDistrict = dataOb.nameDistrict
      this.p = dataOb.p
      this.username = dataOb.username
      this.type = dataOb.type
      this.description = dataOb.description
      this.ordertimeline = dataOb.ordertimeline
      this.listordertimeline = dataOb.listordertimeline
      this.shippingFee = dataOb.shippingFee
    }
    this.getByOrderId();
    this.sumquantitygia();
  }
}
