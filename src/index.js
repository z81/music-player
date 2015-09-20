import React from 'react';
//import mui, { ContentInbox, Avatar, ListDivider, List, ListItem, AppBar, Toolbar, ToolbarGroup } from 'material-ui';
import './index.less';

window.React = React;

/*let ThemeManager = new mui.Styles.ThemeManager();

ThemeManager.setTheme(ThemeManager.types.LIGHT);
ThemeManager.setPalette({
	primary1Color: mui.Styles.Colors.green600
});*/


class Element extends React.Component {
	constructor() {
		super();
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

	componentDidMount() {
		let audio = document.getElementById('audio');
		this.setState({
			music: [],
			audio: audio,
			time: 0,
			controls: document.getElementById('player-controls')
		});

		audio.volume = this.state.volume;

		audio.onplay = () => {
			this.setState(()=> {
	    		return {
	    			isPlay: true
	    		};
	    	})
		};

		audio.onended = () => {
			this.setState(()=> {
	    		return {
	    			track: this.state.track + 1
	    		};
	    	})
		};

		audio.onpause = () => {
			this.setState(()=> {
	    		return {
	    			isPlay: false
	    		};
	    	})
		};

		audio.oncanplay = () => {
			if(!this.state.firstLoading) {
				audio.play();
			} else {
				this.setState(()=> {
					return {
						firstLoading: false
					}
				})
			}
		};


		setInterval(()=> {
	    	this.setState(()=> {
	    		return {
	    			time: (Math.floor(audio.currentTime / audio.duration * 10000) / 100) 
	    		};
	    	})
	    }, 500)


		this.getMusic();
	}


	getMusic() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/list', true);
		xhr.onload = (e) => {
		 if (xhr.readyState === 4) {
		    if (xhr.status === 200) {
				this.setState(() => {
					return {
						music: JSON.parse(xhr.responseText).data
					}
				})
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

	setTime(e) {
		let pos = (e.pageX / this.state.controls.offsetWidth);
		this.setState(()=> {
			return {
				time: pos * 100
			}
		})

		this.state.audio.currentTime = this.state.audio.duration * pos;
		this.state.audio.play();
	}

	play() {
		if(this.state.isPlay) {
			this.state.audio.pause()
		} else {
			this.state.audio.play()
		}
	}

	prev() {
		this.setState(()=> {
			return {
				track: (this.state.track > 1) ? this.state.track - 1 : this.state.music.length - 1
			}
		})
	}

	next() {
		this.setState(()=> {
			return {
				track: (this.state.track < this.state.music.length - 1) ? this.state.track + 1 : 0
			}
		})
	}

	changeVolume(e) {
		let el = e.target;
		if(e.target.id != "volume-level") {
			el = e.target.parentNode;
		}

		let volume = (100 - (e.clientY - el.offsetTop - 6)) / 100;

		this.setState(()=> {
			this.state.audio.volume = volume;
			return {
				volume: volume
			}
		})
	}

	getCurrentTime() {
		let min = Math.round(this.state.audio.currentTime / 60);
		let sec = Math.round(this.state.audio.currentTime % 60);

		sec = sec < 10 ? '0' + sec : sec;

		return min + ':' + sec;
	}


	changeVolumeStart(e) {
		this.changeVolume(e);
		const pos = e.clientY;

		this.setState(()=> {
			return {
				volume_start: pos,
				isVolumeChange: true
			}
		}) // wtf?

		e.preventDefault();

	}

	changeVolumeMove(e) {
		if(this.state.isVolumeChange) {
			const vol = this.state.volume + (this.state.volume_start - e.clientY) / 100;
			const pos = e.clientY;

			if(vol >= 0 && vol <= 1) {
				this.setState(()=> {
					this.state.audio.volume = vol;
					return {
						volume_start: pos,
						volume: vol
					}
				})
			}
		}
	}

	changeVolumeStop(e) {
		this.setState(()=> {
			return {
				isVolumeChange: false
			}
		})
	}

	disableSelect(e) {
		e.preventDefault()
	}


	render() {
		let pauseClass = this.state.isPlay ? "btn pause" : "btn";
		let track = this.state.music.length > 0 ? this.state.music[this.state.track].url : '';


		return (
			<div>
				{/*<AppBar
				  title="Player"
				  iconClassNameRight="muidocs-icon-navigation-expand-more" />*/}

				
				<div id="track-list">
					{this.state.music.map((t, i)=> {
						let selectedClass = (i === this.state.track) ? "track current_selected" : "track";
						let selectTrack = () => {
							this.setState(()=> {
							  	return {
							  		track: i
							  	}
							})
						};

						return (
							<div key={i} className={selectedClass} onClick={selectTrack}>
								<div className="title">{t.title}</div>
								<div className="body">{t.artist}</div>
							</div>
						);
					})}
				</div>


				<div id="player">
					<div id="player-timeline" onClick={this.setTime.bind(this)}>
						<div id="player-time" style={{width: this.state.time + '%' }}>
							<div id="current-time" onMouseDown={this.disableSelect}>
								{this.getCurrentTime()}
							</div>
						</div>
					</div>

					<div id="player-controls">
						<audio id="audio" src={track}></audio>
						<span id="prev" className="btn" onClick={this.prev.bind(this)}></span>
						<span id="play" className={pauseClass} onClick={this.play.bind(this)}></span>
						<span id="next" className="btn" onClick={this.next.bind(this)}></span>

						{	this.state.music.length === 0 ||
							(<span id="player-text">
								{this.state.music[this.state.track].artist} - {this.state.music[this.state.track].title}
							</span>)
						}

						<span className="btn" id="volume" onMouseLeave={this.changeVolumeStop.bind(this)}>
							<span id="volume-level" 
								onClick={this.changeVolume.bind(this)} 
								onMouseDown={this.changeVolumeStart.bind(this)}
								onMouseUp={this.changeVolumeStop.bind(this)}
								onMouseMove={this.changeVolumeMove.bind(this)}
							>
								<div style={{height: (100 - this.state.volume * 100) + 'px'}} className="spliter spliter-background"></div>
								<div style={{height: (this.state.volume * 100) + 'px'}} className="spliter"></div>
							</span>
						</span>
						
					</div>
				</div>
			</div>
		);
	}
}


/*Element.childContextTypes = {
    muiTheme: React.PropTypes.object
};*/

React.render(<Element/>, document.getElementById('root'));