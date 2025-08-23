"use client";
import { useState } from 'react';

export interface DownloadJob {
	endpoint: string;
	payload?: any;
	preparePayload?: () => Promise<any>;
	filename?: string;
}

export default function DownloadZipButton({ endpoint, payload, preparePayload, filename = 'mo7aoil.zip' }: DownloadJob) {
	const [loading, setLoading] = useState(false);

	async function handleClick() {
		try {
			setLoading(true);
			const bodyData = preparePayload ? await preparePayload() : payload;
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(bodyData)
			});
			if (!response.ok) throw new Error('فشل في إنشاء الملف المضغوط');
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			a.click();
			URL.revokeObjectURL(url);
		} catch (e) {
			console.error(e);
			alert('حدث خطأ أثناء التحميل');
		} finally {
			setLoading(false);
		}
	}

	return (
		<button className="btn" onClick={handleClick} disabled={loading}>
			{loading ? 'جارٍ التحضير...' : 'تنزيل النتائج'}
		</button>
	);
}