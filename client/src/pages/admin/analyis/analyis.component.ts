import { Component } from '@angular/core';
import { NavbarComponent } from '../../website/navbar/navbar.component';
import { AnalysisService } from '../../../services/analysis/analysis.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts'

@Component({
  selector: 'app-analyis',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,BaseChartDirective],
  templateUrl: './analyis.component.html',
  styleUrl: './analyis.component.css'
})
export class AnalyisComponent {
  dates: any = {
    startDate : '',
    endDate : '',
  }

  constructor(private analysisSrv: AnalysisService) { }
  lineChartData: any[] = [
  ];

  lineChartLabels: any[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  

  onAnalyse() {
    this.analysisSrv.getAnalysis(this.dates).subscribe((res: any)=>{
      console.log(res);
      this.lineChartData= [
        { data: res.data, label: 'Orders per day' },
      ];
    
      this.lineChartLabels= res.labels;
    
    })
  }
}
