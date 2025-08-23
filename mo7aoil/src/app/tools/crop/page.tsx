"use client";
import { useState } from 'react';
import Uploader from '@/components/Uploader';
import DownloadZipButton from '@/components/DownloadZipButton';

export default function CropToolPage() {
	const [files, setFiles] = useState<File[]>([]);
	const [width, setWidth] = useState<number | ''>('');
	const [height, setHeight] = useState<number | ''>('');

	function fileToDataUrl(file: File): Promise<{ name: string; dataUrl: string }> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve({ name: file.name, dataUrl: reader.result as string });
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	async function preparePayload() {
		const encoded = await Promise.all(files.map(fileToDataUrl));
		return { width: width || undefined, height: height || undefined, files: encoded };
	}

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">قص الصور</h1>
			<Uploader onFiles={setFiles} />
			<div className="card grid grid-cols-2 gap-4">
				<label className="text-sm">العرض
					<input className="mt-1 w-full rounded border p-2" type="number" placeholder="px" value={width} onChange={(e) => setWidth(e.target.value ? parseInt(e.target.value) : '')} />
				</label>
				<label className="text-sm">الارتفاع
					<input className="mt-1 w-full rounded border p-2" type="number" placeholder="px" value={height} onChange={(e) => setHeight(e.target.value ? parseInt(e.target.value) : '')} />
				</label>
			</div>
			{files.length > 0 && (
				<DownloadZipButton endpoint="/api/images/crop" filename="cropped.zip" preparePayload={preparePayload} />
			)}
		</div>
	);
}