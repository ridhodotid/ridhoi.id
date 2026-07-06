// ─────────────────────────────────────────────────────────────
// 1. PROCEDURAL 1-BIT PIXEL ART GENERATORS (OMORI STYLE)
// ─────────────────────────────────────────────────────────────
function generatePixelSprite(width, height, drawFn) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    drawFn(ctx, width, height);
    return canvas.toDataURL();
}

// Laptop Sprite
const laptopSrc = generatePixelSprite(24, 24, (ctx) => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1.5;
    ctx.fillStyle = "#ffffff";
    // screen part
    ctx.fillRect(4, 4, 16, 10);
    ctx.strokeRect(4, 4, 16, 10);
    // keyboard base
    ctx.beginPath();
    ctx.moveTo(2, 14);
    ctx.lineTo(22, 14);
    ctx.lineTo(20, 20);
    ctx.lineTo(4, 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // screen noise/lines
    ctx.fillStyle = "#000000";
    ctx.fillRect(6, 6, 12, 6);
});

// Door Sprite
const doorSrc = generatePixelSprite(24, 36, (ctx) => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1.5;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(2, 2, 20, 32);
    ctx.strokeRect(2, 2, 20, 32);
    // door panel lines
    ctx.strokeRect(4, 4, 16, 12);
    ctx.strokeRect(4, 18, 16, 12);
    // knob
    ctx.strokeRect(17, 16, 2, 2);
});

// Mewo (Black Cat) Sprite
const catSrc = generatePixelSprite(20, 20, (ctx) => {
    ctx.fillStyle = "#000000";
    // Body
    ctx.fillRect(2, 8, 12, 8);
    // Head
    ctx.fillRect(9, 4, 8, 8);
    // Ears
    ctx.fillRect(9, 1, 2, 3);
    ctx.fillRect(15, 1, 2, 3);
    // Tail
    ctx.fillRect(0, 10, 2, 4);
    // Eyes
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(11, 7, 1, 1);
    ctx.fillRect(14, 7, 1, 1);
});

// Exclamation Indicator Bubble
const exclSrc = generatePixelSprite(12, 12, (ctx) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(5, 0, 2, 8);
    ctx.fillRect(5, 10, 2, 2);
});

// Retro Telephone Sprite (1-Bit)
const telephoneSrc = generatePixelSprite(16, 16, (ctx) => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1.5;
    ctx.fillStyle = "#ffffff";
    // Base
    ctx.fillRect(2, 6, 12, 8);
    ctx.strokeRect(2, 6, 12, 8);
    // Handset
    ctx.beginPath();
    ctx.moveTo(1, 4); ctx.lineTo(15, 4);
    ctx.stroke();
    ctx.fillRect(1, 2, 3, 3);
    ctx.fillRect(12, 2, 3, 3);
    // Dial wheel
    ctx.strokeRect(6, 9, 4, 4);
});

// Newspaper Sprite (1-Bit)
const newspaperSrc = generatePixelSprite(16, 16, (ctx) => {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1.5;
    ctx.fillStyle = "#ffffff";
    // folded paper shape
    ctx.fillRect(2, 4, 12, 10);
    ctx.strokeRect(2, 4, 12, 10);
    // text lines
    ctx.fillStyle = "#000000";
    ctx.fillRect(4, 6, 8, 1);
    ctx.fillRect(4, 8, 8, 1);
    ctx.fillRect(4, 10, 6, 1);
});

// ─────────────────────────────────────────────────────────────
// 2. KABOOM.JS INITIALIZATION
// ─────────────────────────────────────────────────────────────
kaboom({
    width: 320,
    height: 240,
    letterbox: true,
    scale: 2.5,
    background: [255, 255, 255], // Pure White background
    global: true
});

// Load sprites
loadSprite("mat", "assets/whitespace_mat.png");
loadSprite("laptop", "assets/laptop.png");
loadSprite("diary", "assets/whitespace_diary.png");
loadSprite("tissue", "assets/whitespace_tissue.png");
loadSprite("lightbulb", "assets/whitespace_bulb.png");
loadSprite("door", doorSrc);
loadSprite("cat", catSrc);
loadSprite("excl", exclSrc);
loadSprite("telephone", "assets/kontak.png");
loadSprite("newspaper", "assets/newspaper.png");

loadSprite("player", "assets/omori_walk.png", {
    sliceX: 3,
    sliceY: 4,
    anims: {
        "idle-down":  { from: 0, to: 0 },
        "walk-down":  { from: 1, to: 2, loop: true, speed: 6 },
        "idle-left":  { from: 3, to: 3 },
        "walk-left":  { from: 4, to: 5, loop: true, speed: 6 },
        "idle-right": { from: 6, to: 6 },
        "walk-right": { from: 7, to: 8, loop: true, speed: 6 },
        "idle-up":    { from: 9, to: 9 },
        "walk-up":    { from: 10, to: 11, loop: true, speed: 6 }
    }
});

