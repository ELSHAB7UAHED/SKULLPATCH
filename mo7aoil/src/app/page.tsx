import Link from 'next/link';

export default function HomePage() {
	const tools = [
		{ href: '/tools/compress', title: 'ضغط الصور', desc: 'تقليل حجم الصور مع الحفاظ على الجودة' },
		{ href: '/tools/resize', title: 'تغيير الحجم', desc: 'تحديد أبعاد مخصصة للصور دفعة واحدة' },
		{ href: '/tools/convert', title: 'تحويل الصيغ', desc: 'التحويل بين PNG, JPG, WEBP, AVIF وغيرها' },
		{ href: '/tools/crop', title: 'قص الصور', desc: 'قص الصور بنسب جاهزة أو مخصصة' },
		{ href: '/tools/rotate', title: 'تدوير الصور', desc: 'تدوير، قلب أفقي/عمودي' },
		{ href: '/tools/watermark', title: 'علامة مائية', desc: 'نص أو صورة كعلامة مائية قابلة للتخصيص' }
	];

	return (
		<div className="space-y-12">
			<section className="text-center">
				<h1 className="mx-auto max-w-3xl text-balance text-4xl font-extrabold leading-tight sm:text-6xl">
					أدوات صور احترافية وعصرية للغاية — mo7aoil
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
					عالج صورك بذكاء وسرعة: ضغط، تغيير حجم، تحويل صيغ، قص، تدوير، وإضافة علامة مائية بدقة عالية.
				</p>
				<div className="mt-8 flex items-center justify-center gap-4">
					<Link href="/tools/compress" className="btn">ابدأ الآن</Link>
					<a href="#tools" className="btn bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900">تصفح الأدوات</a>
				</div>
			</section>

			<section id="tools" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{tools.map((tool) => (
					<Link key={tool.href} href={tool.href} className="card group">
						<div className="flex items-start justify-between">
							<h3 className="text-xl font-bold">{tool.title}</h3>
							<span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">احترافي</span>
						</div>
						<p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.desc}</p>
						<p className="mt-4 text-sm font-semibold text-brand group-hover:underline">ابدأ</p>
					</Link>
				))}
			</section>
		</div>
	);
}