import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BaseChartDirective, ChartsModule, monkeyPatchChartJsLegend,monkeyPatchChartJsTooltip } from '@talentia/ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AppRoutingModule } from './app/app-routing.module';
import { importProvidersFrom, provideAppInitializer } from '@angular/core';
import { AppComponent } from './app/app.component';

const initializeAppFn = () => {
    BaseChartDirective.unregisterPlugin(ChartDataLabels);
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
};


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ChartsModule),
        provideAnimations(),
        provideAppInitializer(initializeAppFn)
    ]
})
  .catch(err => console.error(err));
