import {RouterModule, Routes} from "@angular/router";
import {TaoDonHangComponent} from "../tao-don-hang/tao-don-hang.component";
import {NgModule} from "@angular/core";
import {ThongkeComponent} from "./thongke.component";

const  routes:Routes=[{path:'',component:ThongkeComponent}];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ThongkeRouting{}
