import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomCompareLine from '../components/CustomCompareLine'


function organizeCompare(inputData) {
  //FIRST VALUE START
  if (inputData) {

    const finalValArr=[]

    const firstMetricObj = inputData['Metric_1']
    const firstMetric = Object.keys(firstMetricObj)[0]
    const firstMetricYears = firstMetricObj[firstMetric]
    const secondMetricObj = inputData['Metric2']
    const secondMetric = Object.keys(secondMetricObj)[0]
    const secondMetricYears = secondMetricObj[secondMetric]


    const monthArr = ["JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE"]

    for (let i = 0; i < firstMetricYears.length; i++) {
      for (const month of monthArr) {
        const runningVals = new Object()
        runningVals['year'] = firstMetricYears[i][0]
        runningVals['month'] = month
        runningVals['firstMetric'] = firstMetric
        runningVals['secondMetric'] = secondMetric
        runningVals[firstMetric] = firstMetricYears[i][1][month]
        runningVals[secondMetric] = secondMetricYears[i][1][month]
        finalValArr.push(runningVals)
      }
    }
    return finalValArr
  } else {
    return
  }
}

const Compare = () => {

  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/centro-capital/compare/stats/emplmnt/unmplmnt", { method: "GET" });
        if (response.status === 200) {
          const doc = await response.json();
          setData(organizeCompare(doc));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, []);


  if (!data) {

    return (
      <div>
        <p>no data so far</p>
      </div>
    )

  } else {
    return (
        <Container>
         <Row className="m-4">
          {/* <Col className="bg-primary m-4 rounded"> Bar Chart<CustomBar data={dailydata}></CustomBar></Col> */}
          {/* <Col className="bg-secondary m-4 rounded"><CustomLine data={data} year='2014' }></CustomLine></Col> */}
          <Col><CustomCompareLine data={data} year={data[data.length-1]['year']} firstMetric={data[0]['firstMetric']} secondMetric={data[0]['secondMetric']}></CustomCompareLine></Col>
        </Row>
      </Container>
    )
  }

};

export default Compare;

//Comment below helps filter compare

// function filterData(period) {
//   return allData.filter((data) => data.period === period);
// }

// const Home = () => {

//   const [data, setData] = useState(filterData('daily'));

//   return (
//     <div>
//       <h1>Time Period Bar Chart using Recharts</h1>
//       <div>
//         <button onClick={() => setData(filterData('daily'))}>Daily</button>
//         <button onClick={() => setData(filterData('weekly'))}>Weekly</button>
//         <button onClick={() => setData(filterData('monthly'))}>Monthly</button>
//         <button onClick={() => setData(filterData('quarterly'))}>Quarterly</button>
//         <button onClick={() => setData(filterData('yearly'))}>Yearly</button>
//       </div>
//       <BarChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="pv" fill="#8884d8" />
//         <Bar dataKey="uv" fill="#82ca9d" />
//         {/* <Line dataKey="pv" fill="#8884d8" />
//         <Line dataKey="uv" fill="#82ca9d" /> */}
//       </BarChart>
//     </div>
//   );
// };
