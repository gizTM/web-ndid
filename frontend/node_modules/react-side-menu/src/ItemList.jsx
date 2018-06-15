import React from 'react';
import Item from './Item.jsx';

export default class ItemList extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    const level = this.props.level || 1;
    const items = this.props.items.map(item => {
      return (
        <Item
          key={item.key}
          level={level}
          item={item}
          activeMenu={this.props.activeMenu}
        />
      );
    });
    return <ul className={'group-level-' + level}>{items}</ul>;
  }
}
