import { Response } from 'express';
import { stat, createReadStream } from 'fs';
import { promisify } from 'util';

const fileInfo = promisify(stat);

export default class VideoStreamController {

	streamVideo(res: Response, search: string, range: string |undefined) {
		this.findMovie(search,
			(err: Error) => console.log(err.message),
			async (path: string) => {
				const { size } = await fileInfo(path);
				if (range) {
					let [startStr, endStr] = range.replace(/bytes=/, '').split('-');
					let start = parseInt(startStr, 10);
					let end = endStr && endStr.length > 0 ? parseInt(endStr, 10) : size - 1;
					res.writeHead(206, {
						'Content-Range': `bytes ${start}-${end}/${size}`,
						'Accept-Range': 'bytes',
						'Content-Length': (end - start) + 1,
						'Content-Type': 'video/mp4'
					})
					createReadStream(path, { start, end }).pipe(res);
				} else {
					res.writeHead(200, {
						'Content-Length': size,
						'Content-Type': 'video/mp4'
					})
					createReadStream(path).pipe(res);
				}

			});

	}


	async findMovie(search: string, onError: Function, onSuccess: Function) {
		const keywords = search.split(/[ ]|-/);
		let pathList: Array<string> = ['movies'];
		keywords.forEach(keyword => {
			pathList.push(keyword);
			stat(pathList.join('/'), (_, stats) => {
				if (stats && stats.isFile()) {
					onSuccess(pathList.join('/'));
				}
				onError(new Error('Movie not found!'));
			})
		});
	}
}

export interface Path {
	path: string;
	error: Error| undefined;
}