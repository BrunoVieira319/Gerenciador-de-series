import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Badge } from 'reactstrap';

class InfoComponent extends Component {
  render () {
    return (
      <Col xs="6"> 
        <Badge color={this.props.color} pill>{this.props.info}</Badge> {this.props.text}
      </Col>
    );
  }
}
  
export default InfoComponent;


  