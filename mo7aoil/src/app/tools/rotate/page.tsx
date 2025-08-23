"use client";
import { useState } from 'react';
import Uploader from '@/components/Uploader';
import DownloadZipButton from '@/components/DownloadZipButton';

export default function RotateToolPage() {
	const [files, setFiles] = useState<File[]>([]);
	const [angle, setAngle] = useState(90);
	const [flipH, setFlipH] = useState(false);
	const [flipV, setFlipV] = useState(false);

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
		return { angle, flipH, flipV, files: encoded };
	}

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">تدوير الصور</h1>
			<Uploader onFiles={setFiles} />
			<div className="card grid grid-cols-3 gap-4">
				<label className="text-sm col-span-3">الزاوية
					<input className="mt-1 w-full" type="range" min={-180} max={180} value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} />
				</label>
				<label className="text-sm flex items-center gap-2"><input type="checkbox" checked={flipH} onChange={(e) => setFlipH(e.target.checked)} />قلب أفقي</label>
				<label className="text-sm flex items-center gap-2"><input type="checkbox" checked={flipV} onChange={(e) => setFlipV(e.target.checked)} />قلب عمودي</label>
			</div>
			{files.length > 0 && (
				<DownloadZipButton endpoint="/api/images/rotate" filename="rotated.zip" preparePayload={preparePayload} />
			)}
		</div>
	);
}