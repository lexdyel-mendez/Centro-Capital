import React, {Component} from 'react';
import {useState} from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

// Dummy data
const data = [
  // Daily data
  { name: '01', uv: 4000, pv: 2400, amt: 2400, period: 'daily' },
  { name: '02', uv: 3000, pv: 1398, amt: 2210, period: 'daily' },
//   // Weekly data
//   { name: 'Week 1', uv: 8000, pv: 4800, amt: 4800, period: 'weekly' },
//   { name: 'Week 2', uv: 6000, pv: 2796, amt: 4420, period: 'weekly' },
//   // Monthly data
//   { name: 'Jan', uv: 24000, pv: 14400, amt: 14400, period: 'monthly' },
//   { name: 'Feb', uv: 18000, pv: 8396, amt: 13260, period: 'monthly' },
//   // Quarterly data
//   { name: 'Q1', uv: 72000, pv: 43200, amt: 43200, period: 'quarterly' },
//   // Yearly data
//   { name: '2022', uv: 288000, pv: 172800, amt: 172800, period: 'yearly' },
];

// function filterData(period) {
//   return allData.filter((data) => data.period === period);
// }
//const [data, setData] = useState(filterData('daily'));

class CustomBar extends Component {
    
    render() {
        return(
            <div>
      <div>
      </div>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
        {/* <Line dataKey="pv" fill="#8884d8" />
        <Line dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </div>
        );
    }
   
};
export default CustomBar