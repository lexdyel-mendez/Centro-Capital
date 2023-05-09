import React, { useEffect, useState } from "react";
import { CSpinner, CCard, CCardTitle, CCardLink, CRow, CCol, CCardBody, CCardFooter } from '@coreui/react';
import CustomCompareLine from '../components/CustomCompareLine'
import { Container, Row, Col } from "react-bootstrap";
import DoubleDropdown from "../components/DoubleDropdown";
import CustomArea from '../components/CustomArea';

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
    // console.log(metric1)
  };

  const handleMetric2Change = (event) => {
    setMetric2(event.target.value);
  };

  if (!data) {
    return (
    <div>
    <div name="Description">
    <h1>Metric Comparison</h1>
    <Container></Container>
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
    // console.log(data)
    return (

      <div >
      <Container >
        <div name="Description" >
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
        <CCard style={{height: '100%'}}>
        <CustomArea data={data} data2={data} year={data[0]['year']} firstMetric={metric1} secondMetric={metric2}></CustomArea>
            <CCardFooter>
                <CRow>
                    <CCol xs="6">
                    <p className="text-left text-secondary">Source: Banco de Desarrollo Económico de Puerto RIco</p>
                    </CCol>
                    <CCol xs="6">
                    <CCardLink className="text-right text-info" href="/insights">Additional insights {'>'}</CCardLink>
                    </CCol>
                </CRow>
                </CCardFooter>
        </CCard>
      </Container>
      </div>
    )
  }
};

export default Compare;