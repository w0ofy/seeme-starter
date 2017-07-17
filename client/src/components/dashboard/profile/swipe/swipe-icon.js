'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = require('react-icon-base');

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwipeIcon = function SwipeIcon(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 22 22' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'M7.53 17.94A2 2 0 0 1 6 16V8l-3.18.85c-.59.16-.94.77-.78 1.35l2.02 7.54c.15.58.76.93 1.35.77l2.12-.57zm3.66.06l-5.52 1.48a2.1 2.1 0 0 1-2.58-1.49l-2.02-7.53a2.1 2.1 0 0 1 1.5-2.57L6 6.99V6c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6.81zM8 5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8zm1.97 10H9v-1c.16-1.14.95-2 1.9-2h4.15c1.06 0 1.92 1.08 1.92 2.42V15h-1v-.58c0-.83-.47-1.42-.92-1.42H10.9c-.46 0-.93.6-.93 1.42V15zM13 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' })
        )
    );
};

exports.default = SwipeIcon;
module.exports = exports['default'];