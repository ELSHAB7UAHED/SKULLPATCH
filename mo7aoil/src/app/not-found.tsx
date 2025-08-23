import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="text-center space-y-4">
			<h1 className="text-4xl font-extrabold">الصفحة غير موجودة</h1>
			<p className="text-slate-600 dark:text-slate-300">ربما تم نقل الصفحة أو حذفها.</p>
			<Link className="btn" href="/">العودة للصفحة الرئيسية</Link>
		</div>
	);
}