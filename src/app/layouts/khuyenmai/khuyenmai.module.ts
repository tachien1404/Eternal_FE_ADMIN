import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TaoDonHangRouting} from "../tao-don-hang/tao-don-hang.routing";
import {KhuyenmaiRouting} from "./khuyenmai.routing";

@NgModule({
  declarations:[],
  imports:[
    CommonModule,
   KhuyenmaiRouting
  ]
})
export class KhuyenmaiModule{}
