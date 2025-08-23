"use client";
import { useState } from 'react';
import Uploader from '@/components/Uploader';
import DownloadZipButton from '@/components/DownloadZipButton';

export default function WatermarkToolPage() {
	const [files, setFiles] = useState<File[]>([]);
	const [text, setText] = useState('mo7aoil');
	const [opacity, setOpacity] = useState(0.3);
	const [fontSize, setFontSize] = useState(36);

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
		return { text, opacity, fontSize, files: encoded };
	}

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">علامة مائية</h1>
			<Uploader onFiles={setFiles} />
			<div className="card grid grid-cols-2 gap-4">
				<label className="text-sm col-span-2">النص
					<input className="mt-1 w-full rounded border p-2" value={text} onChange={(e) => setText(e.target.value)} />
				</label>
				<label className="text-sm">الشفافية: {Math.round(opacity * 100)}%
					<input className="mt-1 w-full" type="range" min={0.05} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} />
				</label>
				<label className="text-sm">حجم الخط: {fontSize}px
					<input className="mt-1 w-full" type="range" min={12} max={128} value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
				</label>
			</div>
			{files.length > 0 && (
				<DownloadZipButton endpoint="/api/images/watermark" filename="watermarked.zip" preparePayload={preparePayload} />
			)}
		</div>
	);
}