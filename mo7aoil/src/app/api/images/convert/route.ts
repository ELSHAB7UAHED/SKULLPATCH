import { NextRequest } from 'next/server';
import { parseDataUrl, zipBuffers, Base64Image, readImage, zipResponse } from '../utils';
import type { OutputFormat } from '@/app/tools/convert/types';

export async function POST(req: NextRequest) {
	try {
		const { format, files = [] } = (await req.json()) as { format: OutputFormat; files: Base64Image[] };
		const outputs = await Promise.all(files.map(async (f) => {
			const { buffer } = parseDataUrl(f.dataUrl);
			let sharp = await readImage(buffer);
			let converted: Buffer;
			switch (format) {
				case 'png': converted = await sharp.png().toBuffer(); break;
				case 'jpg':
				case 'jpeg': converted = await sharp.jpeg({ mozjpeg: true }).toBuffer(); break;
				case 'webp': converted = await sharp.webp({ quality: 90 }).toBuffer(); break;
				case 'avif': converted = await sharp.avif({ quality: 60 }).toBuffer(); break;
				default: converted = await sharp.toBuffer();
			}
			const outName = f.name.replace(/\.[^.]+$/, '') + `.${format === 'jpeg' ? 'jpg' : format}`;
			return { name: outName, buffer: converted };
		}));
		const zip = await zipBuffers(outputs);
		return zipResponse(zip, 'converted.zip');
	} catch (e: any) {
		return new Response(JSON.stringify({ error: e.message || 'Processing error' }), { status: 400 });
	}
}