import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer} from 'recharts';

function CustomPie({data01, data02, dataKey01, dataKey02, nameKey01, nameKey02}){
    const curr =[
        {
            "year": "2022",
            "month": "JULY",
            "Unemployed, Total": 108.1,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "AUGUST",
            "Unemployed, Total": 108.6,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "SEPTEMBER",
            "Unemployed, Total": 94.6,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "OCTOBER",
            "Unemployed, Total": 84.9,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "NOVEMBER",
            "Unemployed, Total": 88.1,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "DECEMBER",
            "Unemployed, Total": 82.4,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "JANUARY",
            "Unemployed, Total": 77.5,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "FEBRUARY",
            "Unemployed, Total": 73.3,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "MARCH",
            "Unemployed, Total": 70.1,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "APRIL",
            "Unemployed, Total": 69.9,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "MAY",
            "Unemployed, Total": 69.5,
            "metric": "Unemployed, Total"
        },
        {
            "year": "2022",
            "month": "JUNE",
            "Unemployed, Total": 68,
            "metric": "Unemployed, Total"
        }
    ]
    return(
        <ResponsiveContainer height={300}>
        <PieChart width={730} height={250}>
        <Tooltip/>
        <Pie data={curr} dataKey={"Unemployed, Total"} nameKey={"metric"} cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label/>
        {/* <Pie data={data02} dataKey={dataKey02} nameKey={nameKey02} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
        </PieChart>
        </ResponsiveContainer>
    );
}
export default CustomPie

