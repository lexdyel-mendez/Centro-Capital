import React, { useEffect, useState } from "react";


// let localdata = {
//   "2014": { "JULY": "14.7", "AUGUST": "14.9", "SEPTEMBER": "15.1", "OCTOBER": "14.7", "NOVEMBER": "14.1", "DECEMBER": "15.4", "JANUARY": "14.4", "FEBRUARY": "14.6", "MARCH": "14.2", "APRIL": "13.4", "MAY": "13.6", "JUNE": "12.8" },
//   "2015": { "JULY": "13.9", "AUGUST": "15.3", "SEPTEMBER": "15.1", "OCTOBER": "13.7", "NOVEMBER": "13.6", "DECEMBER": "12", "JANUARY": "10.8", "FEBRUARY": "11.2", "MARCH": "12.5", "APRIL": "12.6", "MAY": "12.3", "JUNE": "12.6" },
//   "2016": { "JULY": "11.1", "AUGUST": "12.3", "SEPTEMBER": "12.2", "OCTOBER": "14.1", "NOVEMBER": "11.7", "DECEMBER": "10.3", "JANUARY": "11.1", "FEBRUARY": "11.6", "MARCH": "12.2", "APRIL": "11.4", "MAY": "11.2", "JUNE": "10.8" },
//   "2017": { "JULY": "12.4", "AUGUST": "12", "SEPTEMBER": "13.1", "OCTOBER": "12.5", "NOVEMBER": "10.9", "DECEMBER": "12", "JANUARY": "11.6", "FEBRUARY": "11.3", "MARCH": "11", "APRIL": "11.5", "MAY": "10.3", "JUNE": "9.4" },
//   "2018": { "JULY": "10.5", "AUGUST": "11.8", "SEPTEMBER": "11", "OCTOBER": "11.4", "NOVEMBER": "10.4", "DECEMBER": "9.9", "JANUARY": "10.7", "FEBRUARY": "10", "MARCH": "9.8", "APRIL": "9.4", "MAY": "9.3", "JUNE": "9.2" },
//   "2019": { "JULY": "9.5", "AUGUST": "9.2", "SEPTEMBER": "8.7", "OCTOBER": "8.3", "NOVEMBER": "7.7", "DECEMBER": "8.5", "JANUARY": "8", "FEBRUARY": "9", "MARCH": "9.3", "APRIL": "7.8", "MAY": "7.8", "JUNE": "8" },
//   "2020": { "JULY": "7.9", "AUGUST": "7", "SEPTEMBER": "8.2", "OCTOBER": "9", "NOVEMBER": "8.5", "DECEMBER": "9.2", "JANUARY": "9.6", "FEBRUARY": "7.8", "MARCH": "8.4", "APRIL": "9", "MAY": "9.6", "JUNE": "8.5" },
//   "2021": { "JULY": "7.3", "AUGUST": "8.5", "SEPTEMBER": "9.4", "OCTOBER": "8.5", "NOVEMBER": "9.5", "DECEMBER": "10.6", "JANUARY": "9.1", "FEBRUARY": "7.9", "MARCH": "7.4", "APRIL": "7.1", "MAY": "8.1", "JUNE": "8.2" },
//   "2022": { "JULY": "9.3", "AUGUST": "9.2", "SEPTEMBER": "7.9", "OCTOBER": "7.1", "NOVEMBER": "7.3", "DECEMBER": "6.7", "JANUARY": "6.4", "FEBRUARY": "6", "MARCH": "5.8", "APRIL": "5.8", "MAY": "5.9", "JUNE": "5.8" },
//   "metric style": "Labor Force (%)", "metric": "Unemployment Rate", "source": " • Source: Dept. of Labor and Human Resources, Household Survey"
// }


function organizeData(inputData) {
  //data filter after extraction START
  console.log(inputData)
  if (inputData) {
    const finalValArr = []
    for (const key of Object.keys(inputData).slice(0, 9)) {
      const currYears = new Object()
      currYears['year'] = key
      for (const [innerKey, innerValue] of Object.entries(inputData[key])) {
        currYears[innerKey] = innerValue
      }
      finalValArr.push(currYears)
    }
    //data filter after extraction END
    return finalValArr
  } else {
    return
  }

}

const Compare = () => {

  const [data, setdata] = useState();

  useEffect(() => {
    fetch("/centro-capital/allUnemploymentYearly",
      { method: 'GET' }).then(response => {
        if (response.status == 200) {
          return response.json()
        }
      }).then(data => setdata(data))
      .then(error => console.log(error))
  })

  const arr = organizeData(data)
  console.log(arr)


  return (
    <div>
      <p>hi</p>
    </div>
  )

};

export default Compare;
