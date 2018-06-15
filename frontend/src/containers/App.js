import React, { Component } from 'react';
// import './App.css';
import { Container, Row, Col } from 'reactstrap'
import APIForm from '../components/form'
import Menu from 'react-side-menu'
import { connect } from 'react-redux'
import { selectMenu } from '../actions/menuAction'

const mapStateToProps = state => {
  return {
    menu: state.menu
  }
}

const menu = [
  { key: 0, name: 'Register node', icon: 'fa-home', link: '#accounts' },
  { key: 1, name: 'Set node token', link: '#setting', icon: 'fa-gear' },
  { key: 2, name: 'Add node token', link: '#setting', icon: 'fa-gear' },
  { key: 3, name: 'Set node token', link: '#setting', icon: 'fa-gear' },
  { key: 4, name: 'Reduce node token', link: '#setting', icon: 'fa-gear' },
  { key: 5, name: 'Add namespace', link: '#setting', icon: 'fa-gear' },
  { key: 6, name: 'Delete namespace', link: '#setting', icon: 'fa-gear' },
  { key: 7, name: 'Add service', link: '#setting', icon: 'fa-gear' }
]

class App extends Component {
  render() {
    console.log('app menu: '+this.props.menu)
    return (
      <div className="App">
        <Container style={{padding: '20px'}}>
          <Row className='justify-content-center' style={{border: '1px solid gray'}}>
            <Col xs="6" sm="3" ><Menu menu={menu} activeMenu={this.props.menu} /></Col>
            {/* <Col xs="6" sm="3" style={{border: '1px solid gray'}}><NavMenu /></Col> */}
            <Col md="6" sm="6" style={{border: '1px solid gray'}}><APIForm labels={this.props.menu} /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
