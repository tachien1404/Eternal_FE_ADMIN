import {RouterModule, Routes} from "@angular/router";
import {TaoDonHangComponent} from "../tao-don-hang/tao-don-hang.component";
import {NgModule} from "@angular/core";
import {HoaDonChoComponent} from "./hoa-don-cho.component";

const  routes:Routes=[{path:'',component:HoaDonChoComponent}];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class HoaDonChoRouting{}
