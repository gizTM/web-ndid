'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemList = require('./ItemList.jsx');

var _ItemList2 = _interopRequireDefault(_ItemList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item() {
    var _Object$getPrototypeO;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Item)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.state = {
      expanded: true,
      activeMenu: _this.props.activeMenu,
      height: null
    };
    _this.click = _this.click.bind(_this);

    var item = _this.props.item;

    // Initiate menu data
    _this.childs = null;
    _this.isGroup = false;

    if (item.childs) {
      _this.isGroup = true;
    }
    return _this;
  }

  _createClass(Item, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        height: this.refs.dom.offsetHeight
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.activeMenu !== this.props.activeMenu) {
        this.setState({
          activeMenu: nextProps.activeMenu
        });
      }
    }
  }, {
    key: 'click',
    value: function click(e) {
      if (this.isGroup) {
        e.preventDefault();
        this.setState({
          expanded: !this.state.expanded
        });
      }
    }
  }, {
    key: 'getItemHeight',
    value: function getItemHeight(item) {
      var _this2 = this;

      var getItemHeight = function getItemHeight(item) {
        if (!item.childs) {
          return _this2.state.height;
        } else {
          var total = 0;
          for (var i = 0; i < item.childs.length; i++) {
            total += getItemHeight(item.childs[i]);
          }
          return _this2.state.height + total;
        }
      };
      return getItemHeight(item);
    }
  }, {
    key: 'isActive',
    value: function isActive(item) {
      var _this3 = this;

      var isActive = function isActive(item) {
        if (item.key === _this3.state.activeMenu) {
          return true;
        } else if (item.childs) {
          var result = false;
          for (var i = 0; i < item.childs.length; i++) {
            if (isActive(item.childs[i])) {
              return true;
            }
          }
        }
        return false;
      };
      return isActive(this.props.item);
    }
  }, {
    key: 'render',
    value: function render() {
      var expandStateClass = '';
      var expandStateElement = null;
      var height = null;
      var item = this.props.item;
      var activeStateClass = this.isActive() ? 'active' : '';
      var selectedStateClass = item.key === this.state.activeMenu ? 'selected' : '';

      if (this.isGroup) {
        this.childs = _react2.default.createElement(
          'ul',
          { className: 'group-level-' + (this.props.level + 1) },
          _react2.default.createElement(_ItemList2.default, {
            activeMenu: this.state.activeMenu,
            level: this.props.level + 1,
            items: item.childs
          })
        );
        expandStateClass = this.state.expanded ? 'menu-item-group menu-item-expanded' : 'menu-item-group menu-item-expanded-false';
        expandStateElement = _react2.default.createElement(
          'div',
          { className: 'expand-state', onClick: this.click },
          this.state.expanded ? _react2.default.createElement('i', { className: 'fa fa-minus' }) : _react2.default.createElement('i', { className: 'fa fa-plus' })
        );
        if (this.state.height) {
          height = this.state.expanded ? this.getItemHeight(item) : this.state.height;
        }
      }

      return _react2.default.createElement(
        'li',
        {
          ref: 'dom',
          style: { maxHeight: height },
          className: 'item-level-' + this.props.level + ' ' + expandStateClass + ' ' + selectedStateClass
        },
        _react2.default.createElement(
          'a',
          { className: 'menu-item ' + activeStateClass, href: item.link || '#' },
          item.icon ? _react2.default.createElement('i', { className: 'menu-item-icon fa ' + item.icon }) : null,
          item.name,
          expandStateElement
        ),
        this.childs
      );
    }
  }]);

  return Item;
}(_react2.default.Component);

exports.default = Item;