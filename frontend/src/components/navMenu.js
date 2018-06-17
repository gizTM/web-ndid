import React from 'react'
import { Nav, NavLink } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { selectMenu } from '../actions/menuAction'
import { connect } from 'react-redux'

const menus = [
  'Register node','Set node token','Add node token','Reduce node token','Add namespace','Delete namespace','Add service','Delete service'  
  ];

const mapStateToProps = state => {
    return {
      menu: state.menu
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onMenuSelected: (menu) => {
        dispatch(selectMenu(menu))
      }
    }
  }

class NavMenu extends React.Component {
    render() {
        const { menu,onMenuSelected } = this.props
        const menuList = menus.map((item,i) => (
            <ListGroupItem key={i} style={{background: menu===i?'#6ebbff':'white',border:'none'}} >
                <NavLink href="#" onClick={()=>onMenuSelected(i)} style={{color: menu===i?'white':'gray',fontWeight: menu===i?'bold':'normal'}}>{item}</NavLink>
            </ListGroupItem>
        ))
        return (
        <div style={{padding: '20px', background: '#ffffff', borderRadius: '5px',border: '.5px solid lightgray'}}>
            <p style={{fontWeight: 'bold',color: '#555555', textAlign: 'center'}}>NDID API Menu</p>
            <Nav vertical>
                <ListGroup>
                    {menuList}
                </ListGroup>
            </Nav>
      </div>
    )}
}

const Menu = connect(mapStateToProps,mapDispatchToProps)(NavMenu)
export { menus,Menu }