import { Component, OnInit } from '@angular/core';
import { ShoeLine } from '../../@core/models/product';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShoelineService } from '../../service/shoeline.service';

@Component({
  selector: 'app-shoelineshoe',
  templateUrl: './shoelineshoe.component.html',
  styleUrls: ['./shoelineshoe.component.css']
})
export class ShoelineshoeComponent implements OnInit {
  formAdd!: FormGroup;
  formSearch!: FormGroup;
  indexPage = 0;
  Page: any;
  size = 5;
  dataSole: ShoeLine[] = [];
  message!: String;
  hiddeen!: boolean;
  shoeLine: ShoeLine = {}
  shoeLines: ShoeLine[] = []

  constructor(
    private fb: FormBuilder,
    private readonly Router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private ShoelineService: ShoelineService,
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
      Active: ['true']
    })
  }

  openLg(content: any) {
    this.shoeLine = {};
    this.message = "Thêm mới";
    this.initFormAdd();
    this.hiddeen = true;
    this.modalService.open(content, { size: 'lg', centered: true, scrollable: true });
  }

  getAll() {
    this.ShoelineService.getAll().subscribe(
      (res: any) => {
        this.shoeLines = res.content;
        console.log(this.shoeLines)
      }
    );
  }
  filterForm: FormGroup = new FormGroup({
    keyword: new FormControl,
  })
  clearFilter() {
    this.filterForm.reset()
    this.ShoelineService.getAll().subscribe(
      (res: any) => {
        this.shoeLines = res.content;
        console.log(this.shoeLines)
      }
    );
  }

  fillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.shoeLine.id = formSearchValue.id;
    this.shoeLine.name = formSearchValue.name;
  }

  onSubmitSearch() {
    this.fillValueSearch();
      this.ShoelineService.search(this.formSearch.value.keyword, this.formSearch.value.Status).subscribe(
        res => {
          this.shoeLines = res
        },
        error => {
          this.toastr.error("Không tìm thấy!!");
          this.pagination(0)
        }
      )
    this.initFormSearch();
  }

  addValue() {
    this.shoeLine.name = this.formAdd.value.name;
    this.shoeLine.isdelete = this.formAdd.value.Active;
  }

  create() {
    let valid = false
    if (this.formAdd.value.name.trim().length > 0) {
      valid = true
    }
    this.addValue();
    valid ? this.ShoelineService.create(this.shoeLine).subscribe(
      (res) => {
        this.toastr.success("Success !");
        this.ngOnInit();
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Lỗi nhập liệu");
      }
    ) : this.toastr.error("Invalid Form");
  }

  info(id: any, content: any) {
    this.openLg(content);
    this.message = "Cập nhật ";
    this.hiddeen = false;
    const ShoeLineId = this.shoeLines.find(value => {
      return value.id == id;
    })
    if (ShoeLineId) {
      this.shoeLine = ShoeLineId;
    }
    this.initFormAdd();
    this.fillValueForm();
  }

  fillValueForm() {
    this.formAdd.patchValue({
      name: this.shoeLine.name,
      Active: this.shoeLine.isdelete
    })
  }

  update() {
    let valid = false
    if (this.formAdd.value.name.trim().length > 0) {
      valid = true
    }
    this.shoeLine.name = this.formAdd.value.name
    this.shoeLine.isdelete = this.formAdd.value.Active
    this.shoeLine.id && valid ? this.ShoelineService.update(this.shoeLine.id, this.shoeLine).subscribe(
      res => {
        this.toastr.success("Success !");
        this.ngOnInit();
        this.shoeLine = {};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Lỗi :<");
      }
    ) : this.toastr.error("Invalid Form");
  }

  delete() {
    this.shoeLine.id && confirm("Bạn có chắn chắn xóa?") ? this.ShoelineService.delete(this.shoeLine.id).subscribe(
      res => {
        this.toastr.success("Success !");
        this.ngOnInit();
        this.shoeLine = {};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error("Lỗi");
      }
    ) : ""
  }

  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.ShoelineService.getPage(this.indexPage, this.size, this.shoeLine)
      .subscribe({
        next: res => {
          this.shoeLines = res.content;
          this.Page = res;
        }, error: error => {
          this.toastr.error("Lỗi ");
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



