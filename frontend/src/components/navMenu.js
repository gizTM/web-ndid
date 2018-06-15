import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components'
import { selectMenu } from '../actions/menuAction'
import { connect } from 'react-redux'

// const menu = [
//     { key: 'regisnode', name: 'Register node', icon: 'fa-home', link: '#accounts' },
//     { key: 'setting', name: 'Set node token', link: '#setting', icon: 'fa-gear' },
//     { key: 'setting', name: 'Add node token', link: '#setting', icon: 'fa-gear' },
//     { key: 'setting', name: 'Set node token', link: '#setting', icon: 'fa-gear' },
//     { key: 'setting', name: 'Reduce node token', link: '#setting', icon: 'fa-gear' },
//     { key: 'setting', name: 'Add namespace', link: '#setting', icon: 'fa-gear' },
//     { key: 'setting', name: 'Delete namespace', link: '#setting', icon: 'fa-gear' },
//     { key: 'setting', name: 'Add service', link: '#setting', icon: 'fa-gear' }
//   ];

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
        // console.log('menu: '+menu)
        return (
        <div style={{padding: '10px', background: '#cccccc'}}>
            <p>API Menu</p>
            <Nav vertical>
                <ListGroup>
                    <ListGroupItem>
                        <NavLink href="#" onClick={()=>onMenuSelected(0)} style={{color: menu===0?'red':'gray'}}>Register node</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink href="#" onClick={()=>onMenuSelected(1)} style={{color: menu===1?'red':'gray'}}>Set node token</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink href="#" onClick={()=>onMenuSelected(2)} style={{color: menu===2?'red':'gray'}}>Add node token</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink href="#" onClick={()=>onMenuSelected(3)} style={{color: menu===3?'red':'gray'}}>Reduce node token</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink href="#" onClick={()=>onMenuSelected(4)} style={{color: menu===4?'red':'gray'}}>Add namespace</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink href="#" onClick={()=>onMenuSelected(5)} style={{color: menu===5?'red':'gray'}}>Delete namespace</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink href="#" onClick={()=>onMenuSelected(6)} style={{color: menu===6?'red':'gray'}}>Add service</NavLink>
                    </ListGroupItem>
                    <ListGroupItem>
                        <NavLink href="#" onClick={()=>onMenuSelected(7)} style={{color: menu===7?'red':'gray'}}>Delete service</NavLink>
                    </ListGroupItem>
                </ListGroup>
            </Nav>
      </div>
    )}
}

export default connect(mapStateToProps,mapDispatchToProps)(NavMenu)