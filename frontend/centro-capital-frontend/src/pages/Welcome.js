import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Welcome() {

    // usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState({
        welcome: ""
    });

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/centro-capital").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    welcome: data.Welcome
                });
            })
        );
    }, []);

    return (
        <div>
        <Container>
            <Row className="m-4 d-flex align-items-center justify-content-center">
                <Col className=" d-flex align-items-center justify-content-center"><h2>Centro Capital is a student project that intends to promote the knowledge of well-being in Puerto Rico</h2></Col>
                <Col className=" d-flex align-items-center justify-content-center"><h4>Feedback is a quintessential part of growing so please let us know your thoughts</h4></Col>
                </Row>
               <h6>Feel free to contact us at: juan.diaz28@upr, adean.colon@upr.edu, or lexdyel.mendez@upr.edu</h6>
        
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdreUsik8fmSbtcpQJNR74Xyxj_KGa6kD4TJ_94gQHemmo92Q/viewform?embedded=true" width="640" height="1940" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </Container>
        </div>
    )
}

export default Welcome;