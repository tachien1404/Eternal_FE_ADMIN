import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "./@core/services/Token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eternal_Fe_Admin';
  constructor(
    private  toastr: ToastrService,
    private router: Router,
    private tokenService: TokenStorageService,
  ){}

  logout(){
    this.tokenService.logout();
    this.toastr.success("Đã đăng xuất")
    this.router.navigate(['/login']);
  }
}
