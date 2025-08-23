"use client";
import { useState } from 'react';
import Uploader from '@/components/Uploader';
import DownloadZipButton from '@/components/DownloadZipButton';

export default function CompressToolPage() {
	const [files, setFiles] = useState<File[]>([]);
	const [quality, setQuality] = useState(80);

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
		return { quality, files: encoded };
	}

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">ضغط الصور</h1>
			<Uploader onFiles={setFiles} />
			<div className="card">
				<label className="block text-sm">الجودة: {quality}%</label>
				<input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} />
			</div>
			{files.length > 0 && (
				<DownloadZipButton endpoint="/api/images/compress" filename="compressed.zip" preparePayload={preparePayload} />
			)}
			<p className="text-xs text-slate-500">ملاحظة: يتم المعالجة على الخادم بعد الإرسال.</p>
		</div>
	);
}