import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: '', component: ProductComponent }];
@NgModule({
   imports:[RouterModule.forChild(routes)],
   exports:[RouterModule]
})

export class ProductRoutingModule{}