// Load BGM loops
loadSound("whitespace", "../White Space (Omori Original Soundtrack).m4a");
loadSound("rebelarmy", "../The Rebel Army (Final Fantasy II Original Soundtrack).m4a");

let currentBGM = null;
let profileData = null;

// Fetch dynamic data
fetch("data.json")
    .then(r => r.json())
    .then(data => {
        profileData = data;
    });

// ─────────────────────────────────────────────────────────────
// 3. UI OVERLAY HANDLERS (OMORI STYLED MONOCHROME MODALS)
// ─────────────────────────────────────────────────────────────
const bootScreen    = document.getElementById("boot-screen");
const btnStartGame  = document.getElementById("btn-start-game");
const dialogueBox   = document.getElementById("dialogue-box");
const dialogueText  = document.getElementById("dialogue-text");
const btnDiagClose  = document.getElementById("btn-dialog-close");
const contentModal  = document.getElementById("content-modal");
const btnModalClose = document.getElementById("btn-modal-close");
const modalTitle    = document.getElementById("modal-title");
const modalBody     = document.getElementById("modal-body-content");

let activeObject = null;
let isDialogueOpen = false;
let isModalOpen = false;
let typingTimer = null;

function typeText(targetElement, text, speed = 20) {
    targetElement.textContent = "";
    let idx = 0;
    
    function playTextBlip() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(100 + Math.random() * 20, ctx.currentTime);
            gain.gain.setValueAtTime(0.012, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        } catch(e) {}
    }

    if (typingTimer) clearInterval(typingTimer);
    
    typingTimer = setInterval(() => {
        if (idx < text.length) {
            targetElement.textContent += text[idx++];
            if (idx % 2 === 0) playTextBlip();
        } else {
            clearInterval(typingTimer);
        }
    }, speed);
}

function playSelectSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
    } catch(e) {}
}

function playCancelSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(250, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
    } catch(e) {}
}

function openDialogue(objName) {
    if (!profileData) return;
    isDialogueOpen = true;
    dialogueBox.classList.remove("hidden");
    dialogueBox.setAttribute("aria-hidden", "false");
    
    let text = "";
    if (objName === "cat") {
        text = "MEWO: Meow? (Mewo menatapmu dengan santai. Kucing hitam ini tampak tenang di sudut ruangan.)\n\n[ Tekan ENTER atau Spasi untuk mengelusnya ]";
    } else if (objName === "diary") {
        text = "Sebuah buku gambar sketsa bersampul putih dengan setitik tinta merah di tengahnya. Berisi catatan harian dan biodata Muhammad Ridhoi.\n\n[ Tekan ENTER atau Spasi untuk membuka ]";
    } else if (objName === "pc") {
        text = "Sebuah laptop hitam ramping menyala di atas tikar. Layarnya menampilkan data inventory projek bikinan Ridhoi.\n\n[ Tekan ENTER atau Spasi untuk membuka ]";
    } else if (objName === "lightbulb") {
        text = "Ini cuma lampu. Barangkali inspirasi Ridhoi?\n\n[ Tekan ENTER atau Spasi untuk menutup ]";
    } else if (objName === "door") {
        text = "Sebuah pintu kayu sederhana melayang tanpa dinding di belakangnya. Apakah Anda ingin keluar dari White Space dan kembali ke dunia nyata?\n\n[ Tekan ENTER atau Spasi untuk membuka pintu ]";
    } else if (objName === "tissue") {
        text = "sebuah tisu, mungkin untuk....\n\n[ Tekan ENTER atau Spasi untuk menutup ]";
    } else if (objName === "telephone") {
        text = "Sebuah telepon rumah retro berwarna putih. Kelihatannya tersambung langsung dengan kontak aktif milik Ridhoi.\n\n[ Tekan ENTER atau Spasi untuk menghubungkan ]";
    } else if (objName === "newspaper") {
        text = "Sebuah koran lokal terlipat rapi di sudut tikar. Tampaknya berisi tulisan opini dan artikel garapan Ridhoi.\n\n[ Tekan ENTER atau Spasi untuk membaca ]";
    }

    typeText(dialogueText, text);
}

function closeDialogue() {
    if (typingTimer) clearInterval(typingTimer);
    dialogueBox.classList.add("hidden");
    dialogueBox.setAttribute("aria-hidden", "true");
    isDialogueOpen = false;
    playCancelSound();
}

// Switch book page contents dynamically
window.switchBookTab = function(tabName) {
    const tabButtons = document.querySelectorAll(".book-nav-btn");
    tabButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById("btn-tab-" + tabName);
    if (activeBtn) activeBtn.classList.add("active");
    
    const rightPage = document.getElementById("book-right-page");
    if (!rightPage || !profileData) return;
    
    playSelectSound();
    
    if (tabName === 'status') {
        rightPage.innerHTML = `
            <h3 style="font-family:var(--font-heading); font-size:10px; margin-bottom:12px;">// BIODATA</h3>
            ${profileData.about.details.map(d => `<p style="font-size:18px; line-height:1.4; margin-bottom:10px;">${d}</p>`).join("")}
        `;
    } else if (tabName === 'skills') {
        rightPage.innerHTML = `
            <h3 style="font-family:var(--font-heading); font-size:10px; margin-bottom:12px;">// SKILL TREE</h3>
            <div class="jrpg-list">
                <div class="skill-row" style="margin-bottom:10px;">
                    <span style="font-family:var(--font-heading); font-size:8px;">CONTENT WRITING (90)</span>
                    <div style="border:2px solid #000000; height:12px; background:#fafafa; margin-top:4px;"><div style="width:90%; height:100%; background:#000000;"></div></div>
                </div>
                <div class="skill-row" style="margin-bottom:10px;">
                    <span style="font-family:var(--font-heading); font-size:8px;">COPYWRITING (85)</span>
                    <div style="border:2px solid #000000; height:12px; background:#fafafa; margin-top:4px;"><div style="width:85%; height:100%; background:#000000;"></div></div>
                </div>
                <div class="skill-row" style="margin-bottom:10px;">
                    <span style="font-family:var(--font-heading); font-size:8px;">WEB DEVELOPMENT (80)</span>
                    <div style="border:2px solid #000000; height:12px; background:#fafafa; margin-top:4px;"><div style="width:80%; height:100%; background:#000000;"></div></div>
                </div>
                <div class="skill-row" style="margin-bottom:10px;">
                    <span style="font-family:var(--font-heading); font-size:8px;">EDITING &amp; VECTOR (75)</span>
                    <div style="border:2px solid #000000; height:12px; background:#fafafa; margin-top:4px;"><div style="width:75%; height:100%; background:#000000;"></div></div>
                </div>
            </div>
        `;
    } else if (tabName === 'academy') {
        rightPage.innerHTML = `
            <h3 style="font-family:var(--font-heading); font-size:10px; margin-bottom:12px;">// ACADEMY</h3>
            <div class="jrpg-list" style="font-size:18px; line-height:1.4;">
                <p><strong>Universitas Airlangga (2018 - 2022)</strong><br>S1 Bahasa dan Sastra Indonesia<br><span style="color:#666666; font-size:14px;">Ijazah Asli, Aktif menulis kreatif</span></p>
                <hr style="border:1px dashed var(--color-border-dim); margin:12px 0;">
                <p><strong>Pelatihan TIK Mandiri</strong><br>Linux, OpenWRT, setup server, dan manajemen jaringan topologi lokal.</p>
            </div>
        `;
    } else if (tabName === 'quests') {
        rightPage.innerHTML = `
            <h3 style="font-family:var(--font-heading); font-size:10px; margin-bottom:12px;">// QUEST LOG</h3>
            <div class="jrpg-list" style="font-size:18px; line-height:1.4;">
                <p><strong>Komite Nasional Pelestarian Kretek (KNPK)</strong><br>Staff Advokasi, Riset, &amp; Penulis Konten Kreatif</p>
                <hr style="border:1px dashed var(--color-border-dim); margin:12px 0;">
                <p><strong>Komunitas Bahagia EA</strong><br>Pegiat rintisan kreatif &amp; sastrawan di bawah asuhan Puthut EA</p>
                <hr style="border:1px dashed var(--color-border-dim); margin:12px 0;">
                <p><strong>Nyangkem.id</strong><br>Founder, Editor-in-Chief, &amp; Lead Web Developer</p>
            </div>
        `;
    }
};

function openModal(objName) {
    if (!profileData) return;
    closeDialogue();
    
    // Direct exit for door
    if (objName === "door") {
        playSelectSound();
        window.location.href = "../index.html";
        return;
    }

    // Direct close dialogs for bulb and tissue (no modal!)
    if (objName === "lightbulb" || objName === "tissue") {
        return;
    }

    isModalOpen = true;
    contentModal.classList.remove("hidden");
    contentModal.setAttribute("aria-hidden", "false");
    playSelectSound();

    if (objName === "cat") {
        modalTitle.textContent = "// STATUS: MEWO";
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p class="status-story">"Meow! (Mewo mendengkur pelan saat ditiup bulunya.)"</p>
                <p class="status-story" style="margin-top: 10px; font-size: 16px; color: #666666;">Mewo senang melihat Anda menjelajah. Terus berjalan untuk mencari tahu detail portofolio lainnya!</p>
            </div>
        `;
    } else if (objName === "diary") {
        modalTitle.textContent = "// Buku Catatan: TENTANG SAYA";
        const about = profileData.about;
        modalBody.innerHTML = `
            <div class="book-layout">
                <div class="book-page-left">
                    <div class="status-avatar" style="background-image: url('../assets/images.png'); width:80px; height:80px; margin-bottom:8px;"></div>
                    <div class="status-class-title" style="font-size:8px;">${about.class.toUpperCase()}</div>
                    <div style="font-size:14px; color:#555555; margin-top:4px;">LV. 24 | HP 999/999</div>
                    
                    <ul class="book-nav-list">
                        <li><button type="button" class="book-nav-btn active" id="btn-tab-status" onclick="switchBookTab('status')">STATUS</button></li>
                        <li><button type="button" class="book-nav-btn" id="btn-tab-skills" onclick="switchBookTab('skills')">SKILL TREE</button></li>
                        <li><button type="button" class="book-nav-btn" id="btn-tab-academy" onclick="switchBookTab('academy')">ACADEMY</button></li>
                        <li><button type="button" class="book-nav-btn" id="btn-tab-quests" onclick="switchBookTab('quests')">QUEST LOG</button></li>
                    </ul>
                </div>
                <div class="book-page-right" id="book-right-page">
                    <!-- Loaded dynamically -->
                </div>
            </div>
        `;
        switchBookTab('status'); // Init tab
    } else if (objName === "pc") {
        modalTitle.textContent = "// Laptop: PROJECTS";
        const projectsHtml = profileData.projects.map(p => {
            let imgSrc = "";
            if (p.title.includes("NYANGKEM")) imgSrc = "../assets/website-nyangkem.png";
            else if (p.title.includes("PUISI")) imgSrc = "../assets/antologi-puisi.png";
            else if (p.title.includes("SEMUANYA")) imgSrc = "../assets/novel.png";
            else if (p.title.includes("HOREG")) imgSrc = "../assets/horeg-akar-rumput.jpg";
            else if (p.title.includes("WIBU")) imgSrc = "../assets/wibu-akar-rumput.jpg";
            else imgSrc = "../assets/images.png";

            return `
                <a href="${p.link}" class="project-bw-card" target="_blank" rel="noopener">
                    <img src="${imgSrc}" class="project-bw-img" alt="${p.title}" />
                    <div class="project-bw-info">
                        <div class="project-bw-title">${p.title}</div>
                        <div class="project-bw-desc">${p.desc}</div>
                        <div class="jrpg-item-meta">
                            ${p.tags.map(t => `<span class="jrpg-tag">${t}</span>`).join("")}
                            <span class="jrpg-status ${p.status.toLowerCase()}">${p.status}</span>
                        </div>
                    </div>
                </a>
            `;
        }).join("");
        modalBody.innerHTML = `<div class="project-bw-grid">${projectsHtml}</div>`;
    } else if (objName === "newspaper") {
        modalTitle.textContent = "// Koran: TULISAN ARTIKEL";
        const writingsHtml = profileData.writing.map(w => `
            <a href="${w.link}" class="jrpg-item" target="_blank" rel="noopener">
                <span class="jrpg-item-arrow">▶</span>
                <div class="jrpg-item-body">
                    <div class="jrpg-item-title">${w.num}. ${w.title}</div>
                    <div class="jrpg-item-desc">${w.excerpt}</div>
                    <div class="jrpg-item-meta">
                        <span class="jrpg-tag" style="border-color: #000000; color: #000000; background:rgba(0,0,0,0.05);">${w.category}</span>
                        <span class="jrpg-tag" style="border-color: #888889; color: #888889;">${w.date}</span>
                    </div>
                </div>
            </a>
        `).join("");
        modalBody.innerHTML = `<div class="jrpg-list">${writingsHtml}</div>`;
    } else if (objName === "telephone") {
        modalTitle.textContent = "// Telepon: HUBUNGI";
        const c = profileData.contact;
        modalBody.innerHTML = `
            <div class="contact-grid">
                <a href="${c.instagram.link}" class="jrpg-item" target="_blank" rel="noopener">
                    <span class="jrpg-item-arrow">✦</span>
                    <div class="jrpg-item-body">
                        <div class="jrpg-item-title">INSTAGRAM</div>
                        <div class="jrpg-item-desc">${c.instagram.handle}</div>
                    </div>
                </a>
                <a href="${c.linkedin.link}" class="jrpg-item" target="_blank" rel="noopener">
                    <span class="jrpg-item-arrow">◈</span>
                    <div class="jrpg-item-body">
                        <div class="jrpg-item-title">LINKEDIN</div>
                        <div class="jrpg-item-desc">${c.linkedin.handle}</div>
                    </div>
                </a>
                <a href="${c.email.link}" class="jrpg-item">
                    <span class="jrpg-item-arrow">✉</span>
                    <div class="jrpg-item-body">
                        <div class="jrpg-item-title">EMAIL LANGSUNG</div>
                        <div class="jrpg-item-desc">${c.email.handle}</div>
                    </div>
                </a>
            </div>
        `;
    }
}

function closeModal() {
    contentModal.classList.add("hidden");
    contentModal.setAttribute("aria-hidden", "true");
    isModalOpen = false;
    playCancelSound();
}

btnDiagClose.addEventListener("click", closeDialogue);
btnModalClose.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (isModalOpen) closeModal();
        else if (isDialogueOpen) closeDialogue();
    }
});

// ─────────────────────────────────────────────────────────────
// 3.5. ASSETS DOWNLOAD PRELOAD PROGRESS LOOP
// ─────────────────────────────────────────────────────────────
const assetsToLoad = [
    "assets/omori_walk.png",
    "assets/whitespace_mat.png",
    "assets/whitespace_diary.png",
    "assets/whitespace_tissue.png",
    "assets/whitespace_bulb.png",
    "assets/kontak.png",
    "assets/newspaper.png",
    "assets/laptop.png",
    "../White Space (Omori Original Soundtrack).m4a",
    "../The Rebel Army (Final Fantasy II Original Soundtrack).m4a"
];

const loadingBarWrap = document.getElementById("loading-bar-wrap");
const loadingBarFill = document.getElementById("loading-bar-fill");
const loadingBarLabel = document.getElementById("loading-bar-label");

let loadedCount = 0;
const totalAssets = assetsToLoad.length;

Promise.all(assetsToLoad.map(url => {
    return fetch(url)
        .then(res => {
            loadedCount++;
            const pct = Math.round((loadedCount / totalAssets) * 100);
            if (loadingBarFill) loadingBarFill.style.width = pct + "%";
            if (loadingBarLabel) loadingBarLabel.textContent = `DOWNLOADING ASSETS... ${pct}%`;
            return res.blob();
        })
        .catch(() => {
            loadedCount++;
            const pct = Math.round((loadedCount / totalAssets) * 100);
            if (loadingBarFill) loadingBarFill.style.width = pct + "%";
            if (loadingBarLabel) loadingBarLabel.textContent = `DOWNLOADING ASSETS... ${pct}%`;
        });
})).then(() => {
    setTimeout(() => {
        if (loadingBarWrap) loadingBarWrap.classList.add("hidden");
        if (btnStartGame) {
            btnStartGame.classList.remove("hidden");
            btnStartGame.focus();
        }
    }, 600);
});

btnStartGame.addEventListener("click", () => {
    bootScreen.classList.add("hidden");
    bootScreen.setAttribute("aria-hidden", "true");
    
    currentBGM = play("whitespace", {
        volume: 0.15,
        loop: true
    });
    playSelectSound();
});

// ─────────────────────────────────────────────────────────────
// 4. GAME SCENE (WHITE SPACE SCENE)
// ─────────────────────────────────────────────────────────────
scene("game", () => {
    const SPEED = 85;
    let targetPos = null;
    let activeObjEntity = null;

    // Render Mat in Center (1.5x scaled: 192x145)
    const mat = add([
        sprite("mat"),
        pos(64, 48), 
        scale(1.5),
        "mat"
    ]);

    // Laptop: Top-left of the mat (48x48 size scaled to 0.55)
    const laptop = add([
        sprite("laptop"),
        pos(80, 60),
        scale(0.55),
        area({ shape: new Rect(vec2(2, 2), 20, 20) }),
        body({ isStatic: true }),
        "laptop_obj"
    ]);

    // Diary (Book): Top-right of the mat
    const diary = add([
        sprite("diary"),
        pos(210, 60),
        area(),
        body({ isStatic: true }),
        "diary_obj"
    ]);

    // Tissue Box: Bottom-right of the mat
    const tissue = add([
        sprite("tissue"),
        pos(210, 140),
        area(),
        body({ isStatic: true }),
        "tissue_obj"
    ]);

    // Newspaper (Koran): Bottom-left of the mat (32x32 size scaled to 0.55)
    const newspaper = add([
        sprite("newspaper"),
        pos(80, 140),
        scale(0.55),
        area({ shape: new Rect(vec2(2, 2), 14, 14) }),
        body({ isStatic: true }),
        "newspaper_obj"
    ]);

    // Telephone (Telepon): Bottom-center of the mat (32x32 size scaled to 0.55)
    const telephone = add([
        sprite("telephone"),
        pos(152, 140),
        scale(0.55),
        area({ shape: new Rect(vec2(2, 2), 14, 14) }),
        body({ isStatic: true }),
        "telephone_obj"
    ]);

    // Lightbulb: Hanging just above the mat center
    const lightbulb = add([
        sprite("lightbulb"),
        pos(152, 10),
        area({ shape: new Rect(vec2(0, 48), 16, 12) }),
        body({ isStatic: true }),
        "lightbulb_obj"
    ]);

    // Door: Floating to the top left of the mat
    const door = add([
        sprite("door"),
        pos(106, 14),
        area(),
        body({ isStatic: true }),
        "door_obj"
    ]);

    // Mewo (Cat): Below and left of the mat
    const cat = add([
        sprite("cat"),
        pos(152, 196),
        area(),
        body({ isStatic: true }),
        "cat_obj"
    ]);



    // Player Spawning in middle of Mat (Ridhoi JRPG: cell size 32x48, height 38px scaled)
    const player = add([
        sprite("player", { anim: "idle-down" }),
        pos(150, 104), // centered inside the 192x145 mat
        area({ shape: new Rect(vec2(6, 30), 20, 12) }),
        body(),
        "player"
    ]);

    // Floating exclamation indicator bubble
    const bubble = add([
        sprite("excl"),
        pos(0, 0),
        opacity(0),
        anchor("bot"),
        "bubble"
    ]);

    // Smooth Camera follow, Wrapping & Cardinal Click-to-Move logic
    player.onUpdate(() => {
        camPos(player.pos);
        
        // Toroidal screen wrapping (loop map) and reset click target
        if (player.pos.x < -16) {
            player.pos.x = 336;
            targetPos = null;
        }
        if (player.pos.x > 336) {
            player.pos.x = -16;
            targetPos = null;
        }
        if (player.pos.y < -16) {
            player.pos.y = 256;
            targetPos = null;
        }
        if (player.pos.y > 256) {
            player.pos.y = -16;
            targetPos = null;
        }

        // Perform click-to-move walk (Cardinal only: first X, then Y)
        if (targetPos) {
            const dx = targetPos.x - player.pos.x;
            const dy = targetPos.y - player.pos.y;
            
            if (Math.abs(dx) > 4) {
                // Move horizontally
                const stepX = dx > 0 ? SPEED : -SPEED;
                player.move(stepX, 0);
                if (stepX > 0) {
                    if (player.curAnim() !== "walk-right") player.play("walk-right");
                } else {
                    if (player.curAnim() !== "walk-left") player.play("walk-left");
                }
            } else if (Math.abs(dy) > 4) {
                // Move vertically
                const stepY = dy > 0 ? SPEED : -SPEED;
                player.move(0, stepY);
                if (stepY > 0) {
                    if (player.curAnim() !== "walk-down") player.play("walk-down");
                } else {
                    if (player.curAnim() !== "walk-up") player.play("walk-up");
                }
            } else {
                targetPos = null;
                const cur = player.curAnim();
                if (cur && cur.startsWith("walk-")) {
                    player.play(cur.replace("walk-", "idle-"));
                }
            }
        }
    });

    let activeTrigger = null;

    // Check proximity based on 1 block radius cardinally or diagonally
    function checkProximity(obj, threshold = 36) {
        // Player center (size 32x48)
        const pCenter = player.pos.add(vec2(16, 24));
        
        // Object center
        let objW = 16, objH = 16;
        if (obj.is("laptop_obj")) { objW = 26; objH = 26; }
        else if (obj.is("diary_obj")) { objW = 19; objH = 20; }
        else if (obj.is("tissue_obj")) { objW = 18; objH = 20; }
        else if (obj.is("newspaper_obj")) { objW = 18; objH = 18; }
        else if (obj.is("telephone_obj")) { objW = 18; objH = 18; }
        else if (obj.is("lightbulb_obj")) { objW = 14; objH = 60; }
        else if (obj.is("door_obj")) { objW = 24; objH = 36; }
        else if (obj.is("cat_obj")) { objW = 20; objH = 20; }
        
        const oCenter = obj.pos.add(vec2(objW / 2, objH / 2));
        
        // Distance check between centers
        const dx = Math.abs(pCenter.x - oCenter.x);
        const dy = Math.abs(pCenter.y - oCenter.y);
        
        // Cardinal neighbor check (within 1 block):
        // Horizontal adjacent: dx <= 38, dy < 18
        // Vertical adjacent: dy <= 40, dx < 18
        const isHorizontalAdjacent = (dx <= 38 && dy < 18);
        const isVerticalAdjacent = (dy <= 40 && dx < 18);
        
        return (isHorizontalAdjacent || isVerticalAdjacent);
    }

    onUpdate(() => {
        activeTrigger = null;
        activeObjEntity = null;
        bubble.opacity = 0;

        if (isDialogueOpen || isModalOpen) return;

        let closestObj = null;
        let closestLabel = null;
        let closestOffset = vec2(8, -8);

        function checkObjProximity(obj, label, offset) {
            if (checkProximity(obj, 36)) {
                closestObj = obj;
                closestLabel = label;
                closestOffset = offset;
            }
        }

        checkObjProximity(laptop, "pc", vec2(12, -4));
        checkObjProximity(diary, "diary", vec2(10, -4));
        checkObjProximity(tissue, "tissue", vec2(10, -4));
        checkObjProximity(lightbulb, "lightbulb", vec2(8, 44));
        checkObjProximity(door, "door", vec2(12, -4));
        checkObjProximity(cat, "cat", vec2(10, -4));
        checkObjProximity(telephone, "telephone", vec2(8, -4));
        checkObjProximity(newspaper, "newspaper", vec2(8, -4));

        if (closestObj) {
            activeTrigger = closestLabel;
            activeObjEntity = closestObj;
            bubble.pos = closestObj.pos.add(closestOffset);
            bubble.opacity = 1;
        }

        activeObject = activeTrigger;
    });

    // ─────────────────────────────────────────────────────────────
    // 5. INPUT & MOVEMENT CONTROL BINDINGS
    // ─────────────────────────────────────────────────────────────
    onKeyDown("left", () => {
        if (isDialogueOpen || isModalOpen) return;
        targetPos = null; // keyboard override
        player.move(-SPEED, 0);
        if (player.curAnim() !== "walk-left") player.play("walk-left");
    });
    onKeyDown("a", () => {
        if (isDialogueOpen || isModalOpen) return;
        targetPos = null;
        player.move(-SPEED, 0);
        if (player.curAnim() !== "walk-left") player.play("walk-left");
    });

    onKeyDown("right", () => {
        if (isDialogueOpen || isModalOpen) return;
        targetPos = null;
        player.move(SPEED, 0);
        if (player.curAnim() !== "walk-right") player.play("walk-right");
    });
    onKeyDown("d", () => {
        if (isDialogueOpen || isModalOpen) return;
        targetPos = null;
        player.move(SPEED, 0);
        if (player.curAnim() !== "walk-right") player.play("walk-right");
    });

    onKeyDown("up", () => {
        if (isDialogueOpen || isModalOpen) return;
        targetPos = null;
        player.move(0, -SPEED);
        if (player.curAnim() !== "walk-up") player.play("walk-up");
    });
    onKeyDown("w", () => {
        if (isDialogueOpen || isModalOpen) return;
        targetPos = null;
        player.move(0, -SPEED);
        if (player.curAnim() !== "walk-up") player.play("walk-up");
    });

    onKeyDown("down", () => {
        if (isDialogueOpen || isModalOpen) return;
        targetPos = null;
        player.move(0, SPEED);
        if (player.curAnim() !== "walk-down") player.play("walk-down");
    });
    onKeyDown("s", () => {
        if (isDialogueOpen || isModalOpen) return;
        targetPos = null;
        player.move(0, SPEED);
        if (player.curAnim() !== "walk-down") player.play("walk-down");
    });

    function registerKeyRelease(dirKey, idleAnim) {
        onKeyRelease(dirKey, () => {
            if (
                !isKeyDown("left") && !isKeyDown("a") &&
                !isKeyDown("right") && !isKeyDown("d") &&
                !isKeyDown("up") && !isKeyDown("w") &&
                !isKeyDown("down") && !isKeyDown("s")
            ) {
                player.play(idleAnim);
            }
        });
    }

    registerKeyRelease("left", "idle-left");
    registerKeyRelease("a", "idle-left");
    registerKeyRelease("right", "idle-right");
    registerKeyRelease("d", "idle-right");
    registerKeyRelease("up", "idle-up");
    registerKeyRelease("w", "idle-up");
    registerKeyRelease("down", "idle-down");
    registerKeyRelease("s", "idle-down");

    // Action execution (Interact)
    function executeAction() {
        if (isModalOpen) {
            closeModal();
            return;
        }

        if (isDialogueOpen) {
            if (activeObject) {
                if (activeObject === "lightbulb" || activeObject === "tissue") {
                    closeDialogue();
                } else {
                    openModal(activeObject);
                }
            } else {
                closeDialogue();
            }
            return;
        }

        if (activeObject) {
            openDialogue(activeObject);
        }
    }

    onKeyPress("space", executeAction);
    onKeyPress("enter", executeAction);

    // ─────────────────────────────────────────────────────────────
    // 6. MOBILE VIRTUAL DPAD MAPPING
    // ─────────────────────────────────────────────────────────────
    const mUp = document.getElementById("btn-dpad-up");
    const mDown = document.getElementById("btn-dpad-down");
    const mLeft = document.getElementById("btn-dpad-left");
    const mRight = document.getElementById("btn-dpad-right");
    const mAction = document.getElementById("btn-action-a");

    let touchDirections = { up: false, down: false, left: false, right: false };

    function bindDpad(btn, dir) {
        btn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            targetPos = null; // d-pad overrides touch click-to-move
            touchDirections[dir] = true;
        });
        btn.addEventListener("touchend", (e) => {
            e.preventDefault();
            touchDirections[dir] = false;
            player.play(`idle-${dir}`);
        });
    }

    if (mUp) {
        bindDpad(mUp, "up");
        bindDpad(mDown, "down");
        bindDpad(mLeft, "left");
        bindDpad(mRight, "right");
        
        mAction.addEventListener("touchstart", (e) => {
            e.preventDefault();
            executeAction();
        });
    }

    // Touch swipe-to-walk state variables
    let touchStartPos = null;
    let swipeActive = false;
    let swipeDir = null;
    let hasDragged = false;

    onUpdate(() => {
        if (isDialogueOpen || isModalOpen) return;
        
        // Touch swipe-drag movement overrides
        if (swipeActive && swipeDir) {
            targetPos = null;
            if (swipeDir === "left") {
                player.move(-SPEED, 0);
                if (player.curAnim() !== "walk-left") player.play("walk-left");
            } else if (swipeDir === "right") {
                player.move(SPEED, 0);
                if (player.curAnim() !== "walk-right") player.play("walk-right");
            } else if (swipeDir === "up") {
                player.move(0, -SPEED);
                if (player.curAnim() !== "walk-up") player.play("walk-up");
            } else if (swipeDir === "down") {
                player.move(0, SPEED);
                if (player.curAnim() !== "walk-down") player.play("walk-down");
            }
            return; // Skip D-pad/keyboard if swipe is active
        }
        
        if (touchDirections.left) {
            player.move(-SPEED, 0);
            if (player.curAnim() !== "walk-left") player.play("walk-left");
        } else if (touchDirections.right) {
            player.move(SPEED, 0);
            if (player.curAnim() !== "walk-right") player.play("walk-right");
        } else if (touchDirections.up) {
            player.move(0, -SPEED);
            if (player.curAnim() !== "walk-up") player.play("walk-up");
        } else if (touchDirections.down) {
            player.move(0, SPEED);
            if (player.curAnim() !== "walk-down") player.play("walk-down");
        }
    });

    // Helper to check if a world point lies within the active object's box
    function checkClickedActiveObject(point) {
        if (!activeObjEntity) return false;
        
        let objW = 16, objH = 16;
        if (activeObjEntity.is("laptop_obj")) { objW = 26; objH = 26; }
        else if (activeObjEntity.is("diary_obj")) { objW = 19; objH = 20; }
        else if (activeObjEntity.is("tissue_obj")) { objW = 18; objH = 20; }
        else if (activeObjEntity.is("newspaper_obj")) { objW = 18; objH = 18; }
        else if (activeObjEntity.is("telephone_obj")) { objW = 18; objH = 18; }
        else if (activeObjEntity.is("lightbulb_obj")) { objW = 14; objH = 60; }
        else if (activeObjEntity.is("door_obj")) { objW = 24; objH = 36; }
        else if (activeObjEntity.is("cat_obj")) { objW = 20; objH = 20; }
        
        // Add a 16px clickable padding buffer around the object bounds for mobile fingers
        return (
            point.x >= activeObjEntity.pos.x - 16 &&
            point.x <= activeObjEntity.pos.x + objW + 16 &&
            point.y >= activeObjEntity.pos.y - 16 &&
            point.y <= activeObjEntity.pos.y + objH + 16
        );
    }

    // Mouse click (Desktop only - ignored on touch coarse pointers to avoid double-triggers)
    onClick(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        // Tap/click replaces enter when dialogue/modal is open
        if (isDialogueOpen || isModalOpen) {
            executeAction();
            return;
        }
        const mPos = toWorld(mousePos());
        
        // If clicking directly on active object, trigger dialogue action instantly
        if (checkClickedActiveObject(mPos)) {
            executeAction();
            return;
        }
        
        targetPos = mPos;
    });

    // Touch events (Mobile swipe-to-walk + tap to enter)
    onTouchStart((pos) => {
        if (isDialogueOpen || isModalOpen) {
            executeAction();
            return;
        }
        const tPos = toWorld(pos);
        if (checkClickedActiveObject(tPos)) {
            executeAction();
            return;
        }
        touchStartPos = pos;
        swipeActive = true;
        hasDragged = false;
    });

    onTouchMove((pos) => {
        if (!swipeActive || !touchStartPos) return;
        const delta = pos.sub(touchStartPos);
        const dist = delta.len();
        
        if (dist > 16) {
            hasDragged = true;
            targetPos = null; // override click-to-move pathing
            if (Math.abs(delta.x) > Math.abs(delta.y)) {
                swipeDir = delta.x > 0 ? "right" : "left";
            } else {
                swipeDir = delta.y > 0 ? "down" : "up";
            }
        } else {
            swipeDir = null;
        }
    });

    onTouchEnd(() => {
        if (swipeActive && touchStartPos && !hasDragged) {
            // Only walk to tap if we didn't just open/close a modal or dialogue
            if (!isDialogueOpen && !isModalOpen) {
                const tPos = toWorld(touchStartPos);
                targetPos = tPos;
            }
        }
        
        swipeActive = false;
        touchStartPos = null;
        if (swipeDir) {
            player.play(`idle-${swipeDir}`);
            swipeDir = null;
        }
    });
});

// Start White Space!
go("game");
