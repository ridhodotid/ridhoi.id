window.CONTENT = window.CONTENT || {};

CONTENT.writing = {
    title: 'TULISAN',
    render() {
        const articles = [
            {
                num: '01',
                image: 'assets/horeg-akar-rumput.jpg',
                title: 'FENOMENA SOUND HOREG YANG VIRAL DI JAWA TIMUR',
                date: '2024',
                category: 'BUDAYA POPULER',
                excerpt: 'Narasumber di YouTube Akar Rumput Mojok.co membahas tren sound horeg super keras di kalangan muda Jatim.',
                link: 'https://www.youtube.com/watch?v=09ZHUEn--aY',
            },
            {
                num: '02',
                image: 'assets/wibu-akar-rumput.jpg',
                title: 'MEMBONGKAR STIGMA WIBU DI KALANGAN ANAK MUDA',
                date: '2024',
                category: 'POP CULTURE',
                excerpt: 'Narasumber di YouTube Akar Rumput Mojok.co mendiskusikan stereotip negatif komunitas penggemar anime/manga.',
                link: 'https://www.youtube.com/watch?v=ZxskZ6gYAwE',
            },
            {
                num: '03',
                image: 'assets/artikel-nasi-becek.jpg',
                title: 'NASI BECEK NGANJUK: KULINER KHAS YANG MENGGODA SELERA',
                date: '2024',
                category: 'KULINER',
                excerpt: 'Liputan mendalam tentang sejarah dan rasa soto bersantan gurih manis berpadu irisan kambing khas Nganjuk.',
                link: '#',
            },
            {
                num: '04',
                image: 'assets/artikel-bendoasri.jpg',
                title: 'MENELUSURI POTENSI AGROWISATA DI DESA BENDOASRI',
                date: '2024',
                category: 'SOSIAL',
                excerpt: 'Investigasi langsung dinamika masyarakat Bendoasri serta peluang agrowisata berbasis kelokalan desa.',
                link: '#',
            },
            {
                num: '05',
                image: 'assets/artikel-wibu.jpg',
                title: 'MASA DEPAN LITERASI KREATIF DI ERA KECERDASAN BUATAN',
                date: '2024',
                category: 'LITERASI',
                excerpt: 'Kajian orisinalitas karya tulis fiksi dan nonfiksi serta bagaimana penulis memanfaatkannya secara etis.',
                link: '#',
            },
        ];

        return `<div class="writing-list content-enter">
            ${articles.map(a => `
            <a href="${a.link}" class="writing-item" ${a.link !== '#' ? 'target="_blank" rel="noopener"' : ''} data-link="${a.link}" tabindex="0" aria-label="${a.title}">
                <span class="writing-num">${a.num}</span>
                <div class="writing-thumb" style="background: url('${a.image}') no-repeat center / cover; width: 64px; height: 48px; border: 2px solid var(--color-border-dim); flex-shrink: 0;"></div>
                <div class="writing-info">
                    <div class="writing-title">${a.title}</div>
                    <div class="writing-meta">
                        <span class="writing-date">${a.date}</span>
                        <span class="writing-category">${a.category}</span>
                    </div>
                    <p class="writing-excerpt">${a.excerpt}</p>
                </div>
                <span class="writing-arrow">▶</span>
            </a>`).join('')}
        </div>`;
    },
    onMount() {
        const items = document.querySelectorAll('.writing-item');
        items.forEach((item) => {
            const link = item.getAttribute('data-link');
            if (link === '#') {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (typeof Audio !== 'undefined' && Audio.playError) Audio.playError();
                    
                    const title = item.querySelector('.writing-title').textContent;
                    const overlay = document.createElement('div');
                    overlay.className = 'modal-overlay';
                    overlay.style.zIndex = '999999';
                    overlay.innerHTML = `
                        <div class="pixel-box modal-content sub-modal" style="text-align: center; padding: 24px; max-width: 320px;">
                            <h3 class="modal-title">◄ SYSTEM MESSAGE ◄</h3>
                            <p class="body-text" style="margin-bottom: 20px; color: var(--color-yellow); font-size: 14px; line-height: 1.4;">
                                "${title}"
                            </p>
                            <p class="body-text" style="margin-bottom: 24px; font-size: 14px;">
                                Maaf, tulisan ini belum dirilis. Silakan kembali lagi nanti!
                            </p>
                            <button type="button" class="btn-choice btn-save" id="btn-coming-ok" style="margin-top: 10px; width: 100%;">OK</button>
                        </div>
                    `;
                    document.body.appendChild(overlay);

                    const btn = overlay.querySelector('#btn-coming-ok');
                    btn.focus();

                    const close = () => {
                        if (typeof Audio !== 'undefined' && Audio.playConfirm) Audio.playConfirm();
                        overlay.remove();
                        item.focus();
                    };

                    btn.addEventListener('click', close);
                    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
                    overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); close(); } });
                });
            }
        });
    }
};
