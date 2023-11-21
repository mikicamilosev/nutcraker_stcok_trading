import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5stock from '@amcharts/amcharts5/stock';
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { getMarketData } from 'src/app/reducers/market/market.selector';

@Component({
  selector: 'app-stockchart',
  templateUrl: './stockchart.component.html',
  styleUrls: ['./stockchart.component.css'],
})
export class StockchartComponent {
  chartData: any; // for test
  chartData1: any;
  pesk: any;
  constructor(
    private store: Store,
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp
  ) {
    this.chartData1 = [];
  }

  ngOnInit() {
    this.store.select(getMarketData).subscribe((res) => {
      this.getChartData()
    });
  }

  getChartData () {
    var pesk: any = this.lss.get('siPesk');
    this.apiService.chartDataBasic(pesk, '200').subscribe((res: any) => {
      this.chartData1 = res;
      this.createChart(this.chartData1)
    });
  }

  createChart(data: any) {
    let root = am5.Root.new('chartdiv');

    // Create a stock chart
    // https://www.amcharts.com/docs/v5/charts/stock-chart/#Instantiating_the_chart
    let stockChart = root.container.children.push(
      am5stock.StockChart.new(root, {})
    );

    /**
     * Main (value) panel
     */

    // Create a main stock panel (chart)
    // https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding_panels
    let mainPanel = stockChart.panels.push(
      am5stock.StockPanel.new(root, {
        wheelY: 'zoomX',
        panX: true,
        panY: true,
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let dateAxis = mainPanel.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let valueSeries = mainPanel.series.push(
      am5xy.LineSeries.new(root, {
        name: 'STCK',
        valueXField: 'date',
        valueYField: 'closePrice',
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText: '{valueY}',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{valueY}',
        }),
      })
    );

    valueSeries.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
    });

    valueSeries.set('fill', am5.color(0x00ff00));
    valueSeries.set('stroke', am5.color(0x00ff00));
    valueSeries.data.processor = am5.DataProcessor.new(root, {
      numericFields: ["closePrice"],
      dateFields: ["date"]
    });
    valueSeries.data.setAll(data);
    valueSeries.children.unshift(
      am5.Label.new(root, {
        text: 'Value',
      })
    );
    /**
     * Secondary (volume) panel
     */

    // Create a main stock panel (chart)
    // https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding_panels
    let volumePanel = stockChart.panels.push(
      am5stock.StockPanel.new(root, {
        wheelY: 'zoomX',
        panX: true,
        panY: true,
        height: am5.percent(30),
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let volumeValueAxis = volumePanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: '#.#a',
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let volumeDateAxis = volumePanel.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: 'day',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let volumeSeries = volumePanel.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'STCK',
        valueXField: 'date',
        valueYField: 'volume',
        xAxis: volumeDateAxis,
        yAxis: volumeValueAxis,
        legendValueText: '{valueY}',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{valueY}',
        }),
      })
    );
    volumeSeries.set('stroke', am5.color(0xff0000));
    volumeSeries.set('fill', am5.color(0xff0000));
    volumeSeries.children.unshift(
      am5.Label.new(root, {
        text: 'Volumn',
      })
    );
    volumeSeries.data.processor = am5.DataProcessor.new(root, {
      numericFields: ["volume"],
      dateFields: ["date"]
    });
    volumeSeries.data.setAll(data);

    // Set main value series
    // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
    stockChart.set('volumeSeries', volumeSeries);

    // Add cursor(s)
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    mainPanel.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        snapToSeries: [valueSeries],
        snapToSeriesBy: 'y!',
      })
    );

    volumePanel.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        yAxis: volumeValueAxis,
        xAxis: volumeDateAxis,
        snapToSeries: [volumeSeries],
        snapToSeriesBy: 'y!',
      })
    );
  }
}
