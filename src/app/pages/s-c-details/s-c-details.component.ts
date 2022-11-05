import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Color, Product, S_CDetails, S_CDetailSearch, size} from "../../@core/models/SCDetails";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SCDetailsService} from "../../@core/services/s-c.-details.service";
import {SortByValue} from "../../@core/models/ProductSortDTO";

@Component({
  selector: 'app-s-c-details',
  templateUrl: './s-c-details.component.html',
  styleUrls: ['./s-c-details.component.css']
})
export class SCDetailsComponent implements OnInit {

  formAdd!: FormGroup;
  formSearch!: FormGroup;
  datas: S_CDetails[] =[];
  indexPage = 0;
  Page: any;
  size = 5;
  SCSearch : S_CDetailSearch ={};
  dataProduct: Product[]=[];
  dataSize: size[] =[];
  dataColor: Color[] =[];
  SCDetail: S_CDetails={};
  message!: String;
  hidden!: boolean;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private SCService: SCDetailsService,
  ) { }

  ngOnInit(): void {
    this.SCSearch.sortByValues =[];
    this.initFormAdd();
    this.initFormSearch();
    this.pagination(this.indexPage)
    this.getAllColor();
    this.getAllSize();
    this.getAllProduct();

  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      id: '',
      product: '',
      size: '',
      mau: '',
      quantity: '',
      status: '',
    });
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      product: ['', Validators.required],
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

  getAllProduct(){
    this.SCService.getAllProduct().subscribe(
      (res: any) => {
        this.dataProduct = res;
        console.log(this.datas)
      }
    )
  }

  infoSC(id:any,content:any){

  }

  getAllSize(){
    this.SCService.getAllSize().subscribe(
      (res: any) => {
        this.dataSize = res;
        console.log(this.datas)
      }
    )
  }

  getAllColor(){
    this.SCService.getAllColor().subscribe(
      (res: any) => {
        this.dataColor = res;
        console.log(this.datas)
      }
    )
  }


  fillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.SCSearch.id = formSearchValue.id;
    let productID = formSearchValue.product;
    this.SCSearch.product = this.dataProduct.find(product => {
      return product.id == productID;
    });
    let sizeId = formSearchValue.size;
    this.SCSearch.size = this.dataSize.find(size => {
      return size.id == productID;
    });
    let colorID = formSearchValue.mau;
    this.SCSearch.mau = this.dataColor.find(mau => {
      return mau.id == colorID;
    });

    this.SCSearch.quantity = formSearchValue.quantity;
    this.SCSearch.status = formSearchValue.status;
  }

  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.SCService.getPageSC(this.indexPage, this.size, this.SCSearch)
      .subscribe({
        next: res => {
          this.datas = res.object.content;
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

  sortByValue(sortValues: string) {
    const length = this.SCSearch.sortByValues?.length;
    const sortValue: SortByValue = {name: sortValues, type: "desc"}
    if (!length) {
      const sortValue: SortByValue = {name: sortValues, type: "desc"}
      this.SCSearch.sortByValues?.push(sortValue)
    } else {
      let notContacts = true;
      this.SCSearch.sortByValues?.forEach(value => {
        if (value.name == sortValues) {
          value.type = value.type == 'desc' ? 'asc' : 'desc';
          notContacts = false;
        }
      })
      if (notContacts) {
        this.SCSearch.sortByValues?.push(sortValue)
      }
    }
    this.pagination(this.indexPage);
  }

  onSubmitSearch() {
    this.fillValueSearch();
    this.pagination(0);
    this.initFormSearch();
  }

  addValue() {
    let productID = this.formAdd.value.product;
    this.SCDetail.product = this.dataProduct.find(product => {
      return product.id == productID;
    });
    let sizeId = this.formAdd.value.size;
    this.SCDetail.size = this.dataSize.find(size => {
      return size.id == productID;
    });
    let colorID = this.formAdd.value.mau;
    this.SCDetail.mau = this.dataColor.find(mau => {
      return mau.id == colorID;
    });
    this.SCDetail.quantity = this.formAdd.value.quantity;

  }

  create() {
    this.addValue();
    console.log(this.SCDetail)
    this.SCService.create(this.SCDetail).subscribe(
      (res) => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  update() {
    // this.addValueProduct();
    // this.productService.update(this.product.id,this.product).subscribe(
    //   res =>{
    //     this.toastr.success(res.message);
    //     this.ngOnInit();
    //     this.product={};
    //     this.modalService.dismissAll();
    //   }, error => {
    //     this.toastr.error(error.error.message);
    //   }
    // );
  }

  delete() {
    // this.productService.delete(this.product.id).subscribe(
    //   res =>{
    //     this.toastr.success(res.message);
    //     this.ngOnInit();
    //     this.product={};
    //     this.modalService.dismissAll();
    //   }, error => {
    //     this.toastr.error(error.error.message);
    //   }
    // );
  }







}
