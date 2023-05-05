import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { metric: 'Unemployment', value: 200.2 },
  { metric: 'Employment', value: 189.0 }
];



function CustomPie(inputData){
    const COLORS = ['#006400', '#3CB371', '#90EE90'];

    const renderLabel = ({ metric, value }) => {
      return `${metric}: ${value}`;
    };


    console.log(inputData['data'])

  return (
    <ResponsiveContainer height={300}>
    <PieChart>
      <Pie
        data={inputData['data']}
        dataKey="value"
        nameKey="metric"
        cx="50%"
        cy="50%"
        outerRadius={60}
        fill="#8884d8"

      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </ResponsiveContainer>
  );
};



// function CustomPie({data01, data02, dataKey01, dataKey02, nameKey01, nameKey02}){
//     const curr =[
//         {
//             "year": "2022",
//             "month": "JULY",
//             "Unemployed, Total": 108.1,
//             "Employed, Total" : 100.1,
//             "metric": "Unemployed, Total"
//         },
//         {
//             "year": "2022",
//             "month": "AUGUST",
//             "Unemployed, Total": 108.6,
//             "Employed, Total" : 200.1,
//             "metric": "Unemployed, Total"
//         }
//     ]
    
//     return(
//         <ResponsiveContainer height={300}>
//         <PieChart width={730} height={250}>
//         <Tooltip/>
//         <Pie data={curr} dataKey={"Unemployed, Total"} nameKey={"metric"} cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label/>
//         <Pie data={curr} dataKey={"Employed, Total"} nameKey={"metric"} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
//         {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//         </PieChart>
//         </ResponsiveContainer>
//     );
// }
export default CustomPie

