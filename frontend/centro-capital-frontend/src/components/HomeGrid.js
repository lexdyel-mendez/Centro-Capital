import React from 'react'
import CustomBar from './CustomBar'
import CustomLine from './CustomLine'
export default function HomeGrid () {
  
  const input = [
    {
      name: '2014',
      unemployment: 4,
      gdp: 3,
    },
    {
      name: '2015',
      unemployment: 5,
      gdp: 3.2,
    },
    {
      name: '2016',
      unemployment: 5,
      gdp: 7,
    },
  ];

  return (

    <div className="container">
        {/* No extra definition of column and row sizes as they naturally flex avoiding overflow with bootstrap*/}
        <div class="row">
            <div class="col">
              <h1> Bar Chart in container grid</h1>
                 <CustomBar></CustomBar>
            </div>
            <div class="col">
              <h1>  Line Chart in container grid</h1>
              <CustomLine data={input}></CustomLine>
            </div>
            <div class="col">
              <CustomBar></CustomBar>
            </div>
    </div>

    </div>
  )
}