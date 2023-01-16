import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Size } from "../../@core/models/product";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SizeService } from 'src/app/service/size.service';
import {computeStartOfLinePositions} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-size-giay',
  templateUrl: './size-giay.component.html',
  styleUrls: ['./size-giay.component.css']
})
export class SizeGiayComponent implements OnInit {
  formAdd!: FormGroup;
  formSearch!: FormGroup;
  indexPage = 0;
  Page: any;
  sizePage = 5;
  datas: Size[] = [];
  message!: String;
  hiddeen!: boolean;
  size: Size = {}
  sizes: Size[] = []
  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private sizeService: SizeService,
  ) { }

  ngOnInit() {
    this.getAll();
    this.initFormAdd();
    this.pagination(this.indexPage)
    this.initFormSearch();
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      keyword: ''
    });
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      value: ['', Validators.required]
    })
  }

  openLg(content: any) {
    this.size = {};
    this.message = "Thêm mới";
    this.initFormAdd();
    this.hiddeen = true;
    this.modalService.open(content, { size: 'lg', centered: true, scrollable: true });
  }

  getAll() {
    this.sizeService.getAll().subscribe(
      (res: any) => {
        this.sizes = res.content;
        console.log(this.sizes)
      }
    );
  }

  fillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.size.id = formSearchValue.id;
    this.size.value = formSearchValue.value;
  }

  onSubmitSearch() {
    this.fillValueSearch();
    String(this.formSearch.value.keyword).trim() ?
      this.sizeService.search(this.formSearch.value.keyword).subscribe(
        res => {
          this.sizes = res
        },
        error => {
          this.toastr.error("Not found");
          this.pagination(0)
        }
      )
      :
      this.pagination(0)
    this.initFormSearch();
  }

  addValue() {
    this.size.value = this.formAdd.value.value;
  }

  create() {
    let valid = false
    if (String(this.formAdd.value.value).trim().length > 0) {
      valid = true
    }
    this.addValue();
    valid ? this.sizeService.create(this.size).subscribe(
      (res) => {
        this.toastr.success("Success !");
        this.ngOnInit();
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Some things went wrong :<");
      }
    ): this.toastr.error("Invalid Form");
  }

  info(id: any, content: any) {
    this.openLg(content);
    this.message = "Cập nhật ";
    this.hiddeen = false;
    const sizeId = this.sizes.find(value => {
      return value.id == id;
    })
    if (sizeId) {
      this.size = sizeId;
    }
    this.initFormAdd();
    this.fillValueForm();
  }

  fillValueForm() {
    this.formAdd.patchValue({
      value: this.size.value
    })
  }

  update() {
    let valid = false
    if (String(this.formAdd.value.value).trim().length > 0) {
      valid = true
    }
    this.size.value = this.formAdd.value.value
    this.size.id && valid ? this.sizeService.update(this.size.id, this.size).subscribe(
      res => {
        this.toastr.success("Success !");
        this.ngOnInit();
        this.size = {};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Some things went wrong :<");
      }
    ) : this.toastr.error("Invalid Form");
  }

  deleteSizeGiay() {
    this.size.id  && confirm("Are u sure?") ? this.sizeService.delete(this.size.id).subscribe(
      res => {
        this.toastr.success("Success !");
        this.ngOnInit();
        this.size = {};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Some things went wrong :<");
      }
    ) : ""
  }

  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.sizeService.getPage(this.indexPage, this.sizePage, this.size)
      .subscribe({
        next: res => {
          this.sizes = res.content;
          console.log(this.sizes)
          this.Page = res;
        }, error: error => {
          this.toastr.error("Some things went wrong :<");
        }
      });
  }

    preNextPage(selector: string) {
    if (selector == 'pre') --this.indexPage;
    if (selector == 'next') ++this.indexPage;
    this.pagination(this.indexPage);
  }

  pageItem(pageItems: any) {
    this.sizePage = pageItems;
    this.indexPage = 0;
    this.pagination(this.indexPage);
  }
}
