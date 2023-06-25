import React, { useEffect } from 'react';
import 'amcharts3/amcharts/amcharts';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import AmCharts from '@amcharts/amcharts3-react';

const AmChartStatistics6 = (props) => {
    useEffect(() => {
        AmCharts.makeChart('bar-chart2', {
            type: 'serial',
            theme: 'light',
            marginTop: 10,
            marginRight: 0,
            valueAxes: [
                {
                    id: 'v1',
                    position: 'left',
                    axisAlpha: 0,
                    lineAlpha: 0,
                    autoGridCount: false,
                    labelFunction: function (value) {
                        return +Math.round(value) + '00';
                    }
                }
            ],
            graphs: [
                {
                    id: 'g1',
                    valueAxis: 'v1',
                    lineColor: ['#1de9b6', '#1dc4e9'],
                    fillColors: ['#1de9b6', '#1dc4e9'],
                    fillAlphas: 1,
                    type: 'column',
                    title: 'SALES',
                    valueField: 'sales',
                    columnWidth: 0.3,
                    legendValueText: '$[[value]]M',
                    balloonText: "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
                },
                {
                    id: 'g2',
                    valueAxis: 'v1',
                    lineColor: ['#a389d4', '#899ed4'],
                    fillColors: ['#a389d4', '#899ed4'],
                    fillAlphas: 1,
                    type: 'column',
                    title: 'VISITS ',
                    valueField: 'visits',
                    columnWidth: 0.3,
                    legendValueText: '$[[value]]M',
                    balloonText: "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
                },
                {
                    id: 'g3',
                    valueAxis: 'v1',
                    lineColor: ['#04a9f5', '#049df5'],
                    fillColors: ['#04a9f5', '#049df5'],
                    fillAlphas: 1,
                    type: 'column',
                    title: 'CLICKS',
                    valueField: 'clicks',
                    columnWidth: 0.3,
                    legendValueText: '$[[value]]M',
                    balloonText: "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
                }
            ],
            chartCursor: {
                pan: true,
                valueLineEnabled: true,
                valueLineBalloonEnabled: true,
                cursorAlpha: 0,
                valueLineAlpha: 0.2
            },
            categoryField: 'Year',
            categoryAxis: {
                dashLength: 1,
                gridAlpha: 0,
                axisAlpha: 0,
                lineAlpha: 0,
                minorGridEnabled: true
            },
            legend: {
                useGraphSettings: true,
                position: 'top'
            },
            balloon: {
                borderThickness: 1,
                shadowAlpha: 0
            },
            dataProvider: [
                {
                    Year: '2014',
                    sales: 2,
                    visits: 4,
                    clicks: 3
                },
                {
                    Year: '2015',
                    sales: 4,
                    visits: 7,
                    clicks: 5
                },
                {
                    Year: '2016',
                    sales: 2,
                    visits: 3,
                    clicks: 4
                },
                {
                    Year: '2017',
                    sales: 4.5,
                    visits: 6,
                    clicks: 4
                }
            ]
        });
    });

    return <div id="bar-chart2" className="bar-chart2" style={{ width: '100%', height: props.height }} />;
};

export default AmChartStatistics6;
