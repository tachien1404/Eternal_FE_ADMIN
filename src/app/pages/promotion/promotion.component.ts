import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Brand, Category, Product, ShoeLine, Sole} from "../../@core/models/product";
import {ProductDTO} from "../../@core/models/ProductSortDTO";
import {Promotion} from "../../@core/models/Promotion";
import {PromotionService} from "../../@core/services/promotion.service";
import {toJSDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  formAdd!: FormGroup;
  formSearch!: FormGroup;
  datas: Promotion[] = [];
  promotion: Promotion ={};
  indexPage = 0;
  Page: any;
  filename: any;
  size = 5;
  productDTO: ProductDTO = {};
  dataCate: Category[] = [];
  dataBrand: Brand[] = [];
  dataSole: Sole[] = [];
  dataShoeLine: ShoeLine[] = [];
  product: Product = {};
  message!: String;
  hiddeen!: boolean;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private promotionService: PromotionService,
  ) { }

  ngOnInit(): void {
    this.initFormAdd();
    this.getAll();
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      starttime: ['', Validators.required],
      endtime: ['', Validators.required],
      value: ['', [Validators.required, Validators.pattern('[0-9]{1,10}')]],
    })
  }

  addValuePromotion(){
    this.promotion.name = this.formAdd.value.name;
    this.promotion.starttime = this.formAdd.value.starttime;
    this.promotion.endtime = this.formAdd.value.endtime;
    this.promotion.value = this.formAdd.value.value;
  }

  getAll(){
    this.promotionService.getAll().subscribe(
      res => {
        this.datas = res;
      }
    )
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
  create(){
    this.addValuePromotion();
    this.promotionService.create(this.promotion).subscribe(
      (res) =>{
        this.toastr.success(res.message);
      },error => {
        this.toastr.error("Tạo thất bại")
      }
    )
  }
  config(id:any){
    const url = "configPromotion/" + id;
    this.router.navigate([url]);
  }
}
