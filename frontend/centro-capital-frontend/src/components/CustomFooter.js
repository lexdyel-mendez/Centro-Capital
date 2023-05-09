import React, { Component } from 'react';
import { CFooter, CLink } from '@coreui/react'

class CustomFooter extends Component {
    render() {
        return (
            <div className="fixed-bottom mt-auto">
            <div style={{ marginTop: '50px' }}>
                <CFooter className="mt-auto">
                    
                    <div>
                        <CLink href="https://centrocapitalpr.wordpress.com">Centro Capital</CLink>
                        <span> &copy; 2023 UPRM</span>
                    </div>
                    <div>
                        <span>Powered by</span>
                        <CLink href="https://coreui.io"> CoreUI</CLink>
                    </div>
                </CFooter>
            </div>
            </div>
        );
    }
}

export default CustomFooter;