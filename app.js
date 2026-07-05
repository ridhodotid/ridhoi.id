/* ═══════════════════════════════════════════════════════════
   RIDHOI PORTFOLIO — APP.JS
   State machine, navigation, audio, animations
═══════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────────────────────
// 0. AUDIO ENGINE (Web Audio API — no external files needed)
// ─────────────────────────────────────────────────────────────
const Audio = (() => {
    let ctx = null;
    let enabled = false;
    let bgmNode = null;
    let bgmGain = null;
    let currentTrack = 'whitespace'; // default track

    function init() {
        if (ctx) return;
        ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    function resume() {
        if (ctx && ctx.state === 'suspended') ctx.resume();
    }

    function beep(freq = 440, type = 'square', duration = 0.08, vol = 0.15) {
        if (!enabled || !ctx) return;
        resume();
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    }

    function playConfirm() { beep(660, 'square', 0.1, 0.2); setTimeout(() => beep(880, 'square', 0.12, 0.2), 80); }
    function playBack()    { beep(330, 'square', 0.08, 0.15); setTimeout(() => beep(220, 'square', 0.1, 0.1), 70); }
    function playMove()    { beep(440, 'square', 0.04, 0.08); }
    function playOpen()    { [660, 770, 880].forEach((f, i) => setTimeout(() => beep(f, 'square', 0.08, 0.15), i * 50)); }
    function playError()   { beep(220, 'sawtooth', 0.12, 0.2); }
    function playSuccess() { [660, 770, 880, 1100].forEach((f, i) => setTimeout(() => beep(f, 'square', 0.1, 0.18), i * 60)); }

    let bgmAudio = null;

    function startBGM() {
        if (bgmAudio) {
            bgmAudio.pause();
            bgmAudio = null;
        }

        let file = '';
        if (currentTrack === 'whitespace') {
            file = 'White Space (Omori Original Soundtrack).m4a';
        } else if (currentTrack === 'rebelarmy') {
            file = 'The Rebel Army (Final Fantasy II Original Soundtrack).m4a';
        }

        if (!file) return;

        bgmAudio = new window.Audio(file);
        bgmAudio.loop = true;
        bgmAudio.volume = 0.35;
        bgmAudio.play().catch(e => {
            console.log("Audio autoplay prevented:", e);
        });
    }

    function stopBGM() {
        if (bgmAudio) {
            bgmAudio.pause();
            bgmAudio = null;
        }
    }

    function setEnabled(val) {
        enabled = val;
        if (enabled) {
            init();
            startBGM();
        } else {
            stopBGM();
        }
    }

    function setTrack(trackId) {
        currentTrack = trackId;
        if (enabled) {
            stopBGM();
            startBGM();
        }
    }

    return {
        init,
        playConfirm,
        playBack,
        playMove,
        playOpen,
        playError,
        playSuccess,
        setEnabled,
        setTrack,
        get enabled() { return enabled; },
        get track() { return currentTrack; }
    };
})();


// ─────────────────────────────────────────────────────────────
// 1. STAR CANVAS (loading bg + menu particles)
// ─────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────
// 2. CONTENT DATA
// ─────────────────────────────────────────────────────────────
// CONTENT namespace is defined across separate script files (about.js, projects.js, writing.js, contact.js)
const CONTENT = window.CONTENT || {};

// ─────────────────────────────────────────────────────────────
// 3. STATE MACHINE
// ─────────────────────────────────────────────────────────────
const App = (() => {
    const states = {
        LOADING: 'loading',
        MENU:    'menu',
        CONTENT: 'content',
    };

    let current = states.LOADING;
    let activeSection = null;
    const elMenuContainer = () => document.getElementById('main-menu-container');
    const elMenu          = () => document.getElementById('menu-layout');
    const elContent       = () => document.getElementById('content-window');

    // ── LOADING → MENU ──
    function transitionToMenu() {
        if (current === states.MENU) return;
        current = states.MENU;

        const container = elMenuContainer();
        if (container) {
            container.classList.add('state-menu');
        }

        const mn = elMenu();
        if (mn) {
            mn.classList.remove('hidden');
        }

        setStatusText('PILIH MENU UNTUK MELANJUTKAN...');

        // Auto-focus first item so JRPG selector is visible immediately
        const firstItem = document.getElementById('nav-about');
        if (firstItem) {
            setTimeout(() => {
                firstItem.focus();
            }, 100);
        }
    }

    // ── MENU → CONTENT ──
    function transitionToContent(sectionKey) {
        if (current === states.CONTENT) return;
        current = states.CONTENT;
        activeSection = sectionKey;

        const section = CONTENT[sectionKey];
        if (!section) return;

        Audio.playOpen();

        // Update content
        document.getElementById('content-title-text').textContent = section.title;

        const pane = document.getElementById('content-pane');
        pane.innerHTML = section.render();

        // Show content window
        const cw = elContent();
        cw.classList.remove('hidden');
        cw.classList.add('slide-in');
        cw.addEventListener('animationend', () => cw.classList.remove('slide-in'), { once: true });

        // Hide menu container
        const container = elMenuContainer();
        if (container) {
            container.classList.add('hidden');
        }

        // Mount hooks
        if (section.onMount) section.onMount();

        // Deselect nav items
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('selected', 'active'));
    }

    // ── CONTENT → MENU ──
    function transitionToMenu_fromContent() {
        if (current !== states.CONTENT) return;
        current = states.MENU;

        Audio.playBack();

        const cw = elContent();
        cw.classList.add('slide-out');
        cw.addEventListener('animationend', () => {
            cw.classList.add('hidden');
            cw.classList.remove('slide-out');
            document.getElementById('content-pane').innerHTML = '';
        }, { once: true });

        // Show menu container again with state-menu class
        const container = elMenuContainer();
        if (container) {
            container.classList.remove('hidden');
            container.classList.add('state-menu');
        }

        const mn = elMenu();
        if (mn) {
            mn.classList.remove('hidden');
        }

        setStatusText('PILIH MENU UNTUK MELANJUTKAN...');
        activeSection = null;
    }

    function setStatusText(text) {
        const el = document.getElementById('status-text');
        if (!el) return;
        el.innerHTML = `<span class="retro-blink">▼</span> ${text}`;
    }

    // ─── LOADING SEQUENCE ───
    function runLoadingSequence() {


        const fill  = document.getElementById('loading-bar-fill');
        const label = document.getElementById('loading-bar-label');
        const barWrap = document.getElementById('loading-bar-wrap');
        const prompt = document.getElementById('press-any-prompt');

        let pct = 0;
        const steps = [
            { target: 20,  delay: 200,  msg: 'LOADING ASSETS...' },
            { target: 45,  delay: 350,  msg: 'INITIALIZING ENGINE...' },
            { target: 60,  delay: 280,  msg: 'LOADING SPRITES...' },
            { target: 80,  delay: 320,  msg: 'CALIBRATING CRT...' },
            { target: 100, delay: 400,  msg: 'READY!' },
        ];

        let i = 0;
        function step() {
            if (i >= steps.length) {
                setTimeout(showPressAnyPrompt, 600);
                return;
            }
            const s = steps[i++];
            setTimeout(() => {
                pct = s.target;
                fill.style.width = pct + '%';
                label.textContent = s.msg + ' ' + pct + '%';
                step();
            }, s.delay);
        }

        function showPressAnyPrompt() {
            if (barWrap) barWrap.classList.add('hidden');
            if (prompt) prompt.classList.remove('hidden');

            function onContinue(e) {
                // Ignore tab key to avoid mess with button focus during loading
                if (e.key === 'Tab') return;

                document.removeEventListener('keydown', onContinue);
                document.removeEventListener('click', onContinue);

                // Play confirm beep if audio is already active, do not force enable
                if (Audio.enabled) {
                    Audio.playConfirm();
                }

                transitionToMenu();
            }

            document.addEventListener('keydown', onContinue);
            document.addEventListener('click', onContinue);
        }

        // Slight delay before starting
        setTimeout(step, 400);
    }

    // ─── NAVIGATION ───
    function setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            const showHint = () => {
                const hints = {
                    about: 'VER. 2025.1 | DEVELOPER & DESIGNER',
                    projects: '6 PROJECTS | LIVE / WIP / CONCEPT',
                    writing: '6 ARTIKEL | CODING & DESAIN & GAME',
                    contact: 'OPEN TO COLLAB | AVAILABLE',
                };
                setStatusText(hints[item.dataset.section] || '');
            };

            const resetHint = () => {
                setStatusText('PILIH MENU UNTUK MELANJUTKAN...');
            };

            item.addEventListener('mouseenter', () => {
                Audio.playMove();
                showHint();
            });
            item.addEventListener('focus', showHint);

            item.addEventListener('mouseleave', resetHint);
            item.addEventListener('blur', resetHint);

            const activate = () => {
                navItems.forEach(el => el.classList.remove('active', 'selected'));
                item.classList.add('selected');
                Audio.playConfirm();
                setTimeout(() => transitionToContent(item.dataset.section), 120);
            };

            item.addEventListener('click', activate);
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate();
                }
            });
        });

        // Back button
        document.getElementById('btn-back').addEventListener('click', transitionToMenu_fromContent);

        // Keyboard navigation in menu
        document.addEventListener('keydown', (e) => {
            if (current === states.CONTENT && e.key === 'Escape') {
                transitionToMenu_fromContent();
                return;
            }

            if (current !== states.MENU) return;

            const items = Array.from(document.querySelectorAll('.nav-item'));
            const focused = document.activeElement;
            const idx = items.indexOf(focused);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                items[(idx + 1) % items.length].focus();
                Audio.playMove();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                items[(idx - 1 + items.length) % items.length].focus();
                Audio.playMove();
            }
        });
    }

    // ─── AUDIO TOGGLE & SYSTEM CONFIG MODAL ───
    function setupAudioToggle() {
        const btnToggle   = document.getElementById('audio-toggle');
        const iconToggle  = document.getElementById('audio-icon');
        const txtToggle   = document.getElementById('audio-text');

        // Modal elements
        const settingsModal   = document.getElementById('settings-modal');
        const soundtrackModal = document.getElementById('soundtrack-modal');
        
        // Settings buttons
        const btnSoundOn   = document.getElementById('btn-sound-on');
        const btnSoundOff  = document.getElementById('btn-sound-off');
        const btnSelectTrk = document.getElementById('btn-soundtrack-select');
        const lblActiveTrk = document.getElementById('label-active-track');
        const btnSave      = document.getElementById('btn-settings-save');
        
        // Soundtrack sub-modal elements
        const btnTrackBack = document.getElementById('btn-track-back');
        const trackItems   = document.querySelectorAll('.track-item');

        // Draft state
        let draftSoundEnabled = false;
        let draftTrack = 'whitespace';

        function updateModalUI() {
            // Sound choice highlight
            if (draftSoundEnabled) {
                btnSoundOn.classList.add('active');
                btnSoundOff.classList.remove('active');
            } else {
                btnSoundOn.classList.remove('active');
                btnSoundOff.classList.add('active');
            }

            // Soundtrack text label
            const trackLabels = {
                whitespace: 'WHITE SPACE',
                rebelarmy: 'THE REBEL ARMY'
            };
            if (lblActiveTrk) {
                lblActiveTrk.textContent = trackLabels[draftTrack] || 'WHITE SPACE';
            }

            // Sub-modal track selection highlight
            trackItems.forEach(item => {
                if (item.dataset.track === draftTrack) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // Open config modal
        btnToggle.addEventListener('click', () => {
            draftSoundEnabled = Audio.enabled;
            draftTrack = Audio.track;
            updateModalUI();
            
            settingsModal.classList.remove('hidden');
            settingsModal.setAttribute('aria-hidden', 'false');
            if (Audio.enabled) Audio.playOpen();
        });

        // Sound ON / OFF clicks
        btnSoundOn.addEventListener('click', () => {
            draftSoundEnabled = true;
            updateModalUI();
            // Dry init audio context so it's ready
            Audio.init();
            Audio.playConfirm();
        });

        btnSoundOff.addEventListener('click', () => {
            draftSoundEnabled = false;
            updateModalUI();
        });

        // Open Soundtrack selection modal
        btnSelectTrk.addEventListener('click', () => {
            soundtrackModal.classList.remove('hidden');
            soundtrackModal.setAttribute('aria-hidden', 'false');
            if (draftSoundEnabled) Audio.playOpen();
            
            // Focus first active track item for accessibility
            const firstActive = soundtrackModal.querySelector('.track-item.active');
            if (firstActive) firstActive.focus();
        });

        // Track items selection
        trackItems.forEach(item => {
            const selectTrack = () => {
                draftTrack = item.dataset.track;
                updateModalUI();
                if (draftSoundEnabled) {
                    Audio.playConfirm();
                }
                setTimeout(() => {
                    soundtrackModal.classList.add('hidden');
                    soundtrackModal.setAttribute('aria-hidden', 'true');
                }, 200);
            };

            item.addEventListener('click', selectTrack);
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectTrack();
                }
            });
        });

        // Back from track selection
        btnTrackBack.addEventListener('click', () => {
            soundtrackModal.classList.add('hidden');
            soundtrackModal.setAttribute('aria-hidden', 'true');
            if (draftSoundEnabled) Audio.playBack();
        });

        // Save settings modal
        btnSave.addEventListener('click', () => {
            // Apply settings to actual audio manager
            Audio.setEnabled(draftSoundEnabled);
            Audio.setTrack(draftTrack);

            // Update bottom right icon indicator
            if (iconToggle) iconToggle.textContent = draftSoundEnabled ? '♪' : '✕';
            if (txtToggle) txtToggle.textContent = draftSoundEnabled ? 'SOUND: ON' : 'SOUND: OFF';
            btnToggle.classList.toggle('active', draftSoundEnabled);

            // Close modal
            settingsModal.classList.add('hidden');
            settingsModal.setAttribute('aria-hidden', 'true');
            if (draftSoundEnabled) Audio.playSuccess();
        });

        // Close when clicking modal overlays (outside content)
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.add('hidden');
                settingsModal.setAttribute('aria-hidden', 'true');
                if (Audio.enabled) Audio.playBack();
            }
        });

        soundtrackModal.addEventListener('click', (e) => {
            if (e.target === soundtrackModal) {
                soundtrackModal.classList.add('hidden');
                soundtrackModal.setAttribute('aria-hidden', 'true');
                if (draftSoundEnabled) Audio.playBack();
            }
        });
    }

    // ─── INIT ───
    function init() {
        Audio.init();
        setupNavigation();
        setupAudioToggle();
        runLoadingSequence();

        // First interaction unlocks audio (autoplay policy)
        document.addEventListener('click', () => { if (Audio.enabled) Audio.init(); }, { once: true });
    }

    return { init };
})();

// ─────────────────────────────────────────────────────────────
// 4. BOOT
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', App.init);
