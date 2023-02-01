
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './layouts/brand/brand.component';
import {HttpClientModule} from "@angular/common/http";
import { CategoryComponent } from './layouts/category/category.component';
import { OrderComponent } from './layouts/order/order.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Material_module} from "../material_module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddCateComponent} from "./pages/category/add-cate/add-cate.component";
import {ProductComponent} from "./pages/product/product.component";
import {SCDetailsComponent} from "./pages/s-c-details/s-c-details.component";
import {ToastrModule} from "ngx-toastr";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { AccountComponent } from './layouts/account/account.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TaoDonHangComponent } from './layouts/tao-don-hang/tao-don-hang.component';


import {NgChartsModule} from "ng2-charts";
import {ThongkeComponent} from "./layouts/thongke/thongke.component";
import {LoginComponent} from "./pages/login/login.component";
import {CookieModule} from "ngx-cookie";
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ConfigProductComponent } from './pages/config-product/config-product.component';
import { MauSacComponent } from './layouts/mau-sac/mau-sac.component';
import { SizeGiayComponent } from './layouts/size-giay/size-giay.component';
import { DeGiayComponent } from './layouts/de-giay/de-giay.component';
import { DonTaiQuayComponent } from './layouts/don-tai-quay/don-tai-quay.component';



@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CategoryComponent,
    OrderComponent,
    AddCateComponent,
    ProductComponent,
    SCDetailsComponent,
    AccountComponent,
    TaoDonHangComponent,

    ThongkeComponent,
    LoginComponent,
    SideBarComponent,
    NavbarComponent,
    ConfigProductComponent,
    MauSacComponent,
    SizeGiayComponent,
    DeGiayComponent,
    DonTaiQuayComponent
  ],
    imports: [
        BrowserAnimationsModule,
        Material_module,
        CommonModule,
        BrowserModule,

        AppRoutingModule, HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        NgbModule,
        NgxPaginationModule, NgChartsModule,
      CookieModule.forRoot(),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
