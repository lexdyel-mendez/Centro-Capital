import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer} from 'recharts';

function CustomPie({data01, data02}){
    return(
        <ResponsiveContainer height={300}>
        <PieChart width={730} height={250}>
        <Tooltip/>
        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
        </PieChart>
        </ResponsiveContainer>
    );
}
export default CustomPie

