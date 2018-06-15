import React from 'react';
import ItemList from './ItemList.jsx';

export default class Menu extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className="react-sidemenu">
        <ItemList activeMenu={this.props.activeMenu} items={this.props.menu} />
      </div>
    );
  }
}
