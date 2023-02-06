import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
    Username: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")])),
    Fullname: new FormControl('', Validators.required),
    Birthday: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    Photo: new FormControl(),
    SDT: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[- +()0-9]{10}')])),
    Role: new FormControl('', Validators.required),
    Active: new FormControl,
  })
  filterForm: FormGroup = new FormGroup({
    Email: new FormControl,
    Role: new FormControl,
    Active: new FormControl,
  })
  account: any
  accounts: any
  filename: any
  indexPage = 0;
  Page: any;
  size = 5;
  isDisplayedForm: boolean = false

  constructor(private accountService: AccountService, @Inject(DOCUMENT) document: Document) { }

  ngOnInit(): void {
    this.filename = 'null.png'
    this.account = {
      id: '',
      username: '',
      email: '',
      fullname: '',
      birthday: '',
      address: '',
      photo: 'null.png',
      sdt: '',
      role: false
    }
    this.getAll()
    this.pagination(this.indexPage)
  }

  getAll() {
    this.accountService.getAll(0).subscribe(
      res => {
        this.accounts = res
      },
      err => {
        console.log(err)
      }
    )

    this.accountService.getSize().subscribe(
      res => {
        this.Page = {
          totalPage: res
        }
        console.log(this.Page)
      },
      err => {
        console.log(err)
      }
    )
  }

  showForm() {
    this.isDisplayedForm = !this.isDisplayedForm
  }

  onCreate() {
    var data = {
      username: this.accountForm.controls['Username'].value == null ? this.account.username : this.accountForm.controls['Username'].value,
      email: this.accountForm.controls['Email'].value == null ? this.account.email : this.accountForm.controls['Email'].value,
      fullname: this.accountForm.controls['Fullname'].value == null ? this.account.fullname : this.accountForm.controls['Fullname'].value,
      birthday: this.accountForm.controls['Birthday'].value == null ? this.account.birthday : this.accountForm.controls['Birthday'].value,
      address: this.accountForm.controls['Address'].value == null ? this.account.address : this.accountForm.controls['Address'].value,
      photo: this.filename == 'null.png' ? this.account.photo : this.filename.replace(" ", "%20"),
      sdt: this.accountForm.controls['SDT'].value == null ? this.account.sdt : this.accountForm.controls['SDT'].value,
      role: this.accountForm.controls['Role'].value == null ? this.account.role : this.accountForm.controls['Role'].value,
      active: true
    }

    var check: boolean = true

    this.accounts.forEach((item: { username: any; email: any; }) => {
      if (data.username === item.username || data.email === item.email) {
        check = false;
      }
    });

    if (check) {
      var file = new FormData();
      if (this.accountForm.controls['Photo'].value != null) {
        file.append('file', this.accountForm.controls['Photo'].value);
        this.accountService.uploadImage(file).subscribe(
          error => {
            console.log(error)
          }
        );
      }

      this.accountService.create(data).subscribe(
        data => {
          this.clearForm()
          this.getAll()
        },
        error => {
          console.log(error);
          this.clearForm()
        }
      )
    } else {
      window.alert("Email hoặc Username không hợp lệ.");
    }

  }

  onUpdate(id: string) {

    var data = {
      username: this.accountForm.controls['Username'].value == null ? this.account.username : this.accountForm.controls['Username'].value,
      email: this.accountForm.controls['Email'].value == null ? this.account.email : this.accountForm.controls['Email'].value,
      fullname: this.accountForm.controls['Fullname'].value == null ? this.account.fullname : this.accountForm.controls['Fullname'].value,
      birthday: this.accountForm.controls['Birthday'].value == null ? this.account.birthday : this.accountForm.controls['Birthday'].value,
      address: this.accountForm.controls['Address'].value == null ? this.account.address : this.accountForm.controls['Address'].value,
      photo: this.filename == 'null.png' ? this.account.photo : this.filename.replace(" ", "%20"),
      sdt: this.accountForm.controls['SDT'].value == null ? this.account.sdt : this.accountForm.controls['SDT'].value,
      role: this.accountForm.controls['Role'].value == null ? this.account.role : this.accountForm.controls['Role'].value,
      active: this.accountForm.controls['Active'].value == null ? this.account.active : this.accountForm.controls['Active'].value,
    }

    var check: boolean = true

    this.accounts.forEach((item: { username: any; email: any; }) => {
      if (data.username === item.username || data.email === item.email) {
        check = false;
      }
    });

    if (data.username === this.account.username) check = true;
    if (data.email === this.account.email) check = true;

    if (check) {
      if (this.filename !== 'null.png') {
        var file = new FormData();
        if (this.accountForm.controls['Photo'].value != null) {
          file.append('file', this.accountForm.controls['Photo'].value);
          this.accountService.uploadImage(file).subscribe(
            error => {
              console.log(error)
            }
          );
        }
      }

      this.accountService.update(id, data).subscribe(
        res => {
          console.log(res);
          this.clearForm()
          this.getAll()
        },
        error => {
          console.log(error);
          this.clearForm()
        }
      )
    } else {
      window.alert("Email hoặc Username không hợp lệ.");
    }
  }

  onDelete(id: string) {
    var result = confirm("Confirm?");
    if (result) {
      this.accountService.delete(id).subscribe(
        res => {
          this.clearForm()
          window.alert("Delete succes!!")
          this.getAll()
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  onEdit(id: string) {
    this.isDisplayedForm = true
    this.accountService.find(id).subscribe(
      res => {
        this.account = res
        this.accountForm.patchValue({
          Username: this.account.username,
          Email: this.account.email,
          Fullname: this.account.fullname,
          Birthday: this.account.birthday,
          Address: this.account.address,
          Photo: this.account.photo,
          SDT: this.account.sdt,
          Role: this.account.role,
          Active: this.account.active
        })
        this.accountForm.patchValue({
          SDT: this.account.sdt
        });
        if (res.role){
          document.getElementById("radioAdmin")?.setAttribute("checked", "true")
        } else {
          document.getElementById("radioUser")?.setAttribute("checked", "true")
        }
      },
      err => {
        console.log(err);
      }
    )
    this.accountService.getAll().subscribe(
      res => {
        this.accounts = res
      },
      err => {
        console.log(err)
      }
    )
  }

  onFilter() {
    var email: string = this.filterForm.controls['Email'].value == null ? "" : this.filterForm.controls['Email'].value
    var active: string = this.filterForm.controls['Active'].value == null ? "" : this.filterForm.controls['Active'].value
    var role: string = this.filterForm.controls['Role'].value == null ? "" : this.filterForm.controls['Role'].value

    this.accountService.search(email, active, role).subscribe(
      res => {
        this.accounts = res

      },
      err => {
        this.accounts = new Array
      }
    )
  }

  clearForm() {
    this.accountForm.reset()
    this.account = {
      id: '',
      username: '',
      email: '',
      fullname: '',
      birthday: '',
      address: '',
      photo: 'null.png',
      sdt: '',
      role: false,
      active: false
    }
  }

  clearFilter() {
    this.filterForm.reset()
    this.accountService.getAll(this.indexPage).subscribe(
      res => {
        this.accounts = res
      },
      err => {
        console.log(err)
      }
    )
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.filename = file.name;
      this.accountForm.patchValue({
        Photo: file
      });
    }
  }

  pagination(page: any, pageItems: number = 5) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.accountService.getAll(this.indexPage, pageItems).subscribe(
      res => {
        this.accounts = res
      },
      err => {
        console.log(err)
      }
    )
    this.accountService.getSize(page, pageItems).subscribe(
      res => {
        this.Page = {
          totalPage: res
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  preNextPage(selector: string) {
    if (selector == 'pre') --this.indexPage;
    if (selector == 'next') ++this.indexPage;
    this.pagination(this.indexPage);
  }

  pageItem(pageItems: any) {
    this.size = pageItems;
    this.indexPage = 0;
    this.pagination(this.indexPage, pageItems);
  }

  // viewPage(number: number) {
  //   console.log(number);

  //   this.page = number
  //   this.accountService.getAll(number).subscribe(
  //     res => {
  //       this.accounts = res
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   )
  //   for (let i = 0; i <= this.maxPage; i++) {
  //     if (number === i) {
  //       document.getElementById(`btnPage_${i}`)?.setAttribute("disabled", "true")
  //     } else {
  //       document.getElementById(`btnPage_${i}`)?.removeAttribute("disabled")
  //     }
  //   }
  // }

  // prev() {
  //   this.page = this.page - 1;
  //   this.accountService.getAll(this.page).subscribe(
  //     res => {
  //       this.accounts = res
  //       this.fillBtnPageGroup()
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   )
  // }

  // next() {
  //   this.page = this.page + 1;
  //   this.accountService.getAll(this.page).subscribe(
  //     res => {
  //       this.accounts = res
  //       this.fillBtnPageGroup()
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   )
  // }

  // fillBtnPageGroup() {
  //   this.accountService.getSize().subscribe(
  //     res => {
  //       var length = res
  //       this.maxPage = Math.ceil(Number(length) / 5)
  //       this.pages = Array(this.maxPage).fill(0)

  //       var newPageGroup =
  //         `<button (click)="prev()" type="button" class="btn btn-primary">Prev</button> `

  //       for (let index = 0; index < this.pages.length; index++) {
  //         newPageGroup +=
  //           `<div>
  //           <button type="button" id="btnPage_${index}" class="btn btn-primary"
  //           [disabled]="${index} === 0">${index + 1}</button>
  //       </div>`
  //       }
  //       newPageGroup += `
  //     <button (click)="next()" type="button" class="btn btn-primary">Next</button>`

  //       var div = document.getElementById('btnPageGroup')
  //       if (div) div.innerHTML = newPageGroup

  //       for (let index = 0; index <= this.pages.length; index++) {
  //         var div = document.getElementById(`btnPage_${index}`)
  //         if (this.page === index) {
  //           if (div) div.setAttribute('disabled', 'true')
  //           if (div) div.addEventListener('click', this.viewPage.bind(this, index))
  //         } else {
  //           if (div) div.addEventListener('click', this.viewPage.bind(this, index))
  //         }
  //       }
  //       var btnNext = document.getElementById('btnNext')
  //       var btnPrev = document.getElementById('btnPrev')
  //       if (btnNext) btnNext.addEventListener('click', (e: Event) => {
  //         this.next()
  //       })
  //       if (btnPrev) btnPrev.addEventListener('click', (e: Event) => {
  //         this.prev()
  //       })
  //       if (this.maxPage - 1 === this.page) {
  //         if (btnNext) btnNext.setAttribute('disabled', 'true')
  //       }
  //       if (0 === this.page) {
  //         if (btnPrev) btnPrev.setAttribute('disabled', 'true')
  //       }
  //     }
  //   )
  // }
}
