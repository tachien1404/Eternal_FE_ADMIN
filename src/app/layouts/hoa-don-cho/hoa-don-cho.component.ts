import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-hoa-don-cho',
  templateUrl: './hoa-don-cho.component.html',
  styleUrls: ['./hoa-don-cho.component.css']
})
export class HoaDonChoComponent implements OnInit {
  Order: any;
  p: number = 1;

  constructor(private orderService: OrderService, private toastr: ToastrService) {
    this.getAll();
  }

  ngOnInit(): void {
  }

  getAll() {
    this.orderService.getBy6().subscribe(result => {
      this.Order = result;
      console.log(this.Order)
    })
  }
delete(id:any){
    this.orderService.deleteorder(id).subscribe(result =>{

      this.toastr.success("Xóa thành công");
      this.getAll();
    },error => {
      this.toastr.error("Xóa thất bại");
    })
}
}
