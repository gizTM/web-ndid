import '../../../src/react-sidemenu-theme.less';
import '../index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import Menu from '../../../src/index.js';

const menu = [
  {
    key: 'accounts', name: 'Accounts', icon: 'fa-home', link: '#accounts',
    childs: [
      {
        key: 'siliconstraits', name: 'Silicon Straits', link: '#siliconstraits',
        childs: [
          {
            key: 'spacewalker', name: 'Space Walker', link: '#spacewalker',
            childs: [
              { key: 'internal', name: 'Internal Team', link: '#internal' },
              { key: 'external', name: 'External Team', link: '#external' },
            ]
          },
          { key: 'minion', name: 'Minion', link: '#minion' },
          { key: 'tinker', name: 'Tinker', link: '#tinker' },
        ],
      },
      {
        key: 'microsoft', name: 'Microsoft', link: '#microsoft',
        childs: [
          { key: 'bill', name: 'Bill', link: '#bill' },
          { key: 'gates', name: 'Gates', link: '#gates' },
        ],
      },
      {
        key: 'google', name: 'Google', link: '#google',
        childs: [
          { key: 'chrome', name: 'Chrome', link: '#chrome' },
          { key: 'gmail', name: 'Gmail', link: '#gmail' },
        ],
      },
      {
        key: 'life', name: 'Life', link: '#life',
        childs: [
          { key: 'giang', name: 'Giang', link: '#giang' },
          { key: 'code', name: 'Code', link: '#code' },
        ],
      },
    ]
  },
  {
    key: 'setting', name: 'Setting', link: '#setting', icon: 'fa-gear',
  }
];

const menuElement = document.getElementById('menu');
const render = () => {
  ReactDOM.render(
    <Menu menu={menu} activeMenu={location.hash.replace('#', '')} />,
    menuElement
  );
}
window.addEventListener('hashchange', () => {
  render();
});

render();
