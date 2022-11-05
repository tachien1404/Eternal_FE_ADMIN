import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../@core/models/product";
import {CategoryDTO} from "../../../@core/models/CategorySortDTO";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "../../../@core/services/category.service";
import {SortByValue} from "../../../@core/models/ProductSortDTO";

@Component({
  selector: 'app-add-cate',
  templateUrl: './add-cate.component.html',
  styleUrls: ['./add-cate.component.css']
})
export class AddCateComponent implements OnInit {
  formAdd!: FormGroup;
  formSearch!: FormGroup;
  datas: Category[] = [];
  indexPage = 0;
  Page: any;
  size = 5;
  categoryDTO: CategoryDTO = {};
  category: Category = {};
  message!: String;
  hidden!:boolean;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private cateService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.categoryDTO.sortByValues = [];
    this.formAdd = this.fb.group({
      id:'',
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
    this.pagination(this.indexPage);
    this.initFormSearch();
    this.hidden=false;
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      id: '',
      name: '',
    });
  }

  openLg(content: any) {
    this.message ="Thêm mới ";
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.cateService.getPageProduct(this.indexPage, this.size, this.categoryDTO)
      .subscribe({
        next: res => {
          console.log(res)
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

  onSubmitSearch(){
    this.fillValueSearch();
    this.pagination(0);
    this.initFormSearch();
  }

  fillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.categoryDTO.id = formSearchValue.id;
    this.categoryDTO.name = formSearchValue.name;
  }

  infoCate(id: any,content:any) {
    console.log(this.message)
    this.openLg(content);
    this.message ="Cập nhật ";
    this.hidden=true;
    const cateId = this.datas.find(value => {
      return value.id ==id
    })
    if(cateId){
      this.category = cateId;
    }
    this.fillValueForm();
  }

  sortByValue(sortValues: string) {
    const length = this.categoryDTO.sortByValues?.length;
    const sortValue: SortByValue = {name: sortValues, type: "desc"}
    if (!length) {
      const sortValue: SortByValue = {name: sortValues, type: "desc"}
      this.categoryDTO.sortByValues?.push(sortValue)
    } else {
      let notContacts = true;
      this.categoryDTO.sortByValues?.forEach(value => {
        if (value.name == sortValues) {
          value.type = value.type == 'desc' ? 'asc' : 'desc';
          notContacts = false;
        }
      })
      if (notContacts) {
        this.categoryDTO.sortByValues?.push(sortValue)
      }
    }
    this.pagination(this.indexPage);
  }

  create(){
    this.addValueFrom();
    console.log(this.category.id)
    this.cateService.create(this.category).subscribe(
      res =>{
        this.toastr.success(res.message);
        this.ngOnInit();
        this.category={};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  addValueFrom() {
    this.category.name = this.formAdd.value.name;
  }

  fillValueForm(){
    this.formAdd.patchValue({
      name: this.category.name,
    })
  }

delete(){
  this.cateService.delete(this.category.id).subscribe(
    res =>{
      this.toastr.success(res.message);
      this.ngOnInit();
      this.category={};
      this.modalService.dismissAll();
    }, error => {
      this.toastr.error(error.error.message);
    }
  );
}
}
