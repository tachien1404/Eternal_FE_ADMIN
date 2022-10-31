import {RouterModule, Routes} from "@angular/router";
import {BrandComponent} from "./brand.component";
import {NgModule} from "@angular/core";

const routes:Routes=[{path:'',component:BrandComponent }];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class BrandRouting{}
