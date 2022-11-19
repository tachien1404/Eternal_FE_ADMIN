
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



@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CategoryComponent,
    OrderComponent,
    AddCateComponent,
    ProductComponent,
    SCDetailsComponent,
    AccountComponent
  ],
  imports: [
    BrowserAnimationsModule,
    Material_module,
    CommonModule,
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    ReactiveFormsModule,
FormsModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
