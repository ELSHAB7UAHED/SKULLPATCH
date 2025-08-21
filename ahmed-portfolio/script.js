(function () {
	'use strict';

	// Theme handling with persistence
	const root = document.documentElement;
	const themeToggle = document.getElementById('themeToggle');
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		root.setAttribute('data-theme', 'dark');
	}
	updateThemeButton();
	
	function updateThemeButton() {
		const isDark = root.getAttribute('data-theme') === 'dark';
		themeToggle?.setAttribute('aria-pressed', String(isDark));
		themeToggle?.classList.toggle('active-dark', isDark);
	}

	themeToggle?.addEventListener('click', () => {
		const isDark = root.getAttribute('data-theme') === 'dark';
		if (isDark) {
			root.removeAttribute('data-theme');
			localStorage.setItem('theme', 'light');
		} else {
			root.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		}
		updateThemeButton();
	});

	// Fullscreen toggle
	const fsBtn = document.getElementById('fullscreenToggle');
	function isFullscreen() {
		return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
	}
	function requestFS(elem) {
		if (elem.requestFullscreen) return elem.requestFullscreen();
		if (elem.webkitRequestFullscreen) return elem.webkitRequestFullscreen();
		if (elem.mozRequestFullScreen) return elem.mozRequestFullScreen();
	}
	function exitFS() {
		if (document.exitFullscreen) return document.exitFullscreen();
		if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
		if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
	}
	fsBtn?.addEventListener('click', () => {
		if (isFullscreen()) {
			exitFS();
		} else {
			requestFS(document.documentElement);
		}
	});

	// Mobile menu
	const menuBtn = document.getElementById('menuToggle');
	const navLinks = document.querySelector('.nav-links');
	menuBtn?.addEventListener('click', () => {
		navLinks?.classList.toggle('open');
	});
	// Close on link click (mobile)
	navLinks?.addEventListener('click', (e) => {
		const target = e.target;
		if (target instanceof HTMLElement && target.tagName.toLowerCase() === 'a') {
			navLinks.classList.remove('open');
		}
	});

	// Smooth scroll and reveal animations
	const animated = document.querySelectorAll('[data-animate]');
	const io = new IntersectionObserver(entries => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				io.unobserve(entry.target);
			}
		}
	}, { threshold: 0.2 });
	animated.forEach(el => io.observe(el));

	// Contact form demo handler
	const form = document.getElementById('contactForm');
	const status = document.querySelector('.form-status');
	form?.addEventListener('submit', async (e) => {
		e.preventDefault();
		const fd = new FormData(form);
		const name = String(fd.get('name') || '').trim();
		const email = String(fd.get('email') || '').trim();
		const message = String(fd.get('message') || '').trim();
		if (!name || !email || !message) {
			status && (status.textContent = 'يرجى ملء جميع الحقول.');
			return;
		}
		try {
			await new Promise(r => setTimeout(r, 800));
			status && (status.textContent = 'تم الإرسال بنجاح! سأعاود التواصل قريباً.');
			form.reset();
		} catch (err) {
			status && (status.textContent = 'حدث خطأ غير متوقع. حاول مرة أخرى.');
		}
	});

	// Dynamic year
	const year = document.getElementById('year');
	year && (year.textContent = String(new Date().getFullYear()));

	// Canvas background - subtle particles
	const canvas = document.getElementById('bg-canvas');
	if (canvas instanceof HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');
		let width = canvas.width = canvas.offsetWidth;
		let height = canvas.height = canvas.offsetHeight;
		let rafId = 0;
		const particles = Array.from({ length: 80 }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			r: Math.random() * 1.6 + 0.4,
			sx: (Math.random() - 0.5) * 0.6,
			sy: (Math.random() - 0.5) * 0.6,
			alpha: Math.random() * 0.8 + 0.2
		}));

		function resize() {
			width = canvas.width = canvas.offsetWidth;
			height = canvas.height = canvas.offsetHeight;
		}
		window.addEventListener('resize', resize);

		function step() {
			if (!ctx) { rafId = requestAnimationFrame(step); return; }
			ctx.clearRect(0, 0, width, height);
			for (const p of particles) {
				p.x += p.sx; p.y += p.sy;
				if (p.x < -10) p.x = width + 10; if (p.x > width + 10) p.x = -10;
				if (p.y < -10) p.y = height + 10; if (p.y > height + 10) p.y = -10;
				ctx.globalAlpha = p.alpha;
				ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#22d3ee';
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fill();
			}
			rafId = requestAnimationFrame(step);
		}
		step();
	}
})();

