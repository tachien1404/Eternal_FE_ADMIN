import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrandRouting} from "../brand/brand.routing";
import {CategoryRouting} from "./category.routing";

@NgModule({
  declarations:[],
  imports:[
    CommonModule,
    CategoryRouting
  ]
})
export class CategoryModule{}
