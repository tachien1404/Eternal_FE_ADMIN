import {RouterModule, Routes} from "@angular/router";
import {ProductComponent} from "../../product/product.component";
import {NgModule} from "@angular/core";
import {CateModule} from "./cate.module";
import {AddCateComponent} from "./add-cate.component";

const routes: Routes = [{ path: '', component: AddCateComponent }];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class CateRoutingModule{}
