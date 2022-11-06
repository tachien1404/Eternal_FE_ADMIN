import { Component, OnInit,ViewChild } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalPopupComponent} from "../modal-popup/modal-popup.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tatca',
  templateUrl: './tatca.component.html',
  styleUrls: ['./tatca.component.css']
})
export class TatcaComponent implements OnInit {
  orderdata:any;
  dataSource: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private service:OrderService,private dialog: MatDialog) {
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
      this.orderdata=result;
      this.dataSource = new MatTableDataSource(this.orderdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  OpenDialog(enteranimation: any, exitanimation: any,id:any,statusname:any) {

    this.dialog.open(ModalPopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "100%",
      data:{
        id:id,
        statusname:statusname
      },

    })
  }
}
