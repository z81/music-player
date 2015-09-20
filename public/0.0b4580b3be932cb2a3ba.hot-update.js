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

	//import mui, { ContentInbox, Avatar, ListDivider, List, ListItem, AppBar, Toolbar, ToolbarGroup } from 'material-ui';

	__webpack_require__(311);

	window.React = _react2['default'];

	/*let ThemeManager = new mui.Styles.ThemeManager();

	ThemeManager.setTheme(ThemeManager.types.LIGHT);
	ThemeManager.setPalette({
		primary1Color: mui.Styles.Colors.green600
	});*/

	var Element = (function (_React$Component) {
		_inherits(Element, _React$Component);

		function Element() {
			_classCallCheck(this, Element);

			_get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this);
			this.state = {
				music: [],
				musicList: [],
				audio: {},
				isPlay: false,
				track: 0,
				volume: 0.5,
				firstLoading: true,
				volume_start: 0,
				isVolumeChange: false
			};
		}

		/*Element.childContextTypes = {
	     muiTheme: React.PropTypes.object
	 };*/

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

				audio.volume = this.state.volume;

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
					if (!_this.state.firstLoading) {
						audio.play();
					} else {
						_this.setState(function () {
							return {
								firstLoading: false
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
				}, 500);

				this.getMusic();
			}
		}, {
			key: 'getMusic',
			value: function getMusic() {
				var _this2 = this;

				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/list', true);
				xhr.onload = function (e) {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							_this2.setState(function () {
								return {
									music: JSON.parse(xhr.responseText).data
								};
							});
						}
					}
				};
				xhr.send();
			}

			/*getChildContext() {
	      return {
	        muiTheme: ThemeManager.getCurrentTheme()
	      };
	  }*/

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
			key: 'prev',
			value: function prev() {
				var _this3 = this;

				this.setState(function () {
					return {
						track: _this3.state.track > 1 ? _this3.state.track - 1 : _this3.state.music.length - 1
					};
				});
			}
		}, {
			key: 'next',
			value: function next() {
				var _this4 = this;

				this.setState(function () {
					return {
						track: _this4.state.track < _this4.state.music.length - 1 ? _this4.state.track + 1 : 0
					};
				});
			}
		}, {
			key: 'changeVolume',
			value: function changeVolume(e) {
				var _this5 = this;

				var el = e.target;
				if (e.target.id != "volume-level") {
					el = e.target.parentNode;
				}

				var volume = (100 - (e.clientY - el.offsetTop - 6)) / 100;

				this.setState(function () {
					_this5.state.audio.volume = volume;
					return {
						volume: volume
					};
				});
			}
		}, {
			key: 'getCurrentTime',
			value: function getCurrentTime() {
				var min = Math.round(this.state.audio.currentTime / 60);
				var sec = Math.round(this.state.audio.currentTime % 60);

				sec = sec < 10 ? '0' + sec : sec;

				return min + ':' + sec;
			}
		}, {
			key: 'changeVolumeStart',
			value: function changeVolumeStart(e) {
				var pos = e.clientY;

				this.setState(function () {
					return {
						volume_start: pos,
						isVolumeChange: true
					};
				}); // wtf?

				/*window.volume_start = e.clientY;
	   window.isVolumeChange = true;
	   */
				e.preventDefault();
			}
		}, {
			key: 'changeVolumeMove',
			value: function changeVolumeMove(e) {
				var _this6 = this;

				if (this.state.isVolumeChange) {
					(function () {
						var vol = _this6.state.volume + (_this6.state.volume_start - e.clientY) / 100;
						var pos = e.clientY;

						console.log((_this6.state.volume_start - e.clientY) / 100);
						_this6.setState(function () {
							return {
								volume_start: pos,
								volume: vol
							};
						});
					})();
				}
			}
		}, {
			key: 'changeVolumeStop',
			value: function changeVolumeStop(e) {
				this.setState(function () {
					return {
						isVolumeChange: false
					};
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this7 = this;

				var pauseClass = this.state.isPlay ? "btn pause" : "btn";
				var track = this.state.music.length > 0 ? this.state.music[this.state.track].url : '';

				return _react2['default'].createElement(
					'div',
					null,
					_react2['default'].createElement(
						'div',
						{ id: 'track-list' },
						this.state.music.map(function (t, i) {
							var selectedClass = i === _this7.state.track ? "track current_selected" : "track";
							var selectTrack = function selectTrack() {
								_this7.setState(function () {
									return {
										track: i
									};
								});
							};

							return _react2['default'].createElement(
								'div',
								{ key: i, className: selectedClass, onClick: selectTrack },
								_react2['default'].createElement(
									'div',
									{ className: 'title' },
									t.title
								),
								_react2['default'].createElement(
									'div',
									{ className: 'body' },
									t.artist
								)
							);
						})
					),
					_react2['default'].createElement(
						'div',
						{ id: 'player' },
						_react2['default'].createElement(
							'div',
							{ onClick: this.setTime.bind(this) },
							_react2['default'].createElement(
								'div',
								{ id: 'player-time', style: { width: this.state.time + '%' } },
								_react2['default'].createElement(
									'div',
									{ id: 'current-time' },
									this.getCurrentTime()
								)
							)
						),
						_react2['default'].createElement(
							'div',
							{ id: 'player-controls' },
							_react2['default'].createElement('audio', { id: 'audio', src: track }),
							_react2['default'].createElement('span', { id: 'prev', className: 'btn', onClick: this.prev.bind(this) }),
							_react2['default'].createElement('span', { id: 'play', className: pauseClass, onClick: this.play.bind(this) }),
							_react2['default'].createElement('span', { id: 'next', className: 'btn', onClick: this.next.bind(this) }),
							this.state.music.length === 0 || _react2['default'].createElement(
								'span',
								{ id: 'player-text' },
								this.state.music[this.state.track].artist,
								' - ',
								this.state.music[this.state.track].title
							),
							_react2['default'].createElement(
								'span',
								{ className: 'btn', id: 'volume' },
								_react2['default'].createElement(
									'span',
									{ id: 'volume-level',
										onClick: this.changeVolume.bind(this),
										onMouseDown: this.changeVolumeStart.bind(this),
										onMouseUp: this.changeVolumeStop.bind(this),
										onMouseMove: this.changeVolumeMove.bind(this)
									},
									_react2['default'].createElement('div', { style: { height: 100 - this.state.volume * 100 + 'px' }, className: 'spliter spliter-background' }),
									_react2['default'].createElement('div', { style: { height: this.state.volume * 100 + 'px' }, className: 'spliter' })
								)
							)
						)
					)
				);
			}
		}]);

		return Element;
	})(_react2['default'].Component);

	_react2['default'].render(_react2['default'].createElement(Element, null), document.getElementById('root'));
	/*<AppBar
	 title="Player"
	 iconClassNameRight="muidocs-icon-navigation-expand-more" />*/

/***/ }
])