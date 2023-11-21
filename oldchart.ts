let root = am5.Root.new('chartdiv');

    // Create a stock chart
    // https://www.amcharts.com/docs/v5/charts/stock-chart/#Instantiating_the_chart
    let stockChart = root.container.children.push(
      am5stock.StockChart.new(root, {
        
      })
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
        valueXField: 'Date',
        valueYField: 'Close',
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText: '{valueY}',
      })
    );

    valueSeries.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true
    });
    valueSeries.data.setAll(this.chartData);
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
        valueXField: 'Date',
        valueYField: 'Volume',
        xAxis: volumeDateAxis,
        yAxis: volumeValueAxis,
        legendValueText: '{valueY}',
        // tooltip: am5.Tooltip.new(root, {
        //   pointerOrientation: "horizontal",
        //   labelText: "{valueY}"
        // })
      })
    );

    volumeSeries.data.setAll(this.chartData);

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