// node-typescript/src/entry.ts
import server from './server/server';
server.listen(3000, () => {
	console.log(`[SERVER] Running at http://localhost:3000`);
});