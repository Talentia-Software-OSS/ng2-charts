# @talentia/ng2-charts

Reactive, responsive, beautiful charts for Angular based on Chart.js

- - -

### Installation

1. You can install ***@talentia/ng2-charts*** using npm

  ```bash
  npm install @talentia/ng2-charts@2.4.11 --save
  ```

2. You need to install and include `Chart.js` v2.9.4 in your application (it is a peer dependency of this library) (more info can be found in the official `chart.js` [documentation](http://www.chartjs.org/docs/#getting-started))

  ```bash
  npm install chart.js@2.9.4 --save
  ```

## API

### Import
```typescript
import { ChartsModule } from '@talentia/ng2-charts';

// In your App's module:
imports: [
   ChartsModule
]
```

### Chart types
There is one directive for all chart types: `baseChart`, and there are 8 types of charts: `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`, `bubble` and `scatter`.

### Properties

**Note**: For more information about possible options please refer to original [chart.js](http://www.chartjs.org/docs) documentation

- `data` (`SingleOrMultiDataSet`) -  set of points of the chart, it should be `MultiDataSet` only for `line`, `bar`, `radar` and `doughnut`, otherwise `SingleDataSet`
- `datasets` (`{ data: SingleDataSet, label: string }[]`) - `data` see about, the `label` for the dataset which appears in the legend and tooltips
- `labels` (`Label[]`) - x axis labels. It's necessary for charts: `line`, `bar` and `radar`. And just labels (on hover) for charts: `polarArea`, `pie` and `doughnut`. `Label` is either a single `string`, or it may be a `string[]` representing a multi-line label where each array element is on a new line.
- `chartType` (`ChartType`) - indicates the type of charts, it can be: `line`, `bar`, `radar`, `pie`, `polarArea`, `doughnut`
- `options` (`ChartOptions`) - chart options (as from [Chart.js documentation](http://www.chartjs.org/docs/))
- `colors` (`Color[]`) - data colors, will use default and|or random colors if not specified (see below)
- `legend`: (`boolean = false`) - if true show legend below the chart, otherwise not be shown

### Events

- `chartClick`: fires when click on a chart has occurred, returns information regarding active points and labels
- `chartHover`: fires when mousemove (hover) on a chart has occurred, returns information regarding active points and labels


### Colors

There are several sets of default colors. Colors can be replaced using the `colors` attribute. If there is more data than colors, colors are generated randomly.

### Dynamic Theming

The `ChartsModule` provides a service called `ThemeService` which allows clients to set a structure specifying colors override settings. This service may be called when the dynamic theme changes, with colors which fit the theme. The structure is interpreted as an override, with special functionality when dealing with arrays. Example:

```typescript
type Theme = 'light-theme' | 'dark-theme';

private _selectedTheme: Theme = 'light-theme';
public get selectedTheme() {
  return this._selectedTheme;
}
public set selectedTheme(value) {
  this._selectedTheme = value;
  let overrides: ChartOptions;
  if (this.selectedTheme === 'dark-theme') {
    overrides = {
      legend: {
        labels: { fontColor: 'white' }
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }],
        yAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }]
      }
    };
  } else {
    overrides = {};
  }
  this.themeService.setColorschemesOptions(overrides);
}

constructor(private themeService: ThemeService) { }

setCurrentTheme(theme: Theme) {
  this.selectedTheme = theme;
}
```

The `overrides` object has the same type as the chart options object `ChartOptions`, and wherever a simple field is encountered it replaces the matching field in the `options` object. When an array is encountered (as in the `xAxes` and `yAxes` fields above), the single object inside the array is used as a template to override all array elements in the matching field in the `options` object. So in the case above, every axis will have its ticks and gridline colors changed.

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/valor-software/ng2-charts/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.14.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Reference

This project is forked from [ng2-charts](https://github.com/valor-software/ng2-charts).

## License

ISC
