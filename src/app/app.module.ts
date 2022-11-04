import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SidebarComponent} from "./sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { BrandComponent } from './layouts/brand/brand.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrandModule} from "./layouts/brand/brand.module";
import { CategoryComponent } from './layouts/category/category.component';
import { OrderComponent } from './layouts/order/order.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Material_module} from "../material_module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    BrandComponent,
    CategoryComponent,
    OrderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    Material_module,
    CommonModule,
    BrowserModule,
    SidebarModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,
FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
