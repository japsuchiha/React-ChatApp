'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log('running');

var DUMMY_DATA = [{
    senderId: "uchiha",
    text: "sasuke"
}, {
    senderId: "uzumaki",
    text: "naruto"
}];

var instanceLocator = 'v1:us1:088e458a-214c-4666-a270-94f6be46b3c8';
var testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/088e458a-214c-4666-a270-94f6be46b3c8/token';
var name = "uchiha";
var roomId = 10047377;

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            messages: []
        };
        _this.sendMessage = _this.sendMessage.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'sendMessage',
        value: function sendMessage(text) {
            this.currentUser.sendMessage({
                text: text,
                roomId: roomId
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var chatManager = new Chatkit.ChatManager({
                instanceLocator: instanceLocator,
                userId: name,
                tokenProvider: new Chatkit.TokenProvider({
                    url: testToken
                })
            });

            chatManager.connect().then(function (currentUser) {
                _this2.currentUser = currentUser;
                _this2.currentUser.subscribeToRoom({
                    roomId: roomId,
                    hooks: {
                        onNewMessage: function onNewMessage(message) {
                            _this2.setState(function (prevState) {
                                return {
                                    messages: prevState.messages.concat(message)
                                };
                            });
                            console.log(_this2.state.messages);
                        }
                    }
                }).catch(function (error) {
                    console.error("error", error);
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'app' },
                React.createElement(Title, null),
                React.createElement(Messages, { messages: this.state.messages, roomId: this.state.roomId }),
                React.createElement(MessageForm, { sendMessage: this.sendMessage })
            );
        }
    }]);

    return App;
}(React.Component);

var Messages = function (_React$Component2) {
    _inherits(Messages, _React$Component2);

    function Messages() {
        _classCallCheck(this, Messages);

        return _possibleConstructorReturn(this, (Messages.__proto__ || Object.getPrototypeOf(Messages)).apply(this, arguments));
    }

    _createClass(Messages, [{
        key: 'render',
        value: function render() {
            console.log('entering');
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'ul',
                    { className: 'message-list' },
                    this.props.messages.map(function (message) {
                        console.log(message.text);
                        return React.createElement(
                            'li',
                            { key: message.id },
                            React.createElement(
                                'div',
                                null,
                                message.senderId
                            ),
                            React.createElement(
                                'div',
                                null,
                                message.text
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Messages;
}(React.Component);

var MessageForm = function (_React$Component3) {
    _inherits(MessageForm, _React$Component3);

    function MessageForm(props) {
        _classCallCheck(this, MessageForm);

        var _this4 = _possibleConstructorReturn(this, (MessageForm.__proto__ || Object.getPrototypeOf(MessageForm)).call(this, props));

        _this4.state = {
            message: ""
        };
        _this4.handleSubmit = _this4.handleSubmit.bind(_this4);
        _this4.handleChange = _this4.handleChange.bind(_this4);
        return _this4;
    }

    _createClass(MessageForm, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            this.props.sendMessage(this.state.message);
            this.setState(function () {
                message: "";
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            console.log(e.target.value);
            var message = e.target.value;
            this.setState(function () {
                return {
                    message: message
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { className: 'form', onSubmit: this.handleSubmit },
                    React.createElement('input', { onChange: this.handleChange, value: this.state.message, type: 'text', name: 'user' })
                )
            );
        }
    }]);

    return MessageForm;
}(React.Component);

function Title() {
    return React.createElement(
        'p',
        { className: 'title' },
        'Chat App'
    );
}
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
