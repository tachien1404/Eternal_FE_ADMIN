import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../@core/models/product";
import {ProductService} from "../../@core/services/products.service";
import {SCDetailsService} from "../../@core/services/s-c.-details.service";
import {Color, S_CDetails, size} from "../../@core/models/SCDetails";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-config-product',
  templateUrl: './config-product.component.html',
  styleUrls: ['./config-product.component.css']
})
export class ConfigProductComponent implements OnInit {
  product: Product = {};
  formAdd!: FormGroup;
  datas!: S_CDetails[];
  productId!: any;
  Page: any;
  size = 5;
  indexPage = 0;
  SCDetail: S_CDetails={};
  dataSize: size[] =[];
  dataColor: Color[] =[];
  message!: String;
  hidden!: boolean;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private configService: SCDetailsService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.movingProduct();
    this.pagination(this.indexPage);
    this.initFormAdd();
    this.getAllSize();
    this.getAllColor();
  }

  movingProduct() {
    this.activeRoute.paramMap.subscribe(
      params => {
        const idProduct = params.get('id');
        if (idProduct) {
          this.productId = idProduct;
          this.productService.getProductById(idProduct).subscribe(
            res => {
              this.product = res;
            }
          )
        }
      }
    )
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      size: ['', Validators.required],
      mau: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('[0-9]{1,10}')]],
      status: ['', Validators.required],
    })
  }

  openLg(content: any) {
    this.SCDetail={};
    this.message="Thêm mới";
    this.initFormAdd();
    this.hidden = true;
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.configService.findConfigProduct(this.indexPage, this.size, this.productId)
      .subscribe({
        next: res => {
          this.datas = res.object.content;
          console.log(this.datas)
          this.Page = res.object;
        }, error: error => {
          this.toastr.error(error.error.message);
        }
      });
  }

  preNextPage(selector: string) {
    if (selector == 'pre') --this.indexPage;
    if (selector == 'next') ++this.indexPage;
    this.pagination(this.indexPage);
  }

  pageItem(pageItems: any) {
    this.size = pageItems;
    this.indexPage = 0;
    this.pagination(this.indexPage);
  }

  addValue() {
    this.SCDetail.product = this.product;
    let sizeId = this.formAdd.value.size;
    this.SCDetail.size = this.dataSize.find(size => {
      return size.id == sizeId;
    });
    let colorID = this.formAdd.value.mau;
    this.SCDetail.mau = this.dataColor.find(mau => {
      return mau.id == colorID;
    });
    this.SCDetail.quantity = this.formAdd.value.quantity;
  }

  create() {
    this.addValue();
    if(this.SCDetail?.quantity! <=0){
      this.toastr.error("Số lượng phải lớn hơn 0");
      return;
    }
    console.log(this.SCDetail)
    this.configService.create(this.SCDetail).subscribe(
      (res) => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  getAllSize(){
    this.configService.getAllSize().subscribe(
      (res: any) => {
        this.dataSize = res;
        console.log(this.datas)
      }
    )
  }

  getAllColor(){
    this.configService.getAllColor().subscribe(
      (res: any) => {
        this.dataColor = res;
        console.log(this.datas)
      }
    )
  }

  fillValueForm() {
    this.formAdd.patchValue({
      size: this.SCDetail.size!.id,
      mau: this.SCDetail.mau!.id,
      quantity: this.SCDetail.quantity,
    })
  }


  infoProduct(id: any, content: any) {
    this.openLg(content);
    this.message = "Cập nhật ";
    this.hidden = false;
    const SCDetailId = this.datas.find(value => {
      return value.id == id;
    })
    if (SCDetailId) {
      this.SCDetail = SCDetailId;
    }
    this.initFormAdd();
    this.fillValueForm();
  }



  update() {
    this.addValue();
    this.configService.create(this.SCDetail).subscribe(
      res =>{
        this.toastr.success(res.message);
        this.ngOnInit();
        this.SCDetail={};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  delete() {
   if(this.SCDetail.id){
     this.configService.delete(this.SCDetail.id).subscribe(
       res =>{
         this.toastr.success("Xóa thành công");
         this.ngOnInit();
         this.SCDetail={};
         this.modalService.dismissAll();
       }, error => {
         this.toastr.error(error.error.message);
       }
     );
   }
  }



}
