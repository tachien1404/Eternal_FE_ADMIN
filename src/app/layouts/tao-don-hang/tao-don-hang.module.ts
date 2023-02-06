import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CategoryRouting} from "../category/category.routing";
import {TaoDonHangRouting} from "./tao-don-hang.routing";

@NgModule({
  declarations:[],
  imports:[
    CommonModule,
    TaoDonHangRouting,
  ]
})
export class TaoDonHangModule{}
