import React, { Component } from 'react';
// import './App.css';
import { Container, Row, Col } from 'reactstrap'
import APIForm from '../components/form'
import { connect } from 'react-redux'
import { Menu } from '../components/navMenu'

const mapStateToProps = state => {
  return {
    menu: state.menu
  }
}

const style = {
  border: '1px none gray'
}

class App extends Component {
  render() {
    console.log('app menu: '+this.props.menu)
    return (
      <div className="App">
        <Container style={{padding: '20px'}}>
          <Row style={style}>
            {/*<Col xs="6" sm="3" > <div style={{background: '#2c3e50', color: '#FFF', width: 220}}>{MySideNav}</Col> */}
            <Col xs="6" sm="3" style={style}><Menu /></Col>
            <Col sm="9" md={{ size: 6, offset: 1 }} style={style}><APIForm labels={this.props.menu} /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
