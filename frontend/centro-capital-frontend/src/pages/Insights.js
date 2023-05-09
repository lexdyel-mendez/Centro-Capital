import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { CRow } from '@coreui/react';
const Insights = () => {
  const [data, setData] = useState();
  const [metric, setMetric] = useState("");

  useEffect(() => {
  if (metric) {
    async function fetchData(metric) {
      try {
        const response = await fetch(`/centro-capital/${metric}/stats/`, {
          method: "GET",
        });
        if (response.status === 200) {
          const doc = await response.json();
          setData(doc);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData(metric);
  }
}, [metric]);

  const handleMetric1Change = (event) => {
    setMetric(event.target.value);
  };

  if (!data) {
    return (
    <div>
    <div name="Description">
    <h1>Metric Insights</h1>
    <p>
       In the following the user can analyse some calculated insights for
       a desired metric. Among these metrics are mean, standard deviation,
       max value and min value.
    </p>
    </div>

      <label>
      Metric 1:
      <select value={metric} onChange={handleMetric1Change}>
        <option value="" disabled selected>
          Select metric 1
        </option>
        <option value="unemployment">Unemployment Rate</option>
        <option value="employment">Employment Rate</option>
        <option value="unemploymentTotal">Unemployment Total</option>
        <option value="laborforce">Labor Force</option>
        <option value="civpop">Civilian Population</option>
        <option value="employmentTotal">Employment Total</option>
      </select>
    </label>
    </div>
    );
  } else {
  console.log(Object.keys(data)[0])
    const key = Object.keys(data)[0];
    const stats = data[key];
    const { yearly_mean, yearly_std, yearly_max, yearly_min } = stats;

    const meanRows = Object.entries(yearly_mean).map(([year, mean]) => (
      <tr key={year}>
        <td>{year}</td>
        <td>{mean.toFixed(2)}</td>
      </tr>
    ));

    const stdRows = Object.entries(yearly_std).map(([year, std]) => (
      <tr key={year}>
        <td>{year}</td>
        <td>{std.toFixed(2)}</td>
      </tr>
    ));

    const maxRows = Object.entries(yearly_max).map(([year, max]) => {
      const month = Object.keys(max)[0];
      return (
        <tr key={year}>
          <td>{year}</td>
          <td>{month}</td>
          <td>{max[month].toFixed(2)}</td>
        </tr>
      );
    });

    const minRows = Object.entries(yearly_min).map(([year, min]) => {
      const month = Object.keys(min)[0];
      return (
        <tr key={year}>
          <td>{year}</td>
          <td>{month}</td>
          <td>{min[month].toFixed(2)}</td>
        </tr>
      );
    });

   return (
  <div style={{background: 'linear-gradient(to bottom, #f8f9fa, #85a78c)' }} >
    <div name="Description"  >
      <h1>Metric Insights</h1>
      <p>
        In the following the user can analyse some calculated insights for
        a desired metric. Among these metrics are mean, standard deviation,
        max value and min value.
      </p>
    </div>

    <label>
      Metric 1:
      <select value={metric} onChange={handleMetric1Change}>
        <option value="" disabled selected>
          Select metric 1
        </option>
        <option value="unemployment">Unemployment Rate</option>
        <option value="employment">Employment Rate</option>
        <option value="unemploymentTotal">Unemployment Total</option>
        <option value="laborforce">Labor Force</option>
        <option value="civpop">Civilian Population</option>
        <option value="employmentTotal">Employment Total</option>
      </select>
    </label>

    <div className="row">
      <div className="col-md-6">
        <div className="table-description">
          <h2>Yearly Mean {metric}</h2>
          <p>This table shows the yearly mean of {metric} values.</p>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Mean {metric}</th>
            </tr>
          </thead>
          <tbody>{meanRows}</tbody>
        </Table>
      </div>

      <div className="col-md-6">
        <div className="table-description">
          <h2>Yearly Standard Deviation {metric}</h2>
          <p>This table shows the yearly standard deviation of {metric} values.</p>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Standard Deviation {metric}</th>
            </tr>
          </thead>
          <tbody>{stdRows}</tbody>
        </Table>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <div className="table-description">
          <h2>Yearly Maximum {metric}</h2>
          <p>This table shows the yearly maximum {metric} values.</p>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>
              <th>Maximum {metric}</th>
            </tr>
          </thead>
          <tbody>{maxRows}</tbody>
        </Table>
      </div>

      <div className="col-md-6">
        <div className="table-description">
          <h2>Yearly Minimum {metric}</h2>
          <p>This table shows the yearly minimum {metric} values.</p>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>
              <th>Minimum {metric}</th>
            </tr>
          </thead>
          <tbody>{minRows}</tbody>
        </Table>
      </div>
    </div>
    <CRow className='m-4'></CRow>
    <CRow className='m-4'></CRow>
  </div>
);

}
};

export default Insights;
