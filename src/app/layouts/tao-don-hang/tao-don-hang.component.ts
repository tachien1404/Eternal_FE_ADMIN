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
  giamgia: any = 0;
  tongthu: any;
  valuekenh: any;
  valuesize: any;
  valuecolor: any;
  size: any;
  mau: any;
  order: any;
  namesot: any;
  litproduct: any;
  message!: String;
  orderdeteo: any;
  litorderdeteo: any;

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

  ngOnInit(): void {

  }

  sumquantitygia() {
    this.orderService.sumgiaquantity(this.order.id).subscribe(result => {
      this.orderdeteogiaquantity = result;
      this.price = this.orderdeteogiaquantity.price;
      this.tongthu = this.price - this.giamgia;
      console.log(this.orderdeteogiaquantity);
    })
  }

  changeQuantity(quantity: any, id: any) {
    this.orderdetail.detail_id = id;
    this.orderdetail.quantity = quantity;
    this.orderService.savedeteo(this.orderdetail).subscribe(result => {
      this.orderdeteo
        = result;
      this.getByOrderId();
      this.sumquantitygia()
    })

  }

  savecustomer() {
    if (this.customerFrom.valid) {
      this.service.save(this.customerFrom.value).subscribe(result => {
        this.customer = result;

        this.toastr.success("Thêm mới thành công");
        this.modalService.dismissAll();

      }, error => {
        this.toastr.success("Thêm mới thất bại");
      })
    }
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

  openLg(content: any) {
    this.modalService.open(content, {
      size: 'lg', centered: true, scrollable: true,
    })
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
      console.log(this.mau);
    })
  }

  getByOrderId() {
    this.orderService.getByOrderId(this.order.id).subscribe(result => {
      this.litorderdeteo = result;
      console.log(this.litorderdeteo)
    })
  }

  getAllsize() {
    this.saimauService.getAllSize().subscribe(result => {
      this.size = result;
      console.log(this.size);
    })
  }

  serchNameProduct() {
    if (this.namesot != null) {
      this.productService.serchName(this.namesot).subscribe(result => {
        this.litproduct = result;
        console.log(this.litproduct);
      })
    }
    console.log(this.namesot)
  }

  taodonhang() {
    this.orderService.save(this.orderFrom.value).subscribe(result => {
      this.order = result;
      console.log(this.order)
    })
  }

  enddonhang() {
    this.orderFrom.value.id = this.order.id;
    this.orderFrom.value.kenh = this.valuekenh;
    this.orderFrom.value.status = '7';
    if(this.customer!=null){
      this.orderFrom.value.customer_id = this.customer.id;
    }

    this.orderFrom.value.price = this.tongthu;
    this.orderFrom.value.note=this.note;
    this.orderService.save(this.orderFrom.value).subscribe(result => {
      this.order = result;
      this.toastr.success("Thành công");
      console.log(this.order)
    },error => {
      this.toastr.success("eroooo");
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
