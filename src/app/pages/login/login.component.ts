import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../@core/services/UserService.service";
import {TokenStorageService} from "../../@core/services/Token-storage.service";
import {SessionService} from "../../@core/services/SessionService.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isSubmitted = false;
  isLoggedIn = false;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private tokenService: TokenStorageService,
    private router: Router,
    private sessionService: SessionService,
    private  toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formLogin = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
    });
  }

  onSubmit() {
    this.loading=true;
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.userservice.login(this.formLogin.value).subscribe(
        data => {
          this.isLoggedIn = true;
          this.tokenService.saveToken(data.token);
          const jwtDecode = this.userservice.getDecodedAccessToken();
          this.tokenService.saveUser(jwtDecode.sub);
          // this.saveUserId();
          let role = jwtDecode.auth.split(',')
          if (localStorage.getItem('auth-token')
            && (role.includes('ROLE_ADMIN') || role.includes('ROLE_JE'))) {
            this.toastr.success("Đăng nhập thành công")
            this.router.navigate(['/product']);
            return;
          }
          if (localStorage.getItem('auth-token')
            && (role.includes('ROLE_USER'))) {
            this.toastr.error("Bạn phải có quyền Admin mới vào được trang này!")
            this.router.navigate(['/login']);
            return;
          }
        },error => {
          this.toastr.error("Đăng nhập thất bại")
        }
      );
    }
  }


}
