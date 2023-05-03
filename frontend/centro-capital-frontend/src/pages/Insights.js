import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Insights = () => {
  const [data, setData] = useState();
  const [metric, setMetric] = useState("");

  useEffect(() => {
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
  }, [metric]);

  const handleMetric1Change = (event) => {
    setMetric(event.target.value);
  };

  if (!data) {
    return (
        <label>
              Metric 1:
              <select value={metric} onChange={handleMetric1Change}>
              <option value="" disabled selected>
                Select metric 1
              </option>
               <option value="unemployment">Unemployment Rate</option>
               <option value="employment">Employment Rate</option>
              <option value="unemploymentTotal">Unemployment Total</option>

            </select>
            </label>
    );
  } else {
    const key = Object.keys(data)[0];
    const stats = data[key];
    const { yearly_mean, yearly_std, yearly_max, yearly_min } = stats;

    const meanRows = Object.entries(yearly_mean).map(([year, mean]) => (
      <tr key={year}>
        <td>{year}</td>
        <td>{mean}</td>
      </tr>
    ));

    const stdRows = Object.entries(yearly_std).map(([year, std]) => (
      <tr key={year}>
        <td>{year}</td>
        <td>{std}</td>
      </tr>
    ));

    const maxRows = Object.entries(yearly_max).map(([year, max]) => {
      const month = Object.keys(max)[0];
      return (
        <tr key={year}>
          <td>{year}</td>
          <td>{month}</td>
          <td>{max[month]}</td>
        </tr>
      );
    });

    const minRows = Object.entries(yearly_min).map(([year, min]) => {
      const month = Object.keys(min)[0];
      return (
        <tr key={year}>
          <td>{year}</td>
          <td>{month}</td>
          <td>{min[month]}</td>
        </tr>
      );
    });

   return (
  <div>
    <label>
      Metric 1:
      <select value={metric} onChange={handleMetric1Change}>
        <option value="" disabled selected>
          Select metric 1
        </option>
        <option value="unemployment">Unemployment Rate</option>
        <option value="employment">Employment Rate</option>
        <option value="unemploymentTotal">Unemployment Total</option>
      </select>
    </label>

    <div className="row">
      <div className="col">
        <h1>Yearly Mean {metric}</h1>
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

      <div className="col">
        <h1>Yearly Standard Deviation {metric}</h1>
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
      <div className="col">
        <h1>Yearly Maximum {metric}</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Maximum {metric}</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody>{maxRows}</tbody>
        </Table>
      </div>

      <div className="col">
        <h1>Yearly Minimum {metric}</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Minimum {metric}</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody>{minRows}</tbody>
        </Table>
      </div>
    </div>
  </div>
);

  }
};

export default Insights;
