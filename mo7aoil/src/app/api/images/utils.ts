import Sharp from 'sharp';
import AdmZip from 'adm-zip';

export type Base64Image = {
	name: string;
	dataUrl: string; // data:image/png;base64,....
};

export function parseDataUrl(dataUrl: string): { mime: string; buffer: Buffer } {
	const match = /^data:(.*?);base64,(.*)$/.exec(dataUrl);
	if (!match) throw new Error('Invalid data URL');
	const [, mime, b64] = match;
	return { mime, buffer: Buffer.from(b64, 'base64') };
}

export async function zipBuffers(files: { name: string; buffer: Buffer }[]): Promise<Buffer> {
	const zip = new AdmZip();
	files.forEach((f) => zip.addFile(f.name, f.buffer));
	return zip.toBuffer();
}

export async function readImage(buffer: Buffer) {
	return Sharp(buffer, { animated: true });
}

export function zipResponse(zip: Buffer, filename: string): Response {
	const u8 = new Uint8Array(zip);
	return new Response(u8, {
		headers: {
			'Content-Type': 'application/zip',
			'Content-Disposition': `attachment; filename="${filename}"`
		}
	});
}