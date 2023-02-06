import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Color } from "../../@core/models/product";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColorService } from 'src/app/service/color.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';


@Component({
  selector: 'app-mau-sac',
  templateUrl: './mau-sac.component.html',
  styleUrls: ['./mau-sac.component.css']
})
export class MauSacComponent implements OnInit {
  public colorPicker: string = '#ffffff';
  formAdd!: FormGroup;
  formSearch!: FormGroup;
  indexPage = 0;
  Page: any;
  size = 5;
  datas: Color[] = [];
  message!: String;
  hiddeen!: boolean;
  color: Color = {}
  colors: Color[] = []

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService,
    public modalService: NgbModal,
    private colorService: ColorService,
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
      Status: "all"
    });
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      Active: ['false']
    })
  }


  openLg(content: any) {
    this.color = {};
    this.message = "Thêm mới";
    this.initFormAdd();
    this.hiddeen = true;
    this.modalService.open(content, { size: 'lg', centered: true, scrollable: true });
  }

  getAll() {
    this.colorService.getAll().subscribe(
      (res: any) => {
        this.colors = res.content;
        console.log(this.colors)
      }
    );
  }

  fillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.color.id = formSearchValue.id;
    this.color.name = formSearchValue.name;
  }

  onSubmitSearch() {
    this.fillValueSearch();
      this.colorService.search(this.formSearch.value.keyword, this.formSearch.value.Status).subscribe(
        res => {
          this.colors = res
        },
        error => {
          this.toastr.error("Not found");
          this.pagination(0)
        }
      )
    this.initFormSearch();
  }

  addValue() {
    this.color.name = this.formAdd.value.name;
    this.color.value = this.formAdd.value.value;
  }

  create() {
    this.addValue();
    let valid = false
    if (this.formAdd.value.name.trim().length > 0
        && this.formAdd.value.value.trim().length > 0) {
      valid = true
    }
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i].name?.trim() === this.formAdd.value.name.trim()
          || this.colors[i].value?.trim() === this.formAdd.value.value.trim()) {
           valid = false;
           break
      }
  }
    valid == true ? this.colorService.create(this.color).subscribe(
      (res) => {
        this.toastr.success("Success!");
        this.ngOnInit();
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Lỗi Nhập Liệu :<");
      }
    )
    :
    this.toastr.error("Invalid Form");
  }

  info(id: any, content: any) {
    this.openLg(content);
    this.message = "Cập nhật ";
    this.hiddeen = false;
    const colorId = this.colors.find(value => {
      return value.id == id;
    })
    if (colorId) {
      this.color = colorId;
    }
    this.initFormAdd();
    this.fillValueForm();
  }

  fillValueForm() {
    this.formAdd.patchValue({
      name: this.color.name,
      value: this.color.value,
      Active: this.color.isdelete
    })
  }

  update() {
    let valid = false
    if (this.formAdd.value.name.trim().length > 0
        && String(this.formAdd.value.value).trim().length > 0) {
      valid = true
    }
    this.color.name = this.formAdd.value.name.trim()
    this.color.value = this.formAdd.value.value.trim()
    this.color.isdelete = this.formAdd.value.Active
    this.color.id && valid ? this.colorService.update(this.color.id, this.color).subscribe(
      res => {
        this.toastr.success("Success!");
        this.ngOnInit();
        this.color = {};
        this.modalService.dismissAll();
      }, error => {
        console.log(error);

        this.toastr.error("Lỗi :<");
      }
    ) : this.toastr.error("Invalid Form");
  }

  delete() {
    this.color.id && confirm("Bạn đã chắn chắn xóa chưa?") ? this.colorService.delete(this.color.id).subscribe(
      res => {
        this.toastr.success("Success!");
        this.ngOnInit();
        this.color = {};
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
    this.colorService.getPage(this.indexPage, this.size, this.color)
      .subscribe({
        next: res => {
          this.colors = res.content;
          console.log(this.colors)
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
