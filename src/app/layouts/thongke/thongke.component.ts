import {Component, OnInit} from '@angular/core';
import {Chart, ChartConfiguration} from "chart.js";
import {ReportService} from "../../service/report.service";
import {SalesReport} from "../../@core/models/salesReport";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class ThongkeComponent implements OnInit {
  dthomnay: any;//chưá dt hôm nay và sld hôm nay
  loai: any;//loại thời gian
  tongdoanhthu: number = 0;
  salesReport: SalesReport = {};//salesReportdto
  start?: any;
  end?: any;
  report: any;//list năm và doanh thu
  chartdata: any;
  ngay: any[] = []
  nam: any[] = [];
  doanhthu: any[] = [];
  colordata: any[] = [];
  ngayhientai: any = new Date();
  sldx01: any;
  sld0: any;
  sld1: any;

  ngOnInit(): void {
    this.tatca()
    this.homnay();
    this.sld01();
  }

  constructor(private service: ReportService) {

  }

  tatca() {
    this.service.gettat().subscribe(result => {
      this.report = result;
      this.tongdoanhthu = 0;
      if (this.report != null) {
        for (let item of this.report) {
          this.nam.push(item.nam);
          this.doanhthu.push(item.revenue)
          this.tongdoanhthu += item.revenue;
        }
        let chartStatus = Chart.getChart("barchart"); // <canvas> id
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }
        this.RenderChart(this.nam, this.doanhthu, this.colordata, 'bar', 'barchart');

      }
    });

  }

  theoday() {

    this.salesReport.end = this.end;
    this.salesReport.start = this.start;
    this.doanhthu = [];
    this.ngay = [];
    this.tongdoanhthu = 0;
    this.service.gettheoday(this.salesReport).subscribe(result => {
      this.report = result;
      if (this.report != null) {
        for (let item of this.report) {
          this.doanhthu.push(item.revenue)
          this.ngay.push(item.ngay);
          this.tongdoanhthu += item.revenue;
        }
        console.log(this.report)
        let chartStatus = Chart.getChart("barchart"); // <canvas> id
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }
        this.RenderChart(this.ngay, this.doanhthu, this.colordata, 'bar', 'barchart');
      }
    });


  }

  theothang() {
    this.end += '-31';
    this.start += '-01';
    this.salesReport.end = this.end;
    this.salesReport.start = this.start;
    this.doanhthu = [];
    this.tongdoanhthu = 0;
    this.nam = [];
    console.log(this.salesReport)
    this.service.gettheothang(this.salesReport).subscribe(result => {
      this.report = result;
      if (this.report != null) {
        for (let item of this.report) {
          this.doanhthu.push(item.revenue)
          this.nam.push(item.nam);
          this.tongdoanhthu += item.revenue;
        }
        console.log(this.report)
        let chartStatus = Chart.getChart("barchart"); // <canvas> id
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }
        this.RenderChart(this.nam, this.doanhthu, this.colordata, 'bar', 'barchart');
      }
    });


  }

//doanh thu và sld bán đc hôm nay
  homnay() {
    this.service.doanhthutheongay().subscribe(result => {
      this.dthomnay = result;
    })
  }

  //số lượng đơn trạng thái 0 và 1
  sld01() {
    this.service.sld01().subscribe(result => {
      this.sldx01 = result;
this.sld0=this.sldx01[0];
this.sld1=this.sldx01[1];

    })
  }

//loại thời gian
  loaithoigian(loai: any) {
    this.loai = loai;
  }

//cái này sinh ra biểu đồ
  RenderChart(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Doanh thu VND',
          data: maindata,
          backgroundColor: [
            'rgba(2, 99, 132, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


  }


}
