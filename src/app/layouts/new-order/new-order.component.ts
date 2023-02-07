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
import {CategoryService} from "../../service/category.service";
import {BrandService} from "../../service/brand.service";
import {SoleService} from "../../service/sole.service";

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
  valuekenh: any = 1;
  dis:any;
  listcategory: any;
  listbrand: any;
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
  listsole: any;
  category_id: any;
  brand_id: any;
  sole_id: any;
  startgia: any;
  endgia: any;
  biendem:any;
  saimau:any;//lấy obj scdeteo
  constructor(private adminunitservice: AdminunitService, private saimauService: SCDetailsService,
  private orderService: OrderService, private tokenservice: TokenStorageService
, private categoryservice: CategoryService, private hangservice: BrandService, private soleService: SoleService,
  private saimauservice: SaimauService, private ordertimelineservice: OrdertimlineService,
  private toastr: ToastrService, private router: Router,
  private service: CustomerService, private modalService: NgbModal,
  private productService: ProductService) {
  }

  adminunitFrom = new FormGroup({
    parentId: new FormControl()
  })

  customerFrom = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    sdt: new FormControl('', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]),
    address: new FormControl('', Validators.required),
    nameCity:new FormControl(''),
    nameDistrict:new FormControl('')
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
    productId: new FormControl(),
    sizeId: new FormControl(),
    colorId: new FormControl(),
    orderId: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl('1')
  })
  productFrom = new FormGroup({
    name: new FormControl(''),
    hang_id: new FormControl(''),
    sole_id: new FormControl(''),
    category_id: new FormControl(''),
    startgia: new FormControl(''),
    endgia: new FormControl(''),
  })

  ngOnInit(): void {
    this.taodonhang()
    this.tinh();
    if(this.litorderdeteo!=null){
      this.dis=1;
    }
    this.getDataFromLocal()
  }

  sumquantitygia() {//tổng số lượng mua và tổng giá
    this.orderService.sumgiaquantity(this.order.id).subscribe(result => {
      this.orderdeteogiaquantity = result;
      this.price = this.orderdeteogiaquantity.price;
      this.tongthu = this.price ;

    },error => {
      this.tongthu=0;
      this.orderdeteogiaquantity={};
    })
  }

  changeQuantity(quantity: any, id: any, quantitysaimau: any) {//chỉnh số lượng
    this.orderdetail.detail_id = id;
    this.orderdetail.quantity = quantity;
    if (quantity > quantitysaimau) {
      this.orderdetail.quantity = quantitysaimau;
      this.toastr.success("Số lượng sản phẩm vượt quá số lượng hàng có sẵn");
    } else
    if (quantity == 0 ||quantity<0) {
      if (confirm("bạn muốn xóa sản phâẩm này khỏi giỏ hàng ?")) {
        this.delete(id);
      }
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
      this.customerFrom.value.nameCity=this.namecity;
      this.customerFrom.value.nameDistrict=this.nameDistrict;
     this.service.searchSdt(this.customerFrom.value.sdt).subscribe(result =>{
       this.customer=result;
       if(this.customer==null){
         this.service.save(this.customerFrom.value).subscribe(result => {
           this.customer = result;
           this.getFeeShip();
           this.toastr.success("Thêm mới thành công");
           this.modalService.dismissAll();

         }, error => {
           this.toastr.error("Thêm mới thất bại");
         })
       }else{
         this.toastr.error("Khách hàng đã tồn tại");
       }
     })

    }
  }

  timkiemcus() {
    this.service.searchSdt(this.namecus).subscribe(result => {
      this.customer = result;
this.namecity=this.customer.nameCity;
this.nameDistrict=this.customer.nameDistrict;
this.addres=this.customer.address;
this.getFeeShip();
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
        this.sumquantitygia();
      });
    }
  }

  laysize(sizevalue: any, id: any) {
    this.valuesize = sizevalue;
    this.saimauform.value.size_id=this.valuesize;
    this.saimauform.value.color_id = this.valuecolor;
    this.saimauform.value.product_id = id;
    this.saimauservice.soluongsaimau(this.saimauform.value).subscribe(result=>{
      this.saimau=result;
      if(this.saimau!=null){
        console.log(this.saimau)

        this.biendem=this.saimau.quantity;
        console.log(this.biendem)
      }
    })
  }

  saimauform = new FormGroup({
    product_id: new FormControl(''),
    size_id: new FormControl(''),
    color_id: new FormControl(''),

  })

  laycolor(colorvalue: any, id: any) {
    this.valuecolor = colorvalue;

    this.saimauform.value.color_id = colorvalue;
    this.saimauform.value.product_id = id;
    console.log(this.saimauform.value)
    console.log(colorvalue)
    this.saimauservice.getsize(this.saimauform.value).subscribe(result => {
      this.size = result;

    })
    console.log(this.size)
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

      this.brand_id = null;
    } else {
      this.brand_id = value;
    }

  }

  laysole(value: string) {
    if (value == '100') {

      this.sole_id = null;
    } else {
      this.sole_id = value;
    }

  }
  giohang(product_id: any, gia: any) {
    this.orderdeteoFrom.value.productId = product_id;
    this.orderdeteoFrom.value.colorId = this.valuecolor;
    this.orderdeteoFrom.value.sizeId = this.valuesize;
    this.orderdeteoFrom.value.orderId = this.order.id;
    this.orderdeteoFrom.value.price = gia;
    if(this.valuesize!=null&&this.valuecolor!=null&&this.valuesize!=''&&this.valuecolor!=''){
      if(this.biendem>0){
        this.orderService.savedeteo(this.orderdeteoFrom.value).subscribe(result => {
          this.orderdeteo = result;
          if (this.orderdeteo != null) {
            this.toastr.success("Đã thêm vào giỏ");
            this.biendem=this.biendem-1;
            this.getByOrderId();
            this.sumquantitygia();
          } else {
            this.toastr.success("Sản phẩm đã hết màu hoặc size bạn chọn , mời chọn màu hoặc size khác");
          } }, error => {
          this.toastr.success("Sản phẩm đã hết màu hoặc size bạn chọn , mời chọn màu hoặc size khác");
        })
      }else{
        this.toastr.success("Sản phẩm đã hết màu hoặc size bạn chọn , mời chọn màu hoặc size khác");
      }
    }else{
      this.toastr.success("Mời bạn chọn màu và size của sản phẩm ");
    }

  }

  openthem(content: any) {
    this.customer = null
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
    this.brand_id = null;
    this.category_id = null;
    this.sole_id = null;
    this.serchNameProduct();
    this.getAllbrand();
    this.getAllcategory();
    this.getAllSole();
    this.getAllmau();
    this.modalService.dismissAll();
    this.modalService.open(product, {
      size: 'xl', centered: true
    })
  }
  getAllcategory() {
    this.categoryservice.getAllCategory().subscribe(result => {
      this.listcategory = result;
    })
  }

  getAllbrand() {
    this.hangservice.getAllBrand().subscribe(result => {
      this.listbrand = result;
    })
  }

  getAllSole() {
    this.soleService.getAll().subscribe(result => {
      this.listsole = result;
    })
  }
  getAllmau() {
    this.saimauService.getAllColor().subscribe(result => {
      this.mau = result;

    })
  }

  getByOrderId() {//đơn chi tiết
    this.orderService.getByOrderId(this.order.id).subscribe(result => {
      this.litorderdeteo = result;
      if(this.litorderdeteo!=null){
      for (let item of this.litorderdeteo) {
        this.tru.push({
          id: item.scId,
          quantity: item.quantity
        })
      }
      }else{
      this.litorderdeteo=null;
    }
    }
      )
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
    this.orderFrom.value.status = '1';
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
      // customer: this.customer,
      quantity: this.quantity,
      price: this.price,
      note: this.note,
      khachdua: this.khachdua,
      giamgia: this.giamgia,
      tongthu: this.tongthu,
      valuekenh: this.valuekenh,
      // valuesize: this.valuesize,
      // valuecolor: this.valuecolor,
      size: this.size,
      litthanhpho: this.litthanhpho,
      lithuyen: this.lithuyen,
      litxa: this.litxa,
      tp_id: this.tp_id,
      huyen_id: this.huyen_id,
      xa_id: this.xa_id,
      //addres: this.addres,
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
      // shippingFee: this.shippingFee
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
      // this.customer = dataOb.customer
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
      // this.shippingFee = dataOb.shippingFee
    }
    this.getByOrderId();
    this.sumquantitygia();
  }
}
