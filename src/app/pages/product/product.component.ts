import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Brand, Category, Product, ShoeLine, Sole} from "../../@core/models/product";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../@core/services/products.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {computeStartOfLinePositions} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";
import {ProductDTO, SortByValue} from "../../@core/models/ProductSortDTO";
import {SCDetailsService} from "../../@core/services/s-c.-details.service";
import {CategoryService} from "../../@core/services/category.service";
import {BrandService} from "../../service/brand.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formAdd!: FormGroup;
  formSearch!: FormGroup;
  formAddCate!: FormGroup;
  formAddBrand!: FormGroup;
  datas: Product[] = [];
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
  category: Category = {};
  brand: Brand = {};
  //tuấn
listproduct:any;//getalllistvaf phân trang
  p:number=1;
   brand_id: any;
  category_id: any;
  sole_id: any;
  startgia: any;
  endgia: any;
  namesot:any;
  trangthai: any;
 // end

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private productService: ProductService,
    private cateService: CategoryService,
    private brandService: BrandService,
  ) {
  }

  ngOnInit(): void {
    this.filename = 'null.png'
    this.productDTO.sortByValues = [];
    this.getAllCategory();
    this.getAllBrand();
    this.getAllSole();
    this.getAllShoeLine();
    this.initFormAdd();
    this.pagination(this.indexPage)
    this.initFormSearch();
    this.initFormAddCate();
    this.initFormAddBrand();
    this.getAllProduct();
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      name: '',
      outputprice: '',
      category: '',
      hang: '',
      sole: '',
      shoeLine: '',
    });
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
     // createDate: '',
      outputprice: ['', [Validators.required, Validators.pattern('[0-9]{1,10}')]],
      //updatedate: '',
      Photo: 'null.png',
      status: ['', Validators.required],
      category: ['', Validators.required],
      hang: ['', Validators.required],
      sole: ['', Validators.required],
      shoeLine: ['', Validators.required],
    })
  }

  initFormAddCate(){
    this.formAddCate = this.fb.group({
      id:'',
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  initFormAddBrand(){
    this.formAddBrand = this.fb.group({
      id:'',
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  openLg(content: any) {
    this.product = {};
    this.message = "Thêm mới";
    this.initFormAdd();
    this.hiddeen = true;
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }
  ////Tuấn
  productFrom = new FormGroup({
    name: new FormControl(''),
    hang_id: new FormControl(''),
    sole_id: new FormControl(''),
    category_id: new FormControl(''),
    startgia: new FormControl(''),
    endgia: new FormControl(''),
    status: new FormControl(''),
  })
  bocloc() {
    this.serchNameProduct();
  }
  serchNameProduct() {
    this.productFrom.value.name = this.namesot;
    this.productFrom.value.hang_id = this.brand_id;
    this.productFrom.value.category_id = this.category_id;
    this.productFrom.value.sole_id = this.sole_id;
this.productFrom.value.status=this.trangthai;
    this.productFrom.value.startgia = this.startgia;
    this.productFrom.value.endgia = this.endgia;
    this.productService.bolocproductadmin(this.productFrom.value).subscribe(result => {
      this.listproduct = result;

    })


  }
  getAllProduct() {
    this.productService.bolocproductadmin(this.productFrom.value).subscribe(
      result => {
        this.listproduct =result;
        console.log(this.listproduct)
      }
    )
  }
  laycategory(value: string) {
    if (value == '100') {
      this.category_id = null;
      console.log("có")
      console.log(this.category_id)
    } else {
      this.category_id = value;
    }

  }
  laygia(value: string) {
    if (value == '100') {
      this.startgia = null;
      this.endgia = null;
    }
    if (value == '1') {
      this.startgia = 400000;
      this.endgia = 1000000;
    }
    if (value == '2') {
      this.startgia = 1000000;
      this.endgia = 1500000;
    }
    if (value == '3') {
      this.startgia = 1500000;
      this.endgia = 2000000;
    }
  }
  laybrand(value: string) {

    if (value == '100') {
      console.log("có")
      this.brand_id = null;
    } else {
      this.brand_id = value;
    }

  }

  laysole(value: string) {
    if (value == '100') {
      console.log("có")
      this.sole_id = null;
    } else {
      this.sole_id = value;
    }

  }

  laytrangthai(value: string) {
    if (value == '100') {

      this.trangthai = null;
    } else {
      this.trangthai = value;
    }
  }


//end tuấn
  getAllCategory() {
    this.productService.getAllCate().subscribe(
      (res: any) => {
        this.dataCate = res;
        console.log(this.dataCate)
      }
    );
  }

  getAllBrand() {
    this.productService.getAllBrand().subscribe(
      (res: any) => {
        this.dataBrand = res;
        console.log(this.dataBrand)
      }
    );
  }

  getAllSole() {
    this.productService.getAllSole().subscribe(
      (res: any) => {
        this.dataSole = res;
        console.log(this.dataSole)
      }
    );
  }

  getAllShoeLine() {
    this.productService.getAllShoeLine().subscribe(
      (res: any) => {
        this.dataShoeLine = res;
        console.log(this.dataShoeLine)
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
    let soleId = formSearchValue.sole;
    this.productDTO.sole = this.dataSole.find(sole => {
      return sole.id == soleId;
    });
    let shoeLineId = formSearchValue.shoeLine;
    this.productDTO.shoeLine = this.dataShoeLine.find(shoeLine => {
      return shoeLine.id == shoeLineId;
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

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      var tmp = '' + file.name
      this.filename = file.name
      console.log(this.filename);

      this.formAdd.patchValue({
        Photo: file
      });
    }
  }

  onSubmitSearch() {
    this.fillValueSearch();
    console.log(this.productDTO)
    this.pagination(0);
    this.initFormSearch();
  }

  addValueProduct() {
    this.product.name = this.formAdd.value.name;
    this.product.outputprice = this.formAdd.value.outputprice;
    this.product.photo = this.filename.replace(" ", "%20");
    let cateId = this.formAdd.value.category;
    this.product.category = this.dataCate.find(category => {
      return category.id == cateId;
    })

    let hangId = this.formAdd.value.hang;
    this.product.hang = this.dataBrand.find(hang => {
      return hang.id == hangId;
    })

    let soleId = this.formAdd.value.sole;
    this.product.sole = this.dataBrand.find(sole => {
      return sole.id == soleId;
    })

    let shoeLineId = this.formAdd.value.shoeLine;
    this.product.shoeLine = this.dataBrand.find(shoeLine => {
      return shoeLine.id == shoeLineId;
    })
    this.product.status = 1;
  }

  create() {
    this.addValueProduct();
    var file = new FormData();
    file.append('file', this.formAdd.controls['Photo'].value);
    this.productService.uploadImage(file).subscribe(
      error => {
        console.log(error)
      }
    );
    console.log(`hhh ${this.product.photo}`);

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
    this.message = "Cập nhật ";
    this.hiddeen = false;
    const productId = this.datas.find(value => {
      return value.id == id;
    })
    if (productId) {
      this.product = productId;
    }
    this.initFormAdd();
    this.fillValueForm();
  }

  fillValueForm() {
    this.formAdd.patchValue({
      name: this.product.name,
      outputprice: this.product.outputprice,
      category: this.product.category!.id,
      hang: this.product.hang!.id,
      sole: this.product.sole!.id,
      shoeLine: this.product.shoeLine!.id,
      status: this.product.status,
      createDate: this.product.createDate,
      updatedate: this.product.updatedate,
    })
  }

  update() {
    if (this.filename !== this.product.photo) {
      var file = new FormData();
      file.append('file', this.formAdd.controls['Photo'].value);
      this.productService.uploadImage(file).subscribe(
        error => {
          console.log(error)
        }
      );
    }
    this.addValueProduct();
    console.log(this.product);

    this.productService.update(this.product.id, this.product).subscribe(
      res => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.product = {};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  delete() {
    this.productService.delete(this.product.id).subscribe(
      res => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.product = {};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  config(id: any) {
    const url = "configProduct/" + id;
    this.router.navigate([url]);
  }

  quickAddCategory(contentCate: any){
    this.modalService.dismissAll();
    this.modalService.open(contentCate, {size: 'lg', centered: true, scrollable: true});
  }

  addValueFromCate() {
    this.category.name = this.formAddCate.value.name;
  }

  createCate(content: any){
    this.addValueFromCate();
    this.cateService.quickAdd(this.category).subscribe(
      res =>{
        this.toastr.success(res.message);
        this.category={};
        this.getAllCategory();
        this.modalService.dismissAll();
        this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }


  quickAddBrand(contentBrand: any){
    this.modalService.dismissAll();
    this.modalService.open(contentBrand, {size: 'lg', centered: true, scrollable: true});
  }

  addValueFromBrand() {
    this.brand.name = this.formAddBrand.value.name;
  }

  createBrand(content: any){
    this.addValueFromBrand();
    this.brandService.create(this.brand).subscribe(
      res =>{
        this.toastr.success(res.message);
        this.brand={};
        this.getAllBrand();
        this.modalService.dismissAll();
        this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }



}
