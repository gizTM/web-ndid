import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import InitNDIDForm from '../components/forms/initNDIDForm'
import RegisterNodeForm from '../components/forms/registerNodeForm'
import UpdateNodeForm from '../components/forms/updateNodeForm'
import SetNodeTokenForm from '../components/forms/setNodeTokenForm'
import AddNodeTokenForm from '../components/forms/addNodeTokenForm'
import ReduceNodeTokenForm from '../components/forms/reduceNodeTokenForm'
import AddNamespaceForm from '../components/forms/addNamespaceForm'
import DisableNamespaceForm from '../components/forms/disableNamespaceForm'
import EnableNamespaceForm from '../components/forms/enableNamespaceForm'
import AddServiceForm from '../components/forms/addServiceForm'
import UpdateServiceForm from '../components/forms/updateServiceForm'
import DeleteServiceForm from '../components/forms/deleteServiceForm'
import ApproveServiceForm from '../components/forms/approveServiceForm'
import RegisterValidatorForm from '../components/forms/registerValidatorForm'
import SetTimeoutBlockForm from '../components/forms/setTimeoutBlockForm'
import { connect } from 'react-redux'
import { Sidebar, SidebarItem } from 'react-responsive-sidebar'
import { selectMenu } from '../actions/menuAction'
import { MENU } from '../constants'

const menus = [
  MENU.INIT_NDID,
  MENU.REGISTER_NODE,
  MENU.UPDATE_NODE,
  MENU.SET_NODE_TOKEN,
  MENU.ADD_NODE_TOKEN,
  MENU.REDUCE_NODE_TOKEN,
  MENU.ADD_NAMESPACE,
  MENU.DISABLE_NAMESPACE,
  MENU.ENABLE_NAMESPACE,
  MENU.ADD_SERVICE,
  MENU.UPDATE_SERVICE,
  MENU.DELETE_SERVICE,
  MENU.APPROVE_SERVICE,
  MENU.REGISTER_VALIDATOR,
  MENU.SET_TIMEOUT_BLOCK
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
            {this.props.menu === MENU.UPDATE_NODE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <UpdateNodeForm /> </Col>}
            {this.props.menu === MENU.SET_NODE_TOKEN && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <SetNodeTokenForm /> </Col>}
            {this.props.menu === MENU.ADD_NODE_TOKEN && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddNodeTokenForm /> </Col>}
            {this.props.menu === MENU.REDUCE_NODE_TOKEN && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <ReduceNodeTokenForm /> </Col>}
            {this.props.menu === MENU.ADD_NAMESPACE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddNamespaceForm /> </Col>}
            {this.props.menu === MENU.DISABLE_NAMESPACE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <DisableNamespaceForm /> </Col>}
            {this.props.menu === MENU.ENABLE_NAMESPACE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <EnableNamespaceForm /> </Col>}
            {this.props.menu === MENU.ADD_SERVICE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddServiceForm  /> </Col>}
            {this.props.menu === MENU.UPDATE_SERVICE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <UpdateServiceForm /> </Col>}
            {this.props.menu === MENU.DELETE_SERVICE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <DeleteServiceForm /> </Col>}
            {this.props.menu === MENU.APPROVE_SERVICE && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <ApproveServiceForm /> </Col>}
            {this.props.menu === MENU.REGISTER_VALIDATOR && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <RegisterValidatorForm /> </Col>}
            {this.props.menu === MENU.SET_TIMEOUT_BLOCK && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <SetTimeoutBlockForm /> </Col>}
          </Row>
        </Container>
      </Sidebar>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
