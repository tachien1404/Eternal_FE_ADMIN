import { ProductRoutingModule } from './product-routing.module';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { NgModule } from "@angular/core";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations:[

  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
  ]
})
export class ProductModule{}
