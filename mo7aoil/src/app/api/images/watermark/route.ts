import { NextRequest } from 'next/server';
import { parseDataUrl, zipBuffers, Base64Image, readImage, zipResponse } from '../utils';

export async function POST(req: NextRequest) {
	try {
		const { text = 'mo7aoil', opacity = 0.3, fontSize = 36, files = [] } = (await req.json()) as { text?: string; opacity?: number; fontSize?: number; files: Base64Image[] };
		const outputs = await Promise.all(files.map(async (f) => {
			const { buffer } = parseDataUrl(f.dataUrl);
			const input = await readImage(buffer);
			const { width, height } = await input.metadata();
			const w = width || 1200;
			const h = height || 800;
			const svg = Buffer.from(`<?xml version="1.0"?>\n<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>\n<defs><style>@font-face { font-family: system; src: local('Arial'); }</style></defs>\n<text x='50%' y='50%' text-anchor='middle' fill='white' fill-opacity='${opacity}' font-size='${fontSize}' font-family='system' transform='rotate(-20, ${w/2}, ${h/2})'>${text}</text>\n</svg>`);
			const watermarked = await input.composite([{ input: svg, gravity: 'centre' }]).toBuffer();
			return { name: f.name, buffer: watermarked };
		}));
		const zip = await zipBuffers(outputs);
		return zipResponse(zip, 'watermarked.zip');
	} catch (e: any) {
		return new Response(JSON.stringify({ error: e.message || 'Processing error' }), { status: 400 });
	}
}