import React from 'react'
import {Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const NoMatch = ({ location }) => (
            <Col sm={9}>
                <h3>No match for <code>{location.pathname}</code></h3>
            </Col>
);

export default NoMatch