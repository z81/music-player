webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _materialUi = __webpack_require__(157);

	var _materialUi2 = _interopRequireDefault(_materialUi);

	__webpack_require__(311);

	var ThemeManager = new _materialUi2['default'].Styles.ThemeManager();

	ThemeManager.setTheme(ThemeManager.types.LIGHT);
	ThemeManager.setPalette({
		primary1Color: _materialUi2['default'].Styles.Colors.green600
	});

	var Element = (function (_React$Component) {
		_inherits(Element, _React$Component);

		function Element() {
			_classCallCheck(this, Element);

			_get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this);
			this.state = {
				music: [],
				audio: {},
				isPlay: false,
				track: -1,
				volume: 0.5
			};
		}

		_createClass(Element, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this = this;

				var audio = document.getElementById('audio');
				this.setState({
					music: [],
					audio: audio,
					time: 0,
					controls: document.getElementById('player-controls')
				});

				audio.volume = 0.5;

				audio.onplay = function () {
					_this.setState(function () {
						return {
							isPlay: true
						};
					});
				};

				audio.onpause = function () {
					_this.setState(function () {
						return {
							isPlay: false
						};
					});
				};

				audio.oncanplay = function () {
					if (_this.state.track !== -1) {
						audio.play();
					} else {
						_this.setState(function () {
							return {
								track: 0
							};
						});
					}
				};

				setInterval(function () {
					_this.setState(function () {
						return {
							time: Math.floor(audio.currentTime / audio.duration * 10000) / 100
						};
					});
				}, 1000);

				this.getMusic();
			}
		}, {
			key: 'getMusic',
			value: function getMusic() {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/list', false);
				xhr.send();
				if (xhr.status == 200) {
					this.setState(function () {
						return {
							music: JSON.parse(xhr.responseText).data
						};
					});
				}
			}
		}, {
			key: 'getChildContext',
			value: function getChildContext() {
				return {
					muiTheme: ThemeManager.getCurrentTheme()
				};
			}
		}, {
			key: 'setTime',
			value: function setTime(e) {
				var pos = e.pageX / this.state.controls.offsetWidth;
				this.setState(function () {
					return {
						time: pos * 100
					};
				});

				this.state.audio.currentTime = this.state.audio.duration * pos;
				this.state.audio.play();
			}
		}, {
			key: 'play',
			value: function play() {
				if (this.state.isPlay) {
					this.state.audio.pause();
				} else {
					this.state.audio.play();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var music = '';
				var pauseClass = this.state.isPlay ? "btn pause" : "btn";
				var track = this.state.track > -1 ? this.state.music[this.state.track].url : '';

				if (this.state.music !== []) {
					music = _react2['default'].createElement(
						_materialUi.List,
						{ subheader: 'Музыка', leftIcon: _react2['default'].createElement(_materialUi.ContentInbox, null) },
						this.state.music.map(function (t, i) {
							var selectedClass = i == _this2.state.track ? "current_selected" : "";
							var selectTrack = function selectTrack() {
								_this2.setState(function () {
									return {
										track: i
									};
								});

								//setTimeout(()=>this.state.audio.play(), 140)
							};

							return _react2['default'].createElement(_materialUi.ListItem, { className: selectedClass, primaryText: t.title, secondaryText: t.artist[0], secondaryTextLines: 1, onClick: selectTrack });
						})
					);
				}

				return _react2['default'].createElement(
					'div',
					null,
					_react2['default'].createElement(_materialUi.AppBar, {
						title: 'Title',
						iconClassNameRight: 'muidocs-icon-navigation-expand-more' }),
					music,
					_react2['default'].createElement(
						'div',
						{ id: 'player' },
						_react2['default'].createElement(
							'div',
							{ onClick: this.setTime.bind(this) },
							_react2['default'].createElement('div', { id: 'player-time', style: { width: this.state.time + '%' } })
						),
						_react2['default'].createElement(
							'div',
							{ id: 'player-controls' },
							_react2['default'].createElement('audio', { id: 'audio', src: track }),
							_react2['default'].createElement('span', { id: 'prev', className: 'btn' }),
							_react2['default'].createElement('span', { id: 'play', className: pauseClass, onClick: this.play.bind(this) }),
							_react2['default'].createElement('span', { id: 'next', className: 'btn' }),
							_react2['default'].createElement(
								'span',
								{ className: 'btn', id: 'volume' },
								_react2['default'].createElement(
									'span',
									{ id: 'volume-level' },
									_react2['default'].createElement('div', { className: 'spliter' })
								)
							)
						)
					)
				);
			}
		}]);

		return Element;
	})(_react2['default'].Component);

	Element.childContextTypes = {
		muiTheme: _react2['default'].PropTypes.object
	};

	_react2['default'].render(_react2['default'].createElement(Element, null), document.getElementById('root'));

/***/ }
])