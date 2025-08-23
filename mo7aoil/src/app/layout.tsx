import '@/styles/globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
	title: 'mo7aoil | أدوات صور احترافية',
	description: 'منصة قوية وعصرية لمعالجة الصور بسهولة واحترافية',
	metadataBase: new URL('https://mo7aoil.local'),
	openGraph: {
		title: 'mo7aoil',
		description: 'أقوى منصة لأدوات الصور على الويب',
		type: 'website'
	},
	alternates: { canonical: '/' },
	icons: [
		{ rel: 'icon', url: '/favicon.ico' }
	]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ar" dir="rtl" suppressHydrationWarning>
			<body className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
				<header className="border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/50">
					<div className="container flex items-center justify-between py-4">
						<Link href="/" className="text-2xl font-extrabold tracking-tight">
							<span className="text-brand">mo7aoil</span>
						</Link>
						<nav className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
							<Link href="/tools/compress">ضغط الصور</Link>
							<Link href="/tools/resize">تغيير الحجم</Link>
							<Link href="/tools/convert">تحويل الصيغ</Link>
							<Link href="/tools/crop">قص</Link>
							<Link href="/tools/rotate">تدوير</Link>
							<Link href="/tools/watermark">علامة مائية</Link>
						</nav>
						<ThemeToggle />
					</div>
				</header>
				<main className="container py-10">{children}</main>
				<footer className="mt-24 border-t border-slate-200/60 py-8 text-center text-sm text-slate-500 dark:border-slate-800/60">
					© {new Date().getFullYear()} mo7aoil — كل الحقوق محفوظة
				</footer>
			</body>
		</html>
	);
}