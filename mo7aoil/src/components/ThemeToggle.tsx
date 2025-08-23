"use client";
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
		const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		const enableDark = saved ? saved === 'dark' : prefersDark;
		document.documentElement.classList.toggle('dark', enableDark);
		setIsDark(enableDark);
	}, []);

	function toggle() {
		const next = !isDark;
		setIsDark(next);
		document.documentElement.classList.toggle('dark', next);
		localStorage.setItem('theme', next ? 'dark' : 'light');
	}

	return (
		<button onClick={toggle} className="rounded-md border px-3 py-1 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle theme">
			{isDark ? 'سِمة داكنة' : 'سِمة فاتحة'}
		</button>
	);
}