package org.machinelearning.swissknife.lib.csv;

import org.junit.jupiter.api.Test;
import org.machinelearning.swissknife.model.timeseries.TimeSeries;
import org.machinelearning.swissknife.model.timeseries.TimeSeriesRow;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.*;
import static org.machinelearning.swissknife.lib.csv.CsvToTimeSeries.toTimeSeries;

class CsvToTimeSeriesTest {

    @Test
    public void should_be_able_to_build_time_series_from_csv() throws IOException, CsvParsingException {
        ClassLoader classLoader = getClass().getClassLoader();
        String csvLocation = Objects.requireNonNull(classLoader.getResource("time_series_passengers.csv")).getFile();

        TimeSeries actualTimeSeries = toTimeSeries(csvLocation, "Date", "Passengers", "%Y-%m");

        TimeSeries expectedTimeSeries = buildTimeSeriesPassengers();
        assertEquals(expectedTimeSeries, actualTimeSeries);
    }

    @Test
    public void should_throw_exception_if_header_does_not_contain_value_column_name() {
        ClassLoader classLoader = getClass().getClassLoader();
        String csvLocation = Objects.requireNonNull(classLoader.getResource("time_series_passengers.csv")).getFile();

        try {
            toTimeSeries(csvLocation, "Date", "PASSENGER", "%Y-%m");
            fail("Date Column Name does not exit");
        } catch (CsvParsingException ignored) {
        }
    }


    @Test
    public void should_throw_exception_if_header_does_not_contain_date_column_name() {
        ClassLoader classLoader = getClass().getClassLoader();
        String csvLocation = Objects.requireNonNull(classLoader.getResource("time_series_passengers.csv")).getFile();

        try {
            toTimeSeries(csvLocation, "DAT", "Passengers", "%Y-%m");
            fail("Date Column Name does not exit");
        } catch (CsvParsingException ignored) {
        }
    }

    private static TimeSeries buildTimeSeriesPassengers() {
        TimeSeriesRow timeSeriesRow = buildTimeSeriesRow("1960-01", 1.0);
        TimeSeriesRow timeSeriesRow1 = buildTimeSeriesRow("1960-02", 2.0);
        TimeSeriesRow timeSeriesRow2 = buildTimeSeriesRow("1960-03", 3.0);
        TimeSeriesRow timeSeriesRow3 = buildTimeSeriesRow("1960-04", 4.0);
        TimeSeriesRow timeSeriesRow4 = buildTimeSeriesRow("1960-05", 5.0);
        List<TimeSeriesRow> timeSeriesRows = asList(timeSeriesRow, timeSeriesRow1, timeSeriesRow2, timeSeriesRow3, timeSeriesRow4);
        return new TimeSeries(timeSeriesRows, "Date", "Passengers", "%Y-%m");
    }

    private static TimeSeriesRow buildTimeSeriesRow(String date, Double value) {
        return new TimeSeriesRow(date, value);
    }
}