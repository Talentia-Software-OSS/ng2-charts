import { NgModule } from '@angular/core';
import { BaseChartDirective } from './base-chart.directive';

@NgModule({
  declarations: [
    BaseChartDirective
  ],
  exports: [
    BaseChartDirective
  ]
})
export class ChartsModule { }
