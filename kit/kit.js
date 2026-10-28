// Content kit page: copy buttons, sidebar scroll spy, mobile menu

const clipboardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

document.querySelectorAll('.copy-button').forEach(btn => { btn.innerHTML = clipboardIcon; });

document.addEventListener('click', function (e) {
    const btn = e.target.closest('.copy-button');
    if (!btn) return;
    const source = btn.getAttribute('data-copy-from');
    const el = source ? document.getElementById(source) : null;
    const text = el ? el.innerText.trim() : (btn.getAttribute('data-copy') || '');
    navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = checkIcon;
        btn.classList.add('copy-button--copied');
        clearTimeout(btn._t);
        btn._t = setTimeout(() => {
            btn.innerHTML = clipboardIcon;
            btn.classList.remove('copy-button--copied');
        }, 4000);
    }).catch(err => console.error('Copy failed:', err));
});

const navLinks = document.querySelectorAll('.sidebar-nav a');
const anchorIds = [...new Set([...navLinks].map(a => a.getAttribute('href').substring(1)))];

function updateActiveNav() {
    let current = anchorIds[0];
    anchorIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) current = id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href').substring(1) === current));
}

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.getElementById(this.getAttribute('href').substring(1));
        if (target) { target.scrollIntoView({ behavior: 'smooth' }); closeMobileMenu(); }
    });
});

const mobileTocBtn = document.getElementById('mobileTocBtn');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileTocModal = document.getElementById('mobileTocModal');
function openMobileMenu() { mobileOverlay.classList.add('active'); mobileTocModal.classList.add('active'); }
function closeMobileMenu() { mobileOverlay.classList.remove('active'); mobileTocModal.classList.remove('active'); }
mobileTocBtn.addEventListener('click', openMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();
