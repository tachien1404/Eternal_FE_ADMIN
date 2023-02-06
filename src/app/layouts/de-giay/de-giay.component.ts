import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Sole } from "../../@core/models/product";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SoleService } from 'src/app/service/sole.service';

@Component({
  selector: 'app-de-giay',
  templateUrl: './de-giay.component.html',
  styleUrls: ['./de-giay.component.css']
})
export class DeGiayComponent implements OnInit {
  formAdd!: FormGroup;
  formSearch!: FormGroup;
  indexPage = 0;
  Page: any;
  size = 5;
  dataSole: Sole[] = [];
  message!: String;
  hiddeen!: boolean;
  sole: Sole = {}
  soles: Sole[] = []

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private soleService: SoleService,
  ) { }

  ngOnInit() {
    this.getAll();
    this.initFormAdd();
    this.pagination(this.indexPage)
    this.initFormSearch();
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      keyword: '',
      Active: "all"
    });
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      name: ['', Validators.required],
      Active: ['false']
    })
  }

  openLg(content: any) {
    this.sole = {};
    this.message = "Thêm mới";
    this.initFormAdd();
    this.hiddeen = true;
    this.modalService.open(content, { size: 'lg', centered: true, scrollable: true });
  }

  getAll() {
    this.soleService.getAll().subscribe(
      (res: any) => {
        this.soles = res.content;
        console.log(this.soles)
      }
    );
  }

  fillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.sole.id = formSearchValue.id;
    this.sole.name = formSearchValue.name;
  }

  onSubmitSearch() {
    this.fillValueSearch();
      this.soleService.search(this.formSearch.value.keyword, this.formSearch.value.Active).subscribe(
        res => {
          this.soles = res
        },
        error => {
          this.toastr.error("Not found");
          this.pagination(0)
        }
      )
  }

  addValue() {
    this.sole.name = this.formAdd.value.name;
    this.sole.isdelete = this.formAdd.value.Active
  }

  create() {
    let valid = false
    if (this.formAdd.value.name.trim().length > 0) {
      valid = true
    }
    this.addValue();
    valid ? this.soleService.create(this.sole).subscribe(
      (res) => {
        this.toastr.success("Success !");
        this.ngOnInit();
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Lỗi Nhập liễu :<");
      }
    ) : this.toastr.error("Invalid Form");
  }

  info(id: any, content: any) {
    this.openLg(content);
    this.message = "Cập nhật ";
    this.hiddeen = false;
    const soleId = this.soles.find(value => {
      return value.id == id;
    })
    if (soleId) {
      this.sole = soleId;
    }
    this.initFormAdd();
    this.fillValueForm();
  }

  fillValueForm() {
    this.formAdd.patchValue({
      name: this.sole.name,
      Active: this.sole.isdelete
    })
  }

  update() {
    let valid = false
    if (this.formAdd.value.name.trim().length > 0) {
      valid = true
    }
    this.sole.name = this.formAdd.value.name
    this.sole.isdelete = this.formAdd.value.Active
    this.sole.id && valid ? this.soleService.update(this.sole.id, this.sole).subscribe(
      res => {
        this.toastr.success("Success !");
        this.ngOnInit();
        this.sole = {};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Lỗi nhập liệu :<");
      }
    ) : this.toastr.error("Invalid Form");
  }

  delete() {
    this.sole.id && confirm("Bạn có chắn muốn xóa không?") ? this.soleService.delete(this.sole.id).subscribe(
      res => {
        this.toastr.success("Success !");
        this.ngOnInit();
        this.sole = {};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Lỗi :<");
      }
    ) : ""
  }

  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.soleService.getPage(this.indexPage, this.size, this.sole)
      .subscribe({
        next: res => {
          this.soles = res.content;
          console.log(this.soles)
          this.Page = res;
        }, error: error => {
          this.toastr.error("Lỗi :<");
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


}
