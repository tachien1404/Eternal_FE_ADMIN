import {RouterModule, Routes} from "@angular/router";
import {ConfigProductComponent} from "./config-product.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{ path: '', component: ConfigProductComponent }];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class ConfigProductRoutingModule{}
