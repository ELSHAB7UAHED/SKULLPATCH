"use client";
import { useCallback, useRef, useState } from 'react';

export type UploaderFile = {
	file: File;
	id: string;
	previewUrl: string;
};

export interface UploaderProps {
	onFiles: (files: File[]) => void;
	accept?: string;
	multiple?: boolean;
}

export default function Uploader({ onFiles, accept = 'image/*', multiple = true }: UploaderProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [previews, setPreviews] = useState<UploaderFile[]>([]);

	const handleFiles = useCallback((filesList: FileList | null) => {
		if (!filesList) return;
		const files = Array.from(filesList);
		setPreviews((prev) => [
			...prev,
			...files.map((file) => ({
				file,
				id: crypto.randomUUID(),
				previewUrl: URL.createObjectURL(file)
			}))
		]);
		onFiles(files);
	}, [onFiles]);

	return (
		<div>
			<div
				className={`card cursor-pointer border-dashed ${isDragging ? 'border-brand' : 'border-slate-300'} flex flex-col items-center justify-center gap-2 p-8 text-center`}
				onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
				onDragLeave={() => setIsDragging(false)}
				onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
				onClick={() => inputRef.current?.click()}
			>
				<p className="text-sm text-slate-600 dark:text-slate-300">اسحب الصور هنا أو اضغط للاختيار</p>
				<input
					ref={inputRef}
					type="file"
					className="hidden"
					accept={accept}
					multiple={multiple}
					onChange={(e) => handleFiles(e.target.files)}
				/>
			</div>
			{previews.length > 0 && (
				<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
					{previews.map((item) => (
						<div key={item.id} className="overflow-hidden rounded-lg border border-slate-200/60 dark:border-slate-700/60">
							<img src={item.previewUrl} alt="preview" className="h-36 w-full object-cover" />
						</div>
					))}
				</div>
			)}
		</div>
	);
}