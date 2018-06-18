import React, { Component } from 'react';
// import './App.css';
import { Container, Row, Col } from 'reactstrap'
import RegisterNodeForm from '../components/forms/registerNodeForm'
import SetNodeTokenForm from '../components/forms/setNodeTokenForm'
import AddNodeTokenForm from '../components/forms/addNodeTokenForm'
import ReduceNodeTokenForm from '../components/forms/reduceNodeTokenForm'
import AddNamespaceForm from '../components/forms/addNamespaceForm'
import DeleteNamespaceForm from '../components/forms/deleteNamespaceForm'
import AddServiceForm from '../components/forms/addServiceForm'
import DeleteServiceForm from '../components/forms/deleteService'
import { connect } from 'react-redux'
import { Menu } from '../components/navMenu'
// import Menu from '../components/menu'

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
            {/* <Col xs="6" sm="3" style={style}><Menu /></Col> */}
            {this.props.menu === 0 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <RegisterNodeForm /> </Col>}
            {this.props.menu === 1 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <SetNodeTokenForm /> </Col>}
            {this.props.menu == 2 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddNodeTokenForm /> </Col>}
            {this.props.menu == 3 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <ReduceNodeTokenForm /> </Col>}
            {this.props.menu == 4 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddNamespaceForm /> </Col>}
            {this.props.menu == 5 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <DeleteNamespaceForm /> </Col>}
            {this.props.menu == 6 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddServiceForm  /> </Col>}
            {this.props.menu == 7 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <DeleteServiceForm /> </Col>}
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
