import { NextRequest } from 'next/server';
import { parseDataUrl, zipBuffers, Base64Image, readImage, zipResponse } from '../utils';

export async function POST(req: NextRequest) {
	try {
		const { width, height, fit = 'cover', files = [] } = (await req.json()) as { width?: number; height?: number; fit?: 'cover' | 'contain' | 'inside' | 'outside' | 'fill'; files: Base64Image[] };
		const outputs = await Promise.all(files.map(async (f) => {
			const { buffer } = parseDataUrl(f.dataUrl);
			const sharp = await readImage(buffer);
			const resized = await sharp.resize({ width, height, fit }).toBuffer();
			return { name: f.name, buffer: resized };
		}));
		const zip = await zipBuffers(outputs);
		return zipResponse(zip, 'resized.zip');
	} catch (e: any) {
		return new Response(JSON.stringify({ error: e.message || 'Processing error' }), { status: 400 });
	}
}