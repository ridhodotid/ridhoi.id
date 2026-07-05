window.CONTENT = window.CONTENT || {};

CONTENT.about = {
    title: 'TENTANG SAYA',
    render() {
        return `
        <div class="about-layout content-enter">
            <div>
                <div class="about-avatar"></div>
                <div class="about-badges" style="margin-top:16px">
                    <span class="badge badge-green">WRITER</span>
                    <span class="badge badge-yellow">EDITOR</span>
                    <span class="badge badge-cyan">WEB DEV</span>
                    <span class="badge badge-purple">S.HUM.</span>
                </div>
            </div>
            
            <div class="about-content-panel">
                <!-- Submenu tabs for About Me -->
                <div class="project-submenu" role="tablist" aria-label="Tentang Saya Info">
                    <button class="submenu-item active" data-tab="status" role="tab" aria-selected="true" tabindex="0">
                        <span class="submenu-cursor">▶</span> STATUS
                    </button>
                    <button class="submenu-item" data-tab="skills" role="tab" aria-selected="false" tabindex="-1">
                        <span class="submenu-cursor">▶</span> SKILL TREE
                    </button>
                    <button class="submenu-item" data-tab="academy" role="tab" aria-selected="false" tabindex="-1">
                        <span class="submenu-cursor">▶</span> ACADEMY
                    </button>
                    <button class="submenu-item" data-tab="quests" role="tab" aria-selected="false" tabindex="-1">
                        <span class="submenu-cursor">▶</span> QUEST LOG
                    </button>
                </div>

                <!-- Tab: STATUS -->
                <div class="about-tab-content" id="tab-status">
                    <h2 class="section-heading">// BIODATA</h2>
                    <p class="body-text">
                        Halo! Saya <span style="color:var(--color-yellow)">Muhammad Ridhoi, S.Hum.</span> — alumni S1 Bahasa dan Sastra Indonesia Universitas Airlangga (UNAIR), Surabaya.
                    </p>
                    <p class="body-text" style="font-style: italic; color: var(--color-shadow); font-size: 15px; margin: 12px 0;">
                        "Kadang ngurir, ngasir, mikir, ngoding, wes kadung."
                    </p>
                    <p class="body-text">
                        Mendalami peminatan linguistik kebahasaan, minat serius dalam kepenulisan kreatif/sastra, manajemen konten media, serta pengembangan web frontend.
                    </p>
                </div>

                <!-- Tab: SKILL TREE -->
                <div class="about-tab-content hidden" id="tab-skills">
                    <h2 class="section-heading">// SKILL TREE</h2>
                    <div class="skills-grid" id="skills-grid">
                        <div class="skill-row">
                            <span class="skill-name">CONTENT WRITING</span>
                            <div class="skill-bar-track"><div class="skill-bar-fill" data-val="90"></div></div>
                            <span class="skill-val">90</span>
                        </div>
                        <div class="skill-row">
                            <span class="skill-name">SEO & COPYWRITING</span>
                            <div class="skill-bar-track"><div class="skill-bar-fill" data-val="85"></div></div>
                            <span class="skill-val">85</span>
                        </div>
                        <div class="skill-row">
                            <span class="skill-name">FRONTEND (REACT)</span>
                            <div class="skill-bar-track"><div class="skill-bar-fill" data-val="75"></div></div>
                            <span class="skill-val">75</span>
                        </div>
                        <div class="skill-row">
                            <span class="skill-name">BACKEND (PHP/PY)</span>
                            <div class="skill-bar-track"><div class="skill-bar-fill" data-val="70"></div></div>
                            <span class="skill-val">70</span>
                        </div>
                        <div class="skill-row">
                            <span class="skill-name">CMS (WORDPRESS)</span>
                            <div class="skill-bar-track"><div class="skill-bar-fill" data-val="85"></div></div>
                            <span class="skill-val">85</span>
                        </div>
                        <div class="skill-row">
                            <span class="skill-name">LINUX & OPENWRT</span>
                            <div class="skill-bar-track"><div class="skill-bar-fill" data-val="80"></div></div>
                            <span class="skill-val">80</span>
                        </div>
                    </div>
                </div>

                <!-- Tab: ACADEMY -->
                <div class="about-tab-content hidden" id="tab-academy">
                    <h2 class="section-heading">// ACADEMY</h2>
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-year">2021 — 2025</div>
                            <div class="timeline-role">S1 Bahasa & Sastra Indonesia</div>
                            <div class="timeline-desc">Universitas Airlangga (UNAIR), Surabaya. Studi tata struktur bahasa, fonologi, morfologi, semantik, pragmatik, dan sosiolinguistik.</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-year">2018 — 2021</div>
                            <div class="timeline-role">Ilmu Bahasa & Budaya</div>
                            <div class="timeline-desc">SMA Negeri 1 Nganjuk. Mulai mendalami kepenulisan kreatif, karya sastra, serta analisis kebahasaan secara mendalam.</div>
                        </div>
                    </div>
                </div>

                <!-- Tab: QUEST LOG -->
                <div class="about-tab-content hidden" id="tab-quests">
                    <h2 class="section-heading">// QUEST LOG</h2>
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-year">2025 — SEKARANG</div>
                            <div class="timeline-role">Social Media & Editor @ Rumah Kretek</div>
                            <div class="timeline-desc">Fokus pada tim kreatif, mengelola media sosial dan penyuntingan konten digital di Yogyakarta.</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-year">2024</div>
                            <div class="timeline-role">Content Writer @ Mojok.co</div>
                            <div class="timeline-desc">Internship/Magang menulis esai, artikel feature menarik, ramah SEO, dan mengasah jurnalistik.</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-year">2021 — 2023</div>
                            <div class="timeline-role">Freelance Ghostwriter</div>
                            <div class="timeline-desc">Menulis artikel, opini, hingga cerpen dan puisi pesanan klien secara independen dan remote.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    },
    onMount() {
        const subitems = document.querySelectorAll('.about-content-panel .submenu-item');
        const contents = document.querySelectorAll('.about-tab-content');

        const triggerSkillsAnimation = () => {
            document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                const val = bar.dataset.val;
                bar.style.width = val + '%';
            });
        };

        subitems.forEach(btn => {
            btn.addEventListener('click', () => {
                if (typeof Audio !== 'undefined' && Audio.playMove) Audio.playMove();

                subitems.forEach(item => {
                    item.classList.remove('active');
                    item.setAttribute('aria-selected', 'false');
                    item.setAttribute('tabindex', '-1');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                btn.setAttribute('tabindex', '0');

                const targetTab = btn.dataset.tab;
                contents.forEach(content => {
                    if (content.id === `tab-${targetTab}`) {
                        content.classList.remove('hidden');
                        if (targetTab === 'skills') {
                            setTimeout(triggerSkillsAnimation, 50);
                        }
                    } else {
                        content.classList.add('hidden');
                    }
                });
            });

            // Keyboard navigation
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
