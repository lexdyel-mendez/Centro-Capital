import React, { useEffect, useState } from "react";
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import CustomCompareLine from '../components/CustomCompareLine'
import { Container, Row, Col, Dropdown } from "react-bootstrap";


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
  const [metric1, setMetric1] = useState("");
  const [metric2, setMetric2] = useState("");

  useEffect(() => {
    async function fetchData(metric1, metric2) {
      if (metric1 && metric2) { // check if both metrics have been selected
        try {
          console.log('The metrics are', metric1, metric2)
          const response = await fetch(`/centro-capital/compare/stats/${metric1}/${metric2}`, { method: "GET" });
          if (response.status === 200) {
            const doc = await response.json();
            setData(organizeCompare(doc));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData(metric1, metric2)
  }, [metric1, metric2]);


  if (!metric1 || !metric2) { // check if both metrics have been selected
    return (
      <div>
        <p>Please select two metrics</p>
      </div>
    )
  } else if (!data) {
    return (
      <div>
        <p>Loading data...</p>
      </div>
    )
  } else {
    return (
      <Container>
        <Row className="m-4">
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-metric1">
                {metric1 ? metric1 : "Select Metric 1"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onSelect={() => setMetric1("metric1")}>Metric 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => setMetric1("metric2")}>Metric 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => setMetric1("metric3")}>Metric 3</Dropdown.Item>
                {/* Add additional options for more metrics */}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-metric2">
                {metric2 ? metric2 : "Select Metric 2"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onSelect={() => setMetric2("metric1")}>Metric 1</Dropdown.Item>
                <Dropdown.Item onSelect={() => setMetric2("metric2")}>Metric 2</Dropdown.Item>
                <Dropdown.Item onSelect={() => setMetric2("metric3")}>Metric 3</Dropdown.Item>
                {/* Add additional options for more metrics */}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="m-4">
          <Col>
            <CustomCompareLine
              data={data}
              year={data[data.length-1]['year']}
              firstMetric={metric1}
              secondMetric={metric2}
            />
          </Col>
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
