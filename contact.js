window.CONTENT = window.CONTENT || {};

CONTENT.contact = {
    title: 'KONTAK',
    render() {
        return `
        <div class="contact-layout content-enter">
            <div>
                <div class="quest-box">
                    <span class="quest-box-label">◄ QUEST: HUBUNGI RIDHOI ►</span>
                    <p class="body-text" style="margin-top:8px;margin-bottom:0">
                        Punya proyek menarik? Ingin berkolaborasi? Atau sekadar ingin ngobrol soal literasi, kepenulisan, dan web dev?
                        Kirim pesan dan saya akan membalasnya secepatnya.
                    </p>
                </div>

                <form class="contact-form" id="contact-form" novalidate>
                    <div class="form-group">
                        <label class="form-label" for="form-name">// NAMA</label>
                        <input class="form-input" id="form-name" type="text" placeholder="Masukkan nama..." autocomplete="name" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="form-email">// EMAIL</label>
                        <input class="form-input" id="form-email" type="email" placeholder="email@domain.com" autocomplete="email" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="form-subject">// SUBJEK</label>
                        <input class="form-input" id="form-subject" type="text" placeholder="Tentang apa ini?" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="form-message">// PESAN</label>
                        <textarea class="form-textarea" id="form-message" placeholder="Tulis pesanmu di sini..."></textarea>
                    </div>
                    <button class="btn-submit" type="submit" id="btn-submit">▶ KIRIM PESAN</button>
                    <div class="form-message" id="form-message-status" role="alert"></div>
                </form>
            </div>

            <div>
                <h2 class="section-heading">// FIND ME ON</h2>
                <div class="contact-links">
                    <a href="https://instagram.com/ridhodotid" target="_blank" rel="noopener" class="contact-link-item" aria-label="Instagram">
                        <span class="contact-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style="display:block">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.444-.048-3.298c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                            </svg>
                        </span>
                        <div class="contact-link-label">
                            <span class="contact-link-name">INSTAGRAM</span>
                            <span class="contact-link-url">@ridhodotid</span>
                        </div>
                        <span class="contact-link-arrow">▶</span>
                    </a>
                    <a href="https://www.linkedin.com/in/muhammad-ridhoi/" target="_blank" rel="noopener" class="contact-link-item" aria-label="LinkedIn">
                        <span class="contact-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style="display:block">
                                <path d="M15 0H1C.448 0 0 .448 0 1v14c0 .552.448 1 1 1h14c.552 0 1-.448 1-1V1c0-.552-.448-1-1-1zM5.042 13.529H2.825V6.621h2.217v6.908zM3.933 5.674c-.71 0-1.286-.576-1.286-1.286S3.223 3.1 3.933 3.1s1.286.576 1.286 1.288c0 .71-.576 1.286-1.286 1.286zm9.596 7.855h-2.217V9.75c0-.901-.018-2.061-1.256-2.061-1.258 0-1.451.983-1.451 1.996v3.844H6.388V6.621h2.128v.942h.03c.296-.561 1.02-1.152 2.1-.152 2.186 0 2.556 1.439 2.556 3.308v3.81z"/>
                            </svg>
                        </span>
                        <div class="contact-link-label">
                            <span class="contact-link-name">LINKEDIN</span>
                            <span class="contact-link-url">Muhammad Ridhoi</span>
                        </div>
                        <span class="contact-link-arrow">▶</span>
                    </a>
                    <a href="mailto:muh@ridhoi.id" class="contact-link-item" aria-label="Email langsung">
                        <span class="contact-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style="display:block">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                            </svg>
                        </span>
                        <div class="contact-link-label">
                            <span class="contact-link-name">EMAIL LANGSUNG</span>
                            <span class="contact-link-url">muh@ridhoi.id</span>
                        </div>
                        <span class="contact-link-arrow">▶</span>
                    </a>
                </div>

                <div class="quest-box" style="margin-top:var(--gap-xl); border-color: var(--color-green);">
                    <span class="quest-box-label" style="color:var(--color-green); background:var(--bg-primary);">◄ STATUS ►</span>
                    <p class="body-text" style="margin-top:8px;margin-bottom:0;color:var(--color-green)">
                        <span class="retro-blink">●</span> AVAILABLE FOR FREELANCE &amp; COLLAB
                    </p>
                </div>
            </div>
        </div>`;
    },
    onMount() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name    = document.getElementById('form-name').value.trim();
            const email   = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();
            const status  = document.getElementById('form-message-status');

            status.className = 'form-message';
            status.style.display = 'none';

            if (!name || !email || !subject || !message) {
                if (typeof Audio !== 'undefined' && Audio.playError) Audio.playError();
                status.textContent = '❌ ERROR: SEMUA KOLOM HARUS DIISI!';
                status.className = 'form-message error';
                return;
            }

            // Simple email pattern check
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (typeof Audio !== 'undefined' && Audio.playError) Audio.playError();
                status.textContent = '❌ ERROR: EMAIL TIDAK VALID!';
                status.className = 'form-message error';
                return;
            }

            const btn = document.getElementById('btn-submit');
            btn.disabled = true;
            btn.textContent = 'MENGIRIM...';

            // Simulate RPG save/send sequence
            if (typeof Audio !== 'undefined' && Audio.playConfirm) Audio.playConfirm();
            setTimeout(() => {
                if (typeof Audio !== 'undefined' && Audio.playSuccess) Audio.playSuccess();
                status.textContent = '✔ QUEST BERHASIL: PESAN TELAH DIKIRIM!';
                status.className = 'form-message success';
                form.reset();
                setTimeout(() => { btn.disabled = false; btn.textContent = '▶ KIRIM PESAN'; }, 3000);
            }, 1200);
        });
    }
};
