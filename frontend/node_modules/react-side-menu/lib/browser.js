'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Menu = require('./Menu.jsx');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.ReactSideMenu = function (menu, activeMenu, element) {
  _reactDom2.default.render(_react2.default.createElement(_Menu2.default, { menu: menu, activeMenu: activeMenu }), element);
};