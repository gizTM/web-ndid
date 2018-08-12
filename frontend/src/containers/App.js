import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'
import InitNDIDForm from '../components/forms/initNDIDForm'
import RegisterNodeForm from '../components/forms/registerNodeForm'
import SetNodeTokenForm from '../components/forms/setNodeTokenForm'
import AddNodeTokenForm from '../components/forms/addNodeTokenForm'
import ReduceNodeTokenForm from '../components/forms/reduceNodeTokenForm'
import AddNamespaceForm from '../components/forms/addNamespaceForm'
import DeleteNamespaceForm from '../components/forms/deleteNamespaceForm'
import AddServiceForm from '../components/forms/addServiceForm'
import DeleteServiceForm from '../components/forms/deleteServiceForm'
import RegisterValidatorForm from '../components/forms/registerValidatorForm'
import { connect } from 'react-redux'
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { selectMenu } from '../actions/menuAction'
import { MENU } from '../constants'

const menus = [
  MENU.INIT_NDID,
  MENU.REGISTER_NODE,
  MENU.SET_NODE_TOKEN,
  MENU.ADD_NODE_TOKEN,
  MENU.REDUCE_NODE_TOKEN,
  MENU.ADD_NAMESPACE,
  MENU.DELETE_NAMESPACE,
  MENU.ADD_SERVICE,
  MENU.DELETE_SERVICE,
  MENU.REGISTER_VALIDATOR
]

const mapStateToProps = state => {
    return {
      menu: state.menu
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onMenuSelected: (menu) => {
        console.log('menu selected: ',menu.children.props.children[0].props.children)        
        dispatch(selectMenu(menu.children.props.children[0].props.children))
      }
    }
  }

const style = {
  border: '1px none gray'
}

class App extends Component {
  render() {
    const { menu, onMenuSelected } = this.props
    console.log('app menu: '+menu)
    const items = menus.map((menu,i) => {
      return <SidebarItem background={i===this.props.menu?'#2784d6':'#52aeff'}>{menu}</SidebarItem>
    })
    return (
      <div className="App">
      <Sidebar content={items} background='#52aeff' onItemSelected={(selected) => onMenuSelected(selected)}>
        <Container style={{padding: '20px'}}>
          <Row style={style}>
            {this.props.menu === MENU.INIT_NDID && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <InitNDIDForm /> </Col>}
            {this.props.menu === MENU.REGISTER_NODE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <RegisterNodeForm /> </Col>}
            {this.props.menu === MENU.SET_NODE_TOKEN && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <SetNodeTokenForm /> </Col>}
            {this.props.menu === MENU.ADD_NODE_TOKEN && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddNodeTokenForm /> </Col>}
            {this.props.menu === MENU.REDUCE_NODE_TOKEN && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <ReduceNodeTokenForm /> </Col>}
            {this.props.menu === MENU.ADD_NAMESPACE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddNamespaceForm /> </Col>}
            {this.props.menu === MENU.DELETE_NAMESPACE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <DeleteNamespaceForm /> </Col>}
            {this.props.menu === MENU.ADD_SERVICE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddServiceForm  /> </Col>}
            {this.props.menu === MENU.DELETE_SERVICE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <DeleteServiceForm /> </Col>}
            {this.props.menu === MENU.REGISTER_VALIDATOR && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <RegisterValidatorForm /> </Col>}
          </Row>
        </Container>
      </Sidebar>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
