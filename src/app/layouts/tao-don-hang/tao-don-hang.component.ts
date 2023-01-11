import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../@core/services/products.service";
import {SCDetailsService} from "../../@core/services/s-c.-details.service";
import {OrderService} from "../../service/order.service";
import {OrderDeteo} from "../../@core/models/OrderDeteo.";
import {combineLatestAll} from "rxjs";
import {Cart} from "../../@core/models/cart";

@Component({
  selector: 'app-tao-don-hang',
  templateUrl: './tao-don-hang.component.html',
  styleUrls: ['./tao-don-hang.component.css']
})
export class TaoDonHangComponent implements OnInit {
  orderdetail: OrderDeteo = {};
  orderdeteogiaquantity: OrderDeteo = {};
  customer: any;
  quantity: any = 1;//số lượng tsp
  price: any;//giá
  note: any;
  khachdua: any = 0;
  giamgia: any = 0;
  tongthu: any;
  valuekenh: any=1;
  valuesize: any;
  valuecolor: any;
  size: any;
  mau: any;
  order: any;
  namesot: any;
  namecus: any;
  litproduct: any;
  message!: String;
  orderdeteo: any;
  litorderdeteo:any;
  listhoadoncho: any;
  p: number = 1;

  constructor(private saimauService: SCDetailsService, private orderService: OrderService,
              private toastr: ToastrService, private router: Router, private service: CustomerService, private modalService: NgbModal, private productService: ProductService
  ) {
  }

  customerFrom = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    sdt: new FormControl('', Validators.required),
    address: new FormControl('')
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
  }

  sumquantitygia() {
    this.orderService.sumgiaquantity(this.order.id).subscribe(result => {
      this.orderdeteogiaquantity = result;
      this.price = this.orderdeteogiaquantity.price;
      this.tongthu = this.price - this.giamgia;

    })
  }

  changeQuantity(quantity: any, id: any,quantitysaimau:any) {
    this.orderdetail.detail_id = id;
    this.orderdetail.quantity = quantity;
    if(quantity>quantitysaimau){
      this.orderdetail.quantity=quantitysaimau;
      this.toastr.success("Số lượng sản phẩm vượt quá số lượng hàng có sẵn");
    }
    this.orderService.savedeteo(this.orderdetail).subscribe(result => {

      this.getByOrderId();
      this.sumquantitygia()
    })

  }
back(){
    this.order=null;
  this.namesot="";
  this.getAll();
}
  savecustomer() {
    if (this.customerFrom.valid) {
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
    console.log(this.valuesize)
  }

  laycolor(colorvalue: any) {
    this.valuecolor = colorvalue;
    console.log(this.valuecolor)
  }

  laykenh(kenhvalue: any) {
    this.valuekenh = kenhvalue;
    console.log(this.valuekenh)
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
      this.customerFrom.value.email = this.customer.email;
      this.customerFrom.value.name = this.customer.name;
    }
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

  getByOrderId() {
    this.orderService.getByOrderId(this.order.id).subscribe(result => {
      this.litorderdeteo = result;
    })
  }

  getAllsize() {
    this.saimauService.getAllSize().subscribe(result => {
      this.size = result;

    })
  }

  serchNameProduct() {
this.productFrom.value.name=this.namesot
    this.productService.serchName(this.productFrom.value).subscribe(result => {
      this.litproduct = result;

    })


  }

  taodonhang() {
    this.orderService.save(this.orderFrom.value).subscribe(result => {
      this.order = result;
      this.namesot = '';
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
      console.log(this.order)
    }, error => {
      this.toastr.success("eroooo");
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
