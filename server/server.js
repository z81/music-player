import express from 'express';
import glob from 'glob';
import id3 from 'id3js';
import path from 'path';
import musicmetadata from 'musicmetadata';
import fs from 'fs';

let musicFolder = "E:/music/new/";
let app = express();

app.use(express.static('public'));
app.use(express.static(musicFolder));


app.get('/list', (req, res) => {

	glob("**", {cwd: musicFolder}, (er, files) => {
		let data = [];
		let music = [];


		files.map((f, i)=> {
			if(path.extname(f) == '.mp3') {
				data.push(f);
			}
		});

		data.map((f, i)=> {
			var parser = musicmetadata(fs.createReadStream(musicFolder + f), (err, metadata) => {
				let track = {
					artist: metadata.artist.length > 0 ? metadata.artist[0] : path.basename(f).split('-')[1],
					title: metadata.title ? metadata.title : path.basename(f).split('-')[0],
					url: f
				};
				//metadata.artist = metadata.artist ? metadata.artist : path.basename(f).split('-')[1];
				//metadata.title = metadata.title ? metadata.title : path.basename(f).split('-')[0];
				//metadata.url = f;

				music.push(track);

				if(i === data.length - 1) {
					res.send({data: music})
				}
			});
		})
	})
})




let server = app.listen(80, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});