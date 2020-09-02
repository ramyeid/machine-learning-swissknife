package org.machinelearning.swissknife.ui.components.timeseries;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.data.time.Day;
import org.jfree.data.time.TimeSeries;
import org.jfree.data.time.TimeSeriesCollection;
import org.machinelearning.swissknife.model.timeseries.TimeSeriesRow;

import javax.swing.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import static org.machinelearning.swissknife.ui.components.utils.ErrorPopup.tryPopup;

public class TimeSeriesPlotPanel extends JPanel {

    public TimeSeriesPlotPanel(org.machinelearning.swissknife.model.timeseries.TimeSeries initialTimeSeries,
                               org.machinelearning.swissknife.model.timeseries.TimeSeries timeSeriesWithNewValues,
                               String action) {

        TimeSeries initialValues = toTimeSeries(initialTimeSeries, "initial");
        TimeSeries initialAndComputedValues = toTimeSeries(timeSeriesWithNewValues, action);
        TimeSeriesCollection timeSeriesCollection = new TimeSeriesCollection();
        timeSeriesCollection.addSeries(initialValues);
        timeSeriesCollection.addSeries(initialAndComputedValues);

        JFreeChart timeSeriesChart = ChartFactory.createTimeSeriesChart(
                String.format("time-series-%s", action),
                initialTimeSeries.getDateColumnName(),
                initialTimeSeries.getValueColumnName(),
                timeSeriesCollection,
                true,
                true,
                false);

        ChartPanel chartPanel = new ChartPanel(timeSeriesChart);
        chartPanel.setPreferredSize(new java.awt.Dimension(600, 400));

        chartPanel.setMouseWheelEnabled(true);
        chartPanel.setHorizontalAxisTrace(true);
        chartPanel.setVerticalAxisTrace(true);

        this.add(chartPanel, 0);
    }

    private static TimeSeries toTimeSeries(org.machinelearning.swissknife.model.timeseries.TimeSeries initialTimeSeries,
                                           String timeSeriesTitle) {
        SimpleDateFormat dateFormatter = new SimpleDateFormat(initialTimeSeries.getDateFormat());

        TimeSeries series = new TimeSeries(timeSeriesTitle);
        for (TimeSeriesRow row : initialTimeSeries.getRows()) {
            Day period = tryPopup(() -> new Day(dateFormatter.parse(row.getDate())), String.format("Could not format %s with formatter %s", row.getDate(), initialTimeSeries.getDateFormat()));
            series.add(period, row.getValue());
        }
        return series;
    }
}