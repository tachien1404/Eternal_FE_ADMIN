import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CateRoutingModule} from "../category/add-cate/cate-routing.module";
import {SCRoutingModule} from "./s-c-routing.module";

@NgModule({
  declarations:[

  ],
  imports: [
    CommonModule,
    SCRoutingModule,
  ]
})
export class SCModule{};
