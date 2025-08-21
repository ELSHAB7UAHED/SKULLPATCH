// Utilities
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

// Theme Toggle with persistence
(function themeInit() {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const saved = localStorage.getItem('theme');
	const startTheme = saved ? saved : (prefersDark ? 'theme-dark' : 'theme-light');
	document.body.classList.remove('theme-dark', 'theme-light');
	document.body.classList.add(startTheme);
	updateThemeMeta(startTheme);
})();

function updateThemeMeta(themeClass) {
	const meta = document.querySelector('meta[name="theme-color"]');
	if (!meta) return;
	meta.setAttribute('content', themeClass === 'theme-dark' ? '#0f1115' : '#ffffff');
}

$('#themeToggle')?.addEventListener('click', () => {
	const isDark = document.body.classList.contains('theme-dark');
	document.body.classList.toggle('theme-dark', !isDark);
	document.body.classList.toggle('theme-light', isDark);
	const themeClass = document.body.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
	localStorage.setItem('theme', themeClass);
	updateThemeMeta(themeClass);
});

// Fullscreen Toggle
$('#fullscreenToggle')?.addEventListener('click', async () => {
	try {
		if (!document.fullscreenElement) {
			await document.documentElement.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
	} catch (e) {
		console.error('Fullscreen error:', e);
	}
});

document.addEventListener('fullscreenchange', () => {
	const btn = $('#fullscreenToggle');
	if (!btn) return;
	btn.textContent = document.fullscreenElement ? '⤡' : '⤢';
	btn.setAttribute('aria-pressed', document.fullscreenElement ? 'true' : 'false');
});

// Mobile nav
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');
navToggle?.addEventListener('click', () => {
	const open = navMenu?.classList.toggle('open');
	navToggle.setAttribute('aria-expanded', String(!!open));
});
$$('#navMenu a').forEach(a => a.addEventListener('click', () => {
	navMenu?.classList.remove('open');
	navToggle?.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal using IntersectionObserver
const revealEls = [];
$$('.section, .project-card, .info-card, .skill, .metric').forEach(el => {
	el.classList.add('reveal-on-scroll');
	revealEls.push(el);
});

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('revealed');
			observer.unobserve(entry.target);
		}
	});
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Animated counters
function animateCounter(el) {
	const target = Number(el.getAttribute('data-target') || '0');
	const duration = 1400;
	const start = performance.now();
	function tick(now) {
		const p = Math.min(1, (now - start) / duration);
		const eased = 1 - Math.pow(1 - p, 3);
		el.textContent = Math.round(eased * target).toString();
		if (p < 1) requestAnimationFrame(tick);
	}
	requestAnimationFrame(tick);
}

$$('.metric .num').forEach(num => animateCounter(num));

// Contact form handler (client-side only demo)
$('#contactForm')?.addEventListener('submit', (e) => {
	e.preventDefault();
	const status = $('#formStatus');
	status.textContent = 'جارٍ الإرسال...';
	setTimeout(() => {
		status.textContent = 'تم الاستلام! سأعاود التواصل قريبًا.';
		($('#contactForm')?.reset());
	}, 700);
});

// Footer year
$('#year').textContent = new Date().getFullYear().toString();