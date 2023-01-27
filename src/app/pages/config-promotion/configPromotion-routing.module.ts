import {RouterModule, Routes} from "@angular/router";
import {ConfigProductComponent} from "../config-product/config-product.component";
import {NgModule} from "@angular/core";
import {ConfigPromotionComponent} from "./config-promotion.component";

const routes: Routes = [{ path: '', component: ConfigPromotionComponent }];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class ConfigPromotionRoutingModule{}
