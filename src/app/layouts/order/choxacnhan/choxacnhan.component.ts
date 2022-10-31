import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-choxacnhan',
  templateUrl: './choxacnhan.component.html',
  styleUrls: ['./choxacnhan.component.css']
})
export class ChoxacnhanComponent implements OnInit {
orderdata:any;

  constructor(private service:OrderService) {
this.loadAll0();}
  ngOnInit(): void {
  }
loadAll0(){
    this.service.getBy0().subscribe(result =>{
      this.orderdata=result;
  })
}
Input=new FormGroup({
  status:new FormControl("1")
})
updatetrangthai(id:any){
    this.service.updatetrangthai(this.Input.value,id).subscribe(result=>{
      this.loadAll0()
    });


}
}
