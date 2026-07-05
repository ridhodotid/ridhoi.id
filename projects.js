window.CONTENT = window.CONTENT || {};

CONTENT.projects = {
    title: 'PROJECT',
    render() {
        const projects = [
            {
                category: 'developer',
                image: 'assets/website-nyangkem.png',
                title: 'MEDIA ONLINE NYANGKEM.ID',
                desc: 'Media rintisan mahasiswa Surabaya menyuarakan keresahan arek-arek lokal dan perantau. Menyampaikan opini positif.',
                tags: ['Editorial', 'Content Management', 'Digital Media'],
                link: 'https://nyangkem.id/',
                status: 'LIVE',
                statusClass: 'status-live',
            },
            {
                category: 'writer',
                image: 'assets/antologi-puisi.png',
                title: 'BUKU ANTOLOGI PUISI',
                desc: 'Karya sastra kolaboratif mahasiswa Sastra Indonesia UNAIR mengeksplorasi kehidupan & pemikiran mahasiswa kontemporer.',
                tags: ['UNAIR Sastra', 'Pagan Press', 'Published'],
                link: '#',
                status: 'LIVE',
                statusClass: 'status-live',
            },
            {
                category: 'writer',
                image: 'assets/novel.png',
                title: 'NOVEL "SEMUANYA ASUMSIMU"',
                desc: 'Novel solo psikologi fiksi pertama penulis mengeksplorasi hubungan interpersonal dalam dinamika modern. Segera terbit.',
                tags: ['Novel Solo', 'Fiksi & Psikologi', 'Lumpur Press'],
                link: '#',
                status: 'WIP',
                statusClass: 'status-wip',
            },
            {
                category: 'branding',
                image: 'assets/horeg-akar-rumput.jpg',
                title: 'MOJOK.CO YOUTUBE: SOUND HOREG',
                desc: 'Narasumber di YouTube Akar Rumput Mojok.co menganalisis tren sound horeg super keras dan perkembangannya di Jawa Timur.',
                tags: ['Akar Rumput', 'Sound Horeg', 'Pop Culture'],
                link: 'https://www.youtube.com/watch?v=09ZHUEn--aY',
                status: 'PUBLISHED',
                statusClass: 'status-live',
            },
            {
                category: 'branding',
                image: 'assets/wibu-akar-rumput.jpg',
                title: 'MOJOK.CO YOUTUBE: STIGMA WIBU',
                desc: 'Narasumber di YouTube Akar Rumput Mojok.co mendiskusikan stereotip negatif dan stigma terhadap pecinta anime/manga.',
                tags: ['Akar Rumput', 'Wibu Stigma', 'Anime Culture'],
                link: 'https://www.youtube.com/watch?v=ZxskZ6gYAwE',
                status: 'PUBLISHED',
                statusClass: 'status-live',
            }
        ];

        return `
        <div class="projects-layout content-enter">
            <div class="project-submenu" role="tablist" aria-label="Kategori Project">
                <button class="submenu-item active" data-filter="all" role="tab" aria-selected="true" tabindex="0">
                    <span class="submenu-cursor">▶</span> SEMUA
                </button>
                <button class="submenu-item" data-filter="developer" role="tab" aria-selected="false" tabindex="-1">
                    <span class="submenu-cursor">▶</span> DEVELOPER
                </button>
                <button class="submenu-item" data-filter="writer" role="tab" aria-selected="false" tabindex="-1">
                    <span class="submenu-cursor">▶</span> WRITER
                </button>
                <button class="submenu-item" data-filter="branding" role="tab" aria-selected="false" tabindex="-1">
                    <span class="submenu-cursor">▶</span> PERSONAL BRANDING
                </button>
            </div>
            
            <div class="projects-grid">
                ${projects.map(p => `
                <div class="project-card" data-category="${p.category}" tabindex="0" role="article" aria-label="${p.title}">
                    <div class="project-thumb ${p.image ? 'has-image' : ''}" style="${p.image ? `background: url('${p.image}') no-repeat center / cover;` : `--thumb-bg: ${p.color}`}">
                        ${p.image ? '' : `<div class="project-thumb-icon">${p.icon}</div>`}
                        <span class="project-status ${p.statusClass}">${p.status}</span>
                    </div>
                    <div class="project-body">
                        <div class="project-title">${p.title}</div>
                        <p class="project-desc">${p.desc}</p>
                        <div class="project-tags">
                            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                        <a href="${p.link}" class="project-link" target="_blank" rel="noopener">▶ DETAIL</a>
                    </div>
                </div>`).join('')}
            </div>
        </div>`;
    },
    onMount() {
        const subitems = document.querySelectorAll('.submenu-item');
        const cards    = document.querySelectorAll('.project-card');

        subitems.forEach(btn => {
            btn.addEventListener('click', () => {
                // Audio move sound
                if (typeof Audio !== 'undefined' && Audio.playMove) {
                    Audio.playMove();
                }

                subitems.forEach(item => {
                    item.classList.remove('active');
                    item.setAttribute('aria-selected', 'false');
                    item.setAttribute('tabindex', '-1');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                btn.setAttribute('tabindex', '0');

                const filter = btn.dataset.filter;
                cards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });

            // Keyboard navigation for submenus (left/right)
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = btn.nextElementSibling || subitems[0];
                    next.focus();
                    next.click();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = btn.previousElementSibling || subitems[subitems.length - 1];
                    prev.focus();
                    prev.click();
                }
            });
        });
    }
};
