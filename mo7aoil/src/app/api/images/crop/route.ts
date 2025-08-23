import { NextRequest } from 'next/server';
import { parseDataUrl, zipBuffers, Base64Image, readImage, zipResponse } from '../utils';

export async function POST(req: NextRequest) {
	try {
		const { width, height, files = [] } = (await req.json()) as { width?: number; height?: number; files: Base64Image[] };
		const w = width || 512;
		const h = height || 512;
		const outputs = await Promise.all(files.map(async (f) => {
			const { buffer } = parseDataUrl(f.dataUrl);
			const sharp = await readImage(buffer);
			const cropped = await sharp.resize({ width: w, height: h, fit: 'cover' }).toBuffer();
			return { name: f.name, buffer: cropped };
		}));
		const zip = await zipBuffers(outputs);
		return zipResponse(zip, 'cropped.zip');
	} catch (e: any) {
		return new Response(JSON.stringify({ error: e.message || 'Processing error' }), { status: 400 });
	}
}