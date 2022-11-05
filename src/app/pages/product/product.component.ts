import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Brand, Category, Product} from "../../@core/models/product";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../@core/services/products.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {computeStartOfLinePositions} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";
import {ProductDTO, SortByValue} from "../../@core/models/ProductSortDTO";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formAdd!: FormGroup;
  formSearch!: FormGroup;
  datas: Product[] = [];
  indexPage = 0;
  Page: any;
  size = 5;
  productDTO: ProductDTO = {};
  dataCate: Category[] = [];
  dataBrand: Brand[] = [];
  product: Product = {};
  message!: String;
  hiddeen!: boolean;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.productDTO.sortByValues = [];
    this.getAllCategory();
    this.getAllBrand();
    this.initFormAdd();
    this.pagination(this.indexPage)
    this.initFormSearch();
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      id: '',
      name: '',
      inportprice: '',
      outputprice: '',
      category: '',
      hang: '',
    });
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      createDate: '',
      inportprice: ['', [Validators.required, Validators.pattern('[0-9]{1,10}')]],
      outputprice: ['', [Validators.required, Validators.pattern('[0-9]{1,10}')]],
      updatedate: '',
      status: ['', Validators.required],
      category: ['', Validators.required],
      hang: ['', Validators.required],
    })
  }

  openLg(content: any) {
    this.product={};
    this.message="Thêm mới";
    this.initFormAdd();
    this.hiddeen = true;
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(
      (res: any) => {
        this.datas = res;
        console.log(this.datas)
      }
    )
  }

  getAllCategory() {
    this.productService.getAllCate().subscribe(
      (res: any) => {
        this.dataCate = res;
      }
    );
  }

  getAllBrand() {
    this.productService.getAllBrand().subscribe(
      (res: any) => {
        this.dataBrand = res;
      }
    );
  }

  fillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.productDTO.id = formSearchValue.id;
    this.productDTO.name = formSearchValue.name;
    this.productDTO.inportprice = formSearchValue.inportprice;
    this.productDTO.outputprice = formSearchValue.outputprice;
    let categoryId = formSearchValue.category;
    this.productDTO.category = this.dataCate.find(category => {
      return category.id == categoryId;
    });
    let brandId = formSearchValue.hang;
    this.productDTO.hang = this.dataBrand.find(brand => {
      return brand.id == brandId;
    });

  }

  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.productService.getPageProduct(this.indexPage, this.size, this.productDTO)
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
    const length = this.productDTO.sortByValues?.length;
    const sortValue: SortByValue = {name: sortValues, type: "desc"}
    if (!length) {
      const sortValue: SortByValue = {name: sortValues, type: "desc"}
      this.productDTO.sortByValues?.push(sortValue)
    } else {
      let notContacts = true;
      this.productDTO.sortByValues?.forEach(value => {
        if (value.name == sortValues) {
          value.type = value.type == 'desc' ? 'asc' : 'desc';
          notContacts = false;
        }
      })
      if (notContacts) {
        this.productDTO.sortByValues?.push(sortValue)
      }
    }
    this.pagination(this.indexPage);
  }

  onSubmitSearch() {
    this.fillValueSearch();
    console.log(this.productDTO)
    this.pagination(0);
    this.initFormSearch();
  }

  addValueProduct() {
    this.product.name = this.formAdd.value.name;
    this.product.inportprice = this.formAdd.value.inportprice;
    this.product.outputprice = this.formAdd.value.outputprice;
    this.product.createDate =this.formAdd.value.createDate;
    let cateId = this.formAdd.value.category;
    this.product.category = this.dataCate.find(category => {
      return category.id == cateId;
    })

    let hangId = this.formAdd.value.hang;
    this.product.hang = this.dataBrand.find(hang => {
      return hang.id == hangId;
    })
  }

  create() {
    this.addValueProduct();
    console.log(this.product)
    this.productService.create(this.product).subscribe(
      (res) => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }


  infoProduct(id: any, content: any) {
    this.openLg(content);
    this.message ="Cập nhật ";
    this.hiddeen = false;
    const productId = this.datas.find(value => {
      return value.id == id;
    })

    if (productId) {
      this.product = productId;
    }
    this.fillValueForm();
  }

  fillValueForm() {
    this.formAdd.patchValue({
      name: this.product.name,
      createDate: this.product.createDate,
      inportprice: this.product.inportprice,
      outputprice: this.product.outputprice,
      updatedate: this.product.updatedate,
      category: this.product.category?.id,
      hang: this.product.hang?.id,
    })
  }

  update() {
    this.addValueProduct();
    this.productService.update(this.product.id,this.product).subscribe(
      res =>{
        this.toastr.success(res.message);
        this.ngOnInit();
        this.product={};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  delete() {
    this.productService.delete(this.product.id).subscribe(
      res =>{
        this.toastr.success(res.message);
        this.ngOnInit();
        this.product={};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }


}
