"use client";
import { useState } from 'react';
import Uploader from '@/components/Uploader';
import DownloadZipButton from '@/components/DownloadZipButton';

const formats = ['png', 'jpg', 'jpeg', 'webp', 'avif'] as const;

type Format = typeof formats[number];

export default function ConvertToolPage() {
	const [files, setFiles] = useState<File[]>([]);
	const [format, setFormat] = useState<Format>('webp');

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
		return { format, files: encoded };
	}

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">تحويل صيغ الصور</h1>
			<Uploader onFiles={setFiles} />
			<div className="card">
				<label className="text-sm">الوجهة
					<select className="mt-1 w-full rounded border p-2" value={format} onChange={(e) => setFormat(e.target.value as Format)}>
						{formats.map((f) => <option key={f} value={f}>{f.toUpperCase()}</option>)}
					</select>
				</label>
			</div>
			{files.length > 0 && (
				<DownloadZipButton endpoint="/api/images/convert" filename={`converted-${format}.zip`} preparePayload={preparePayload} />
			)}
		</div>
	);
}