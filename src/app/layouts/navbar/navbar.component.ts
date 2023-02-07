import { TokenStorageService } from './../../@core/services/Token-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName!: string;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenStorageService,
  ) {

}

ngOnInit(): void {
   this.userName = this.tokenService.getUser()
};
logout(){
  this.tokenService.logout();
  this.toastr.success("Đã đăng xuất")
  this.router.navigate(['/login']);
}
}
