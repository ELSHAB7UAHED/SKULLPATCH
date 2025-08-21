(() => {
	'use strict';

	// Helpers
	const $ = (sel, ctx = document) => ctx.querySelector(sel);
	const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

	const root = document.body;
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

	// Theme handling
	function applyTheme(theme) {
		root.classList.remove('theme-dark', 'theme-light');
		root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
		try { localStorage.setItem('theme', theme); } catch {}
	}

	function initTheme() {
		let theme = 'dark';
		try {
			const saved = localStorage.getItem('theme');
			if (saved === 'light' || saved === 'dark') theme = saved;
			else if (prefersDark && prefersDark.matches) theme = 'dark';
			else theme = 'light';
		} catch {}
		applyTheme(theme);
	}

	// Fullscreen toggle
	async function toggleFullscreen() {
		const doc = document;
		try {
			if (!doc.fullscreenElement) {
				await (doc.documentElement.requestFullscreen?.call(doc.documentElement));
			} else {
				await (doc.exitFullscreen?.call(doc));
			}
		} catch (e) {
			console.error('Fullscreen error', e);
		}
	}

	// Scroll progress
	function updateProgress() {
		const doc = document.documentElement;
		const scrollTop = doc.scrollTop || document.body.scrollTop;
		const height = doc.scrollHeight - doc.clientHeight;
		const progress = height ? (scrollTop / height) * 100 : 0;
		$('.progress .bar').style.width = progress + '%';
	}

	// Scrollspy active link
	function updateActiveNav() {
		const sections = ['home', 'about', 'skills', 'projects', 'contact'];
		let current = 'home';
		for (const id of sections) {
			const el = document.getElementById(id);
			if (!el) continue;
			const rect = el.getBoundingClientRect();
			if (rect.top <= 120 && rect.bottom >= 120) { current = id; break; }
		}
		$$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
	}

	// Back to top visibility
	function updateToTop() {
		const btn = $('#to-top');
		if (!btn) return;
		btn.classList.toggle('show', window.scrollY > 400);
	}

	function smoothScrollLinks() {
		$$('a[href^="#"]').forEach(a => {
			a.addEventListener('click', e => {
				const href = a.getAttribute('href');
				if (!href || href.length <= 1) return;
				e.preventDefault();
				document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			});
		});
	}

	function initMobileNav() {
		const toggle = $('.nav-toggle');
		const menu = $('#nav-menu');
		if (!toggle || !menu) return;
		toggle.addEventListener('click', () => {
			const open = menu.classList.toggle('open');
			toggle.setAttribute('aria-expanded', String(open));
		});
		menu.addEventListener('click', e => {
			if (e.target instanceof HTMLElement && e.target.tagName === 'A') {
				menu.classList.remove('open');
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	function initYear() {
		const y = $('#year');
		if (y) y.textContent = String(new Date().getFullYear());
	}

	function initServiceWorker() {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js').catch(() => {});
		}
	}

	function initReveal() {
		const revealEls = $$('.reveal');
		if (!('IntersectionObserver' in window) || revealEls.length === 0) {
			revealEls.forEach(el => el.classList.add('visible'));
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });
		revealEls.forEach(el => observer.observe(el));
	}

	// Init
	document.addEventListener('DOMContentLoaded', () => {
		initTheme();
		initMobileNav();
		smoothScrollLinks();
		initReveal();
		initYear();
		initServiceWorker();

		$('#theme-toggle')?.addEventListener('click', () => {
			const isLight = root.classList.contains('theme-light');
			applyTheme(isLight ? 'dark' : 'light');
		});

		$('#fullscreen-toggle')?.addEventListener('click', toggleFullscreen);
		$('#to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

		updateProgress();
		updateActiveNav();
		updateToTop();
	});

	window.addEventListener('scroll', () => {
		updateProgress();
		updateActiveNav();
		updateToTop();
	}, { passive: true });
})();

