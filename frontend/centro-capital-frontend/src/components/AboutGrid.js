import React from 'react'

export default function AboutGrid () {
  
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
              <CustomLine></CustomLine>
            </div>
            <div class="col">
              <CustomBar></CustomBar>
            </div>
    </div>

    </div>
  )
}