import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
    Username: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Fullname: new FormControl('', Validators.required),
    Birthday: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    Photo: new FormControl('', Validators.required),
    SDT: new FormControl('', Validators.required),
  })
  filterForm: FormGroup = new FormGroup({
    Email: new FormControl,
  })
  account: any
  accounts: any
  filename: any

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.filename = 'null.png'
    this.account = {
      id: '',
      username:  '',
      email:  '',
      fullname:  '',
      birthday:  '',
      address:  '',
      photo:  '',
      sdt: ''
    }
    this.accountService.getAll().subscribe(
      res => {
        this.accounts = res
      },
      err => {
        console.log(err)
      }
    )
  }

  onCreate() {
    var file = new FormData();
    if (this.accountForm.controls['Photo'].value != null) {
      file.append('file', `this.accountForm.controls['Photo'].value`);
      this.accountService.uploadImage(file).subscribe(
        error => {
          console.log(error)
        }
      );
    }

    var data = {
      username:  this.accountForm.controls['Username'].value == null ? this.account.username : this.accountForm.controls['Username'].value,
      email:  this.accountForm.controls['Email'].value == null ? this.account.email : this.accountForm.controls['Email'].value,
      fullname:  this.accountForm.controls['Fullname'].value == null ? this.account.fullname : this.accountForm.controls['Fullname'].value,
      birthday:  this.accountForm.controls['Birthday'].value == null ? this.account.birthday : this.accountForm.controls['Birthday'].value,
      address:  this.accountForm.controls['Address'].value == null ? this.account.address : this.accountForm.controls['Address'].value,
      photo:  this.filename == 'null.png' ? this.account.photo : this.filename.replace(" ","%20"),
      sdt:  this.accountForm.controls['SDT'].value == null ? this.account.sdt : this.accountForm.controls['SDT'].value
    }

    this.accountService.create(data).subscribe(
      data => {
        // this.clearForm()
      },
      error => {
        console.log(error);
        // this.clearForm()
      }
    )
  }

  onUpdate(id: string) {
    var data = {
      username:  this.accountForm.controls['Username'].value == null ? this.account.username : this.accountForm.controls['Username'].value,
      email:  this.accountForm.controls['Email'].value == null ? this.account.email : this.accountForm.controls['Email'].value,
      fullname:  this.accountForm.controls['Fullname'].value == null ? this.account.fullname : this.accountForm.controls['Fullname'].value,
      birthday:  this.accountForm.controls['Birthday'].value == null ? this.account.birthday : this.accountForm.controls['Birthday'].value,
      address:  this.accountForm.controls['Address'].value == null ? this.account.address : this.accountForm.controls['Address'].value,
      photo:  this.accountForm.controls['Photo'].value == null ? this.account.photo : this.accountForm.controls['Photo'].value,
      sdt:  this.accountForm.controls['SDT'].value == null ? this.account.sdt : this.accountForm.controls['SDT'].value
    }

    this.accountService.update(id ,data).subscribe(
      res => {
        console.log(res);
        this.clearForm()
      },
      error => {
        console.log(error);
        this.clearForm()
      }
    )
  }

  onDelete(id: string) {
    this.accountService.delete(id).subscribe(
      res => {
        this.clearForm()
      },
      err => {
        console.log(err);
      }
    );
  }

  onEdit(id: string) {
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
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  onFilter(){
    var email: string = this.filterForm.controls['Email'].value == null ? "" : this.filterForm.controls['Email'].value
    this.accountService.search(email).subscribe(
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
      username:  '',
      email:  '',
      fullname:  '',
      birthday:  '',
      address:  '',
      photo:  '',
      sdt: ''
    }
    window.location.reload()
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.filename = file.name;
      this.accountForm.patchValue({
        Image: file
      });
    }
  }
}
