import req from "supertest";
import server from "../server";

test("[GET] /", async () => {
	const res = await req(server).get("/")
	expect(res.status).toBe(200);
})

test("[GET](Content-Range) / ", async () => {
	const res = await req(server).get("/")
		.set('Content-Range', 'bytes 0-5623')
		.set('Accept-Range', 'bytes');

	expect(res.status).toBe(200);
})