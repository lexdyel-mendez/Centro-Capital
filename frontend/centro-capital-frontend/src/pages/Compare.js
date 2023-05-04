import React, { useEffect, useState } from "react";
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import CustomCompareLine from '../components/CustomCompareLine'
import { Container, Row, Col } from "react-bootstrap";
import DoubleDropdown from "../components/DoubleDropdown";

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
  const [metric1, setMetric1] = useState();
  const [metric2, setMetric2] = useState();

  useEffect(() => {
    async function fetchData(metric1, metric2) {
      if (metric1 && metric2) { // check if both metrics have been selected
        try {
//          console.log('The metrics are', metric1, metric2)
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

    const handleMetric1Change = (event) => {
    setMetric1(event.target.value);
    console.log(metric1)
  };

  const handleMetric2Change = (event) => {
    setMetric2(event.target.value);
  };

  if (!data) {
    return (
    <div>
    <div name="Description">
    <h1>Metric Comparison</h1>
    <p>
       In the following page the user can compare between any two metrics that are in the database.
       It is recommended that the metrics being compared belong to the same category (Total or Rate).
       The Rates are percentage values, thus they fall between 0 and 1. As for the Total, their values can
       range any real valued number.
    </p>
    </div>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '16px' }}>
            <label>
              Metric 1:
              <select value={metric1} onChange={handleMetric1Change}>
            <option value="" disabled selected>
              Select metric 1
            </option>
            <optgroup label="Rates">
              <option value="emplmnt">Employment Rate</option>
              <option value="unmplmnt">Unemployment Rate</option>
            </optgroup>
            <optgroup label="Totals">
              <option value="civpop">Civilian Population Total</option>
              <option value="emplmntTot">Employment Total</option>
              <option value="laborForce">Labor Force Total</option>
              <option value="unempldTotal">Unemployment Total</option>
            </optgroup>
          </select>

            </label>
          </div>
          <div>
            <label>
              Metric 2:
              <select value={metric2} onChange={handleMetric2Change}>
            <option value="" disabled selected>
              Select metric 2
            </option>
            <optgroup label="Rates">
              <option value="emplmnt">Employment Rate</option>
              <option value="unmplmnt">Unemployment Rate</option>
            </optgroup>
            <optgroup label="Totals">
              <option value="civpop">Civilian Population Total</option>
              <option value="emplmntTot">Employment Total</option>
              <option value="laborForce">Labor Force Total</option>
              <option value="unempldTotal">Unemployment Total</option>
            </optgroup>
          </select>

            </label>
          </div>
        </div>
        <p>Awaiting for user selection</p>
      </div>
      </div>
    )
  } else {
    return (
      <Container>
        <div name="Description">
    <h1>Metric Comparison</h1>
    <p>
       In the following page the user can compare between any two metrics that are in the database.
       It is recommended that the metrics being compared belong to the same category (Total or Rate).
       The Rates are percentage values, thus they fall between 0 and 100. As for the Total, their values can
       range any real valued number.
    </p>
    </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '16px' }}>
            <label>
              Metric 1:
              <select value={metric1} onChange={handleMetric1Change}>
            <optgroup label="Rates">
              <option value="emplmnt">Employment Rate</option>
              <option value="unmplmnt">Unemployment Rate</option>
            </optgroup>
            <optgroup label="Totals">
              <option value="civpop">Civilian Population Total</option>
              <option value="emplmntTot">Employment Total</option>
              <option value="laborForce">Labor Force Total</option>
              <option value="unempldTotal">Unemployment Total</option>
            </optgroup>
          </select>
            </label>
          </div>
          <div>
            <label>
              Metric 2:
              <select value={metric2} onChange={handleMetric2Change}>

            <optgroup label="Rates">
              <option value="emplmnt">Employment Rate</option>
              <option value="unmplmnt">Unemployment Rate</option>
            </optgroup>
            <optgroup label="Totals">
              <option value="civpop">Civilian Population Total</option>
              <option value="emplmntTot">Employment Total</option>
              <option value="laborForce">Labor Force Total</option>
              <option value="unempldTotal">Unemployment Total</option>
            </optgroup>
          </select>
            </label>
          </div>
        </div>

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
