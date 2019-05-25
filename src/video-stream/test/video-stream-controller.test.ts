import VideoStreamController from '../video-stream-controller';
import { Response } from 'express';
const controller = new VideoStreamController();

test('findMovie', () => {
	controller.findMovie('test',
		(err: Error) => expect(err).not.toBeDefined(),
		(path: string) => expect(path).toBe('movies/test'));
})

test('streamVideo', () => {
	controller.streamVideo(null, 'seach', 'range');
})