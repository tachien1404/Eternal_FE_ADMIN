import {RouterModule, Routes} from "@angular/router";
import {TaoDonHangComponent} from "../tao-don-hang/tao-don-hang.component";
import {NgModule} from "@angular/core";
import {DonTaiQuayComponent} from "./don-tai-quay.component";

const  routes:Routes=[{path:'',component:DonTaiQuayComponent}];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class DonTaiQuayRouting{}
