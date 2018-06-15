import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu.jsx';

window.ReactSideMenu = (menu, activeMenu, element) => {
  ReactDOM.render(
    <Menu menu={menu} activeMenu={activeMenu} />,
    element
  );
}
