import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
categoryData:any;
save:any;
  messageclass = '';
  message = '';

  constructor(private service:CategoryService) {
    this.loadAll();
  }

  ngOnInit(): void {
  }
loadAll(){
    this.service.getAllCategory().subscribe(result =>{
      this.categoryData=result;

    });
}
categoryFrom=new FormGroup({
  name:new FormControl('',Validators.required)
});
  saveCateory(){
    if(this.categoryFrom.valid){
      this.service.saveCategory(this.categoryFrom.value).subscribe(result =>{
        this.save=result;
        if(this.save!=null){
          this.loadAll()
          this.message = "saev succes"
          this.messageclass = "success"
        }else{
          this.message = "save feu"
          this.messageclass = 'ero'
        }
      })
    }
  }
  get name() {
    return this.categoryFrom.get('name');
  }
}
