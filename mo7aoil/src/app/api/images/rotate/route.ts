import { NextRequest } from 'next/server';
import { parseDataUrl, zipBuffers, Base64Image, readImage, zipResponse } from '../utils';

export async function POST(req: NextRequest) {
	try {
		const { angle = 90, flipH = false, flipV = false, files = [] } = (await req.json()) as { angle?: number; flipH?: boolean; flipV?: boolean; files: Base64Image[] };
		const outputs = await Promise.all(files.map(async (f) => {
			const { buffer } = parseDataUrl(f.dataUrl);
			let sharp = await readImage(buffer);
			if (flipH || flipV) sharp = sharp.flip(flipV).flop(flipH);
			const rotated = await sharp.rotate(angle).toBuffer();
			return { name: f.name, buffer: rotated };
		}));
		const zip = await zipBuffers(outputs);
		return zipResponse(zip, 'rotated.zip');
	} catch (e: any) {
		return new Response(JSON.stringify({ error: e.message || 'Processing error' }), { status: 400 });
	}
}