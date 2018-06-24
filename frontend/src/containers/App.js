import React, { Component } from 'react';
// import './App.css';
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
import { connect } from 'react-redux'
// import { Menu } from '../components/navMenu'
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { selectMenu } from '../actions/menuAction'
// import APIForm from '../components/form'

const menus = [
  'Init NDID','Register node','Set node token','Add node token','Reduce node token','Add namespace','Delete namespace','Add service','Delete service'
  ];

const mapStateToProps = state => {
    return {
      menu: state.menu
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onMenuSelected: (menu) => {
        // console.log('menu: ',menu)
        // console.log('menu selected: ',JSON.stringify(menu))
        console.log('menu selected: ',menu.children.props.children[0].props.children)
        let x = 0
        switch (menu.children.props.children[0].props.children) {
          case 'Register node':
            x = 1
            break
          case 'Set node token': 
            x = 2
            break
          case 'Add node token':
            x = 3
            break
          case 'Reduce node token':
            x = 4
            break
          case 'Add namespace':
            x = 5
            break
          case 'Delete namespace':
            x = 6
            break
          case 'Add service':
            x = 7
            break
          case 'Delete service':
            x = 8
            break
          default:
            x = 0
            break
        }
        dispatch(selectMenu(x))
      }
    }
  }

const style = {
  border: '1px none gray'
}

class App extends Component {
  render() {
    const { menu,onMenuSelected } = this.props
    console.log('app menu: '+menu)
    const items = menus.map((menu,i) => {
      return <SidebarItem background={i===this.props.menu?'#2784d6':'#52aeff'}>{menu}</SidebarItem>
    })
    return (
      <div className="App">
      <Sidebar content={items} background='#52aeff' onItemSelected={(selected) => onMenuSelected(selected)}>
        <Container style={{padding: '20px'}}>
          <Row style={style}>
            {/* <Col xs="6" sm="3" style={style}><Menu /></Col> */}
            {this.props.menu === 0 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <InitNDIDForm /> </Col>}
            {this.props.menu === 1 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <RegisterNodeForm /> </Col>}
            {this.props.menu === 2 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <SetNodeTokenForm /> </Col>}
            {this.props.menu === 3 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddNodeTokenForm /> </Col>}
            {this.props.menu === 4 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <ReduceNodeTokenForm /> </Col>}
            {this.props.menu === 5 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddNamespaceForm /> </Col>}
            {this.props.menu === 6 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <DeleteNamespaceForm /> </Col>}
            {this.props.menu === 7 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <AddServiceForm  /> </Col>}
            {this.props.menu === 8 && <Col sm="9" md={{ size: 6, offset: 1 }} style={style}> <DeleteServiceForm /> </Col>}
            {/* <APIForm labels={menu}/> */}
          </Row>
        </Container>
      </Sidebar>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
