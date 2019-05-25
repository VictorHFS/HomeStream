import { Request, Response } from 'express';
import VideoStreamController from '../video-stream/video-stream-controller';

const vsController = new VideoStreamController()

export default class ServerController {
	async get(req: Request, res: Response) {
		const { range } = req.headers;
		const movieName = 'movies/test.mp4';
		vsController.streamVideo(res, movieName, range);
	}

	async findMovie(req: Request, res: Response) {
		const { name } = req.params;
		const movieName = `movies/${name}`;
		const { range } = req.headers;
		vsController.streamVideo(res, movieName, range);
	}
}
