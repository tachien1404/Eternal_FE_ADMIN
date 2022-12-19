import {RouterModule, Routes} from "@angular/router";
import {TaoDonHangComponent} from "../tao-don-hang/tao-don-hang.component";
import {NgModule} from "@angular/core";
import {KhuyenmaiComponent} from "./khuyenmai.component";

const  routes:Routes=[{path:'',component:KhuyenmaiComponent}];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class KhuyenmaiRouting{}
