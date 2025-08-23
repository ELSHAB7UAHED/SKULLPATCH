import { NextRequest } from 'next/server';
import { parseDataUrl, zipBuffers, Base64Image, readImage, zipResponse } from '../utils';

export async function POST(req: NextRequest) {
	try {
		const { quality = 80, files = [] } = (await req.json()) as { quality: number; files: Base64Image[] };
		const outputs = await Promise.all(files.map(async (f) => {
			const { buffer } = parseDataUrl(f.dataUrl);
			const sharp = await readImage(buffer);
			const compressed = await sharp.jpeg({ quality, mozjpeg: true }).toBuffer();
			const outName = f.name.replace(/\.[^.]+$/, '') + '.jpg';
			return { name: outName, buffer: compressed };
		}));
		const zip = await zipBuffers(outputs);
		return zipResponse(zip, 'compressed.zip');
	} catch (e: any) {
		return new Response(JSON.stringify({ error: e.message || 'Processing error' }), { status: 400 });
	}
}