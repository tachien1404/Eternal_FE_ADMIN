import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductRoutingModule} from "../../product/product-routing.module";
import {CateRoutingModule} from "./cate-routing.module";

@NgModule({
  declarations:[

  ],
  imports: [
    CommonModule,
    CateRoutingModule,
  ]
})
export class CateModule{};
