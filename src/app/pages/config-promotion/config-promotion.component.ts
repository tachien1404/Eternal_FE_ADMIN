import { Component, OnInit } from '@angular/core';
import {Promotion, PromotionDetails} from "../../@core/models/Promotion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../@core/services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SCDetailsService} from "../../@core/services/s-c.-details.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PromotionService} from "../../@core/services/promotion.service";
import {Product} from "../../@core/models/product";
import {Color, S_CDetails} from "../../@core/models/SCDetails";
import {toJSDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";

@Component({
  selector: 'app-config-promotion',
  templateUrl: './config-promotion.component.html',
  styleUrls: ['./config-promotion.component.css']
})
export class ConfigPromotionComponent implements OnInit {

  promotionId!: any;
  promotion: Promotion = {};
  datas: PromotionDetails[] = [];
  formAdd!: FormGroup;
  promotionDetails: PromotionDetails = {};
  Page: any;
  size = 5;
  indexPage = 0;
  dataProduct! : Product[];
  message!: String;
  hidden!: boolean;
  constructor(   private fb: FormBuilder,
                 private toastr: ToastrService,
                 private router: Router,
                 private activeRoute: ActivatedRoute,
                 private configService: SCDetailsService,
                 private modalService: NgbModal,
                 private promotionService: PromotionService,
                 private productService: ProductService) { }

  ngOnInit(): void {
    this.movingPromotion();
    this.getAllProduct();
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      product: ['', Validators.required],
    })
  }

  getAllDetailsByPromotion(){
    this.promotionService.getAllDetailByPromotion(this.promotionId).subscribe(
      res =>{
        this.datas = res;
      }
    )
  }

  movingPromotion() {
    this.activeRoute.paramMap.subscribe(
      params => {
        const idPromotion = params.get('id');
        if (idPromotion) {
          this.promotionId = idPromotion;
          this.promotionService.getPromotionById(idPromotion).subscribe(
            res => {
              this.promotion = res;
            }
          )
        }
        this.getAllDetailsByPromotion();
      }
    )
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe(
      res =>{
        this.dataProduct = res;
      }
    )
  }

  openLg(content: any) {
    this.message="Thêm mới";
    this.initFormAdd();
    this.hidden = true;
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  pagination(page: any) {

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
    this.promotionDetails.promotion = this.promotion;
    let productId = this.formAdd.value.product;
    this.promotionDetails.product = this.dataProduct.find(products => {
      return products.id == productId;
    });
  }

  create(){
    this.addValue();
    this.promotionService.config(this.promotionDetails).subscribe(
      res => {
        this.toastr.success("Thêm mới thành công");
        this.ngOnInit();
        this.modalService.dismissAll();
      },error => {
        this.toastr.error("thêm mới thất bại")
      }
    )

  }
  update(){}
  delete(){}
}
