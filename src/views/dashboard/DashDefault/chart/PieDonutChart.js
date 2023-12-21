import React from 'react';
import NVD3Chart from 'react-nvd3';


const datum = [
    { key: 'One', y: 29, color: '#ff8a65' },
    { key: 'Two', y: 0, color: '#f4c22b' },
    { key: 'Three', y: 32, color: '#04a9f5' },
    { key: 'Four', y: 196, color: '#3ebfea' },
    { key: 'Five', y: 2, color: '#4F5467' },
    { key: 'Six', y: 98, color: '#1de9b6' },
    { key: 'Seven', y: 13, color: '#a389d4' },
    { key: 'Eight', y: 5, color: '#FE8A7D' }
];
const datum2 = [
    {
        feed_name: "Cert UNLP",
        event_count: 1,
        color: '#ff8a65'
    },
    {
        feed_name: "Shadowserver",
        event_count: 2,
        color: '#f4c22b'
    },
    {
        feed_name: "External report",
        event_count: 3,
        color: '#f4c22b'
    },
    {
        feed_name: "SpamPot",
        event_count: 4,
        color: '#f4c22b'
    },
    {
        feed_name: "SpamHaus",
        event_count: 5,
        color: '#f4c22b'
    },
    {
        feed_name: "Bro",
        event_count: 6,
        color: '#f4c22b'
    },
    {
        feed_name: "Undefined",
        event_count: 7,
        color: '#f4c22b'
    },
    {
        feed_name: "Shodan",
        event_count: 8,
        color: '#f4c22b'
    },
    {
        feed_name: "RPZ",
        event_count: 9,
        color: '#f4c22b'
    },
    {
        feed_name: "Have I Been Pwned",
        event_count: 10,
        color: '#f4c22b'
    },
    {
        feed_name: "Team Cymru",
        event_count: 11,
        color: '#f4c22b'
    },
    {
        feed_name: "SpamCop",
        event_count: 12,
        color: '#f4c22b'
    },
    {
        feed_name: "Censys",
        event_count: 13,
        color: '#f4c22b'
    },
    {
        feed_name: "UNLP User",
        event_count: 14,
        color: '#f4c22b'
    },
    {
        feed_name: "Americas",
        event_count: 15,
        color: '#f4c22b'
    },
    {
        feed_name: "Dorkbot",
        event_count: 16,
        color: '#f4c22b'
    },
    {
        feed_name: "Netflow",
        event_count: 17,
        color: '#f4c22b'
    }
]

const PieDonutChart = ({dashboardFeed}) => {

    return (
        <React.Fragment>
            { 
            <NVD3Chart id="chart" height={600} type="pieChart" datum={datum2} x="feed_name" y="event_count" donut labelType="percent" />
            }
        </React.Fragment>
        )
};


export default PieDonutChart;