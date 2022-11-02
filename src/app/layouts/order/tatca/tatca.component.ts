import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tatca',
  templateUrl: './tatca.component.html',
  styleUrls: ['./tatca.component.css']
})
export class TatcaComponent implements OnInit {
  orderdata:any;
  constructor(private service:OrderService) {
    this.loadAll();
  }

  ngOnInit(): void {
  }
Input=new FormGroup(
  {
    pageIndex:new FormControl('1'),
    pageSize:new FormControl('10')
  }
)
  loadAll(){
    this.service.getByPage(this.Input.value).subscribe(result =>{
      this.orderdata=result
    })
  }
}
