import React from 'react';
import ItemList from './ItemList.jsx';

export default class Item extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      expanded: true,
      activeMenu: this.props.activeMenu,
      height: null,
    };
    this.click = this.click.bind(this);

    const item = this.props.item;

    // Initiate menu data
    this.childs = null;
    this.isGroup = false;

    if (item.childs) {
      this.isGroup = true;
    }
  }

  componentDidMount() {
    this.setState({
      height: this.refs.dom.offsetHeight,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeMenu !== this.props.activeMenu) {
      this.setState({
        activeMenu: nextProps.activeMenu
      });
    }
  }

  click(e) {
    if (this.isGroup) {
      e.preventDefault();
      this.setState({
        expanded: !this.state.expanded,
      });
    }
  }

  getItemHeight(item) {
    const getItemHeight = (item) => {
      if (!item.childs) {
        return this.state.height;
      } else {
        let total = 0;
        for (let i = 0; i < item.childs.length; i++) {
          total += getItemHeight(item.childs[i]);
        }
        return this.state.height + total;
      }
    }
    return getItemHeight(item);
  }

  isActive(item) {
    const isActive = (item) => {
      if (item.key === this.state.activeMenu) {
        return true;
      } else if (item.childs) {
        let result = false;
        for (let i = 0; i < item.childs.length; i++) {
          if (isActive(item.childs[i])) {
            return true;
          }
        }
      }
      return false;
    };
    return isActive(this.props.item);
  }

  render() {
    let expandStateClass = '';
    let expandStateElement = null;
    let height = null;
    const item = this.props.item;
    const activeStateClass = this.isActive() ? 'active' : '';
    const selectedStateClass = item.key === this.state.activeMenu ? 'selected' : '';

    if (this.isGroup) {
      this.childs = (
        <ul className={'group-level-' + (this.props.level + 1)}>
          <ItemList
            activeMenu={this.state.activeMenu}
            level={this.props.level + 1}
            items={item.childs}
          />
        </ul>
      );
      expandStateClass = this.state.expanded ?
        'menu-item-group menu-item-expanded' :
        'menu-item-group menu-item-expanded-false';
      expandStateElement = (
        <div className="expand-state" onClick={this.click}>
          {this.state.expanded ?
            <i className="fa fa-minus"></i> :
            <i className="fa fa-plus"></i>
            }
          </div>
      );
      if (this.state.height) {
        height = this.state.expanded ? this.getItemHeight(item) : this.state.height;
      }
    }

    return (
      <li
        ref="dom"
        style={{ maxHeight: height }}
        className={'item-level-' + this.props.level +
          ' ' + expandStateClass + ' ' + selectedStateClass}
      >
        <a className={'menu-item ' + activeStateClass} href={item.link || '#'}>
          {item.icon ?
            <i className={'menu-item-icon fa ' + item.icon}></i>
                : null
          }
          {item.name}
          {expandStateElement}
        </a>
        {this.childs}
      </li>
    );
  }

}
