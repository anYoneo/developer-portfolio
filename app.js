// Developer Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Logic
    const tabs = document.querySelectorAll('.showcase-tab');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;

            // Remove active states
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Add active states to clicked tab and corresponding pane
            tab.classList.add('active');
            const targetPane = document.getElementById(target);
            if (targetPane) targetPane.classList.add('active');

            // Handle special tab initializations
            if (target === 'analysis' && !window.salesChart) {
                initChart();
            }
        });
    });

    // 2. Chatbot Mock NLP Matching
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    const intents = [
        {
            keywords: ['halo', 'hai', 'hello', 'hi'],
            responses: [
                "Halo! Saya chatbot asisten milik Riszky. Ada yang bisa saya bantu?",
                "Hai! Senang bertemu dengan Anda. Silakan tanyakan apa saja tentang project saya!"
            ]
        },
        {
            keywords: ['siapa', 'riszky', 'owner'],
            responses: [
                "Muhammad Riszky Wibowo adalah seorang System Analyst & Software Engineer yang berfokus pada NestJS, Laravel, Python, dan arsitektur database.",
                "Riszky berpengalaman dalam pengembangan sistem pencocokan keuangan 3-Way Match, integrasi Odoo, dan NLP."
            ]
        },
        {
            keywords: ['verimatch', 'matching', 'audit', '3way', 'po'],
            responses: [
                "VeriMatch Enterprise adalah platform intelligence 3-Way Matching (PO vs GRN vs Invoice) 4-pillar presisi tinggi dengan Risk Scoring 5-faktor dan SHA-256 Audit Trail."
            ]
        },
        {
            keywords: ['project', 'portofolio', 'aplikasi'],
            responses: [
                "Proyek utama yang ditampilkan meliputi: 1) VeriMatch Enterprise (NestJS & PostgreSQL), 2) PSB Online (Laravel 11), 3) NLP Chatbot (Python/Flask), dan 4) Financely v2.",
                "Ada proyek unggulan di GitHub Riszky: VeriMatch Enterprise, PSB Online, Chatbot NLP, dan Analisis Data E-Commerce."
            ]
        },
        {
            keywords: ['psb', 'sekolah', 'daftar'],
            responses: [
                "PSB Online adalah sistem pendaftaran siswa baru SMK berbasis Laravel 11 + Bootstrap 5. Dilengkapi dengan cetak bukti pendaftaran, soft deletes, dan auto-complete kecamatan."
            ]
        },
        {
            keywords: ['analisis', 'data', 'ecommerce', 'olist'],
            responses: [
                "Brazilian E-Commerce Analysis menganalisis dataset Olist (Kaggle) menggunakan Pandas, Matplotlib, dan Seaborn untuk mendapatkan insights RFM dan tren pembayaran."
            ]
        },
        {
            keywords: ['kontak', 'email', 'telepon', 'linkedin'],
            responses: [
                "Anda dapat menghubungi Riszky melalui form kontak di bawah atau via LinkedIn di: https://www.linkedin.com/in/muhammad-riszky-wibowo/"
            ]
        },
        {
            keywords: ['finance', 'financely', 'tabungan', 'uang'],
            responses: [
                "Financely adalah dashboard keuangan glassmorphism premium dengan visualisasi kartu debit interaktif dan alokasi pengeluaran."
            ]
        }
    ];

    function getBotResponse(userMsg) {
        const cleanMsg = userMsg.toLowerCase();
        for (let intent of intents) {
            for (let keyword of intent.keywords) {
                if (cleanMsg.includes(keyword)) {
                    return intent.responses[Math.floor(Math.random() * intent.responses.length)];
                }
            }
        }
        return "Maaf, saya tidak mengerti maksud Anda. Anda bisa menanyakan tentang 'owner', 'VeriMatch', 'project', 'PSB', atau 'analisis data'.";
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            appendMessage(text, 'user');
            chatInput.value = '';

            setTimeout(() => {
                const response = getBotResponse(text);
                appendMessage(response, 'bot');
            }, 600);
        });
    }

    // 3. Database Schema Visualizer
    const schemaDetails = {
        'admins.id': {
            type: 'bigint unsigned',
            null: 'NO',
            key: 'PRI',
            default: 'NULL',
            extra: 'auto_increment',
            desc: 'Primary key untuk tabel administrator.'
        },
        'admins.name': {
            type: 'varchar(100)',
            null: 'NO',
            key: '',
            default: 'NULL',
            extra: '',
            desc: 'Nama lengkap administrator yang ditampilkan di dashboard.'
        },
        'admins.username': {
            type: 'varchar(50)',
            null: 'NO',
            key: 'UNI',
            default: 'NULL',
            extra: '',
            desc: 'Username unik untuk login administrator. Mencegah duplikasi.'
        },
        'admins.password': {
            type: 'varchar(255)',
            null: 'NO',
            key: '',
            default: 'NULL',
            extra: '',
            desc: 'Password terenkripsi menggunakan Laravel bcrypt (bukan MD5!).'
        },
        'kecamatans.id': {
            type: 'bigint unsigned',
            null: 'NO',
            key: 'PRI',
            default: 'NULL',
            extra: 'auto_increment',
            desc: 'Primary key untuk tabel kecamatan.'
        },
        'kecamatans.nama_kecamatan': {
            type: 'varchar(100)',
            null: 'NO',
            key: 'UNI',
            default: 'NULL',
            extra: '',
            desc: 'Nama wilayah kecamatan unik. Diisi 26 kecamatan Majalengka.'
        },
        'pendaftarans.nomor_pendaftaran': {
            type: 'varchar(20)',
            null: 'NO',
            key: 'UNI',
            default: 'NULL',
            extra: '',
            desc: 'Format unik: P{TAHUN}{5-digit-sequence}. Generated otomatis.'
        },
        'pendaftarans.status': {
            type: "enum('pending','diterima','ditolak')",
            null: 'NO',
            key: '',
            default: 'pending',
            extra: '',
            desc: 'Status validasi berkas pendaftaran calon siswa.'
        },
        'pendaftarans.kecamatan_id': {
            type: 'bigint unsigned',
            null: 'NO',
            key: 'MUL',
            default: 'NULL',
            extra: '',
            desc: 'Foreign key yang berelasi dengan tabel kecamatans.'
        }
    };

    const schemaRows = document.querySelectorAll('.db-table-row');
    const detailTitle = document.getElementById('detail-field-title');
    const detailType = document.getElementById('detail-type');
    const detailNull = document.getElementById('detail-null');
    const detailKey = document.getElementById('detail-key');
    const detailDefault = document.getElementById('detail-default');
    const detailDesc = document.getElementById('detail-desc');

    schemaRows.forEach(row => {
        row.addEventListener('click', () => {
            schemaRows.forEach(r => r.classList.remove('active'));
            row.classList.add('active');

            const field = row.dataset.field;
            const data = schemaDetails[field];

            if (data) {
                detailTitle.textContent = field;
                detailType.textContent = data.type;
                detailNull.textContent = data.null;
                detailKey.textContent = data.key || 'None';
                detailDefault.textContent = data.default;
                detailDesc.textContent = data.desc;
            }
        });
    });

    // 4. Data Analysis live Chart.js
    function initChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        window.salesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Credit Card', 'Boleto', 'Voucher', 'Debit Card'],
                datasets: [{
                    label: 'Persentase Metode Pembayaran (%)',
                    data: [73.9, 19.0, 5.4, 1.7],
                    backgroundColor: [
                        'rgba(56, 189, 248, 0.65)',
                        'rgba(192, 132, 252, 0.65)',
                        'rgba(52, 211, 153, 0.65)',
                        'rgba(244, 63, 94, 0.65)'
                    ],
                    borderColor: [
                        '#38bdf8',
                        '#c084fc',
                        '#34d399',
                        '#f43f5e'
                    ],
                    borderWidth: 1.5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#94a3b8',
                            font: {
                                family: 'Inter'
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // 5. Custom Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('msg').value.trim();

            if (!name || !email || !message) {
                alert("Harap isi semua kolom formulir.");
                return;
            }

            alert("Pesan berhasil dikirim! Terima kasih telah menghubungi Riszky.");
            contactForm.reset();
        });
    }

    // 6. Financely Demo Interactivity
    const cardholderInput = document.getElementById('demo-cardholder-input');
    const cardholderDisplay = document.getElementById('demo-cardholder-display');
    const amountInput = document.getElementById('demo-amount-input');
    const balanceDisplay = document.getElementById('demo-balance');
    const saveBtn = document.getElementById('btn-demo-save');
    const virtualCard = document.querySelector('.portfolio-virtual-card');

    let demoBalance = parseInt(localStorage.getItem('portfolio_demo_balance') || '7500000', 10);
    let cardholderName = localStorage.getItem('portfolio_demo_cardholder') || 'M. RISZKY WIBOWO';

    function formatIDR(val) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(val);
    }

    if (balanceDisplay) balanceDisplay.textContent = formatIDR(demoBalance);
    if (cardholderDisplay) cardholderDisplay.textContent = cardholderName.toUpperCase();
    if (cardholderInput) cardholderInput.value = cardholderName;

    if (cardholderInput && cardholderDisplay) {
        cardholderInput.addEventListener('input', (e) => {
            const name = e.target.value.toUpperCase() || 'M. RISZKY WIBOWO';
            cardholderDisplay.textContent = name;
            localStorage.setItem('portfolio_demo_cardholder', name);
        });
    }

    if (saveBtn && amountInput && balanceDisplay) {
        saveBtn.addEventListener('click', () => {
            const val = parseInt(amountInput.value.trim(), 10);
            if (isNaN(val) || val <= 0) {
                alert("Masukkan nominal angka yang valid!");
                return;
            }
            demoBalance += val;
            balanceDisplay.textContent = formatIDR(demoBalance);
            localStorage.setItem('portfolio_demo_balance', demoBalance);
            amountInput.value = '';
            alert("Dana sebesar " + formatIDR(val) + " berhasil disimulasikan masuk ke tabungan!");
        });
    }

    if (virtualCard) {
        virtualCard.addEventListener('mousemove', (e) => {
            const rect = virtualCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 12;
            const rotateY = ((x - centerX) / centerX) * 12;
            
            virtualCard.style.transform = `scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        virtualCard.addEventListener('mouseleave', () => {
            virtualCard.style.transform = 'scale(1) rotateX(0) rotateY(0)';
        });
    }
});

/* Personal Diary OS — interactive showcase.
   Everything here runs locally in the browser: word/char counts are real
   measurements of the textarea, autosave is a simulation. */
(function () {
    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        var input = document.getElementById('diary-input');
        if (!input) return;

        var statusEl = document.getElementById('diary-status');
        var wordsEl = document.getElementById('diary-words');
        var charsEl = document.getElementById('diary-chars');
        var verEl = document.getElementById('diary-version');
        var nodes = document.querySelectorAll('.diary-node');

        var revision = 1;
        var timer = null;

        function setStatus(text, cls) {
            statusEl.textContent = text;
            statusEl.className = 'diary-status' + (cls ? ' ' + cls : '');
        }

        function measure() {
            var text = input.value;
            var trimmed = text.trim();
            wordsEl.textContent = trimmed ? trimmed.split(/\s+/).length : 0;
            charsEl.textContent = text.length;
        }

        function lightNodes() {
            var low = input.value.toLowerCase();
            nodes.forEach(function (node) {
                var word = node.getAttribute('data-word');
                if (word) node.classList.toggle('lit', low.indexOf(word) !== -1);
            });
        }

        function commit() {
            setStatus('menyimpan…', 'saving');
            timer = setTimeout(function () {
                revision += 1;
                verEl.textContent = revision;
                setStatus('tersimpan', '');
                lightNodes();
            }, 400);
        }

        input.addEventListener('input', function () {
            measure();
            lightNodes();
            clearTimeout(timer);
            setStatus('mengetik…', 'typing');
            timer = setTimeout(commit, 700);
        });

        input.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                e.preventDefault();
                clearTimeout(timer);
                commit();
            }
        });

        nodes.forEach(function (node) {
            node.addEventListener('click', function () {
                var word = node.getAttribute('data-word');
                if (!word) return;
                var start = input.selectionStart == null ? input.value.length : input.selectionStart;
                var before = input.value.slice(0, start);
                var pad = before.length === 0 || /\s$/.test(before) ? '' : ' ';
                var insert = pad + word + ' ';
                input.value = before + insert + input.value.slice(start);
                var caret = start + insert.length;
                input.focus();
                input.setSelectionRange(caret, caret);
                input.dispatchEvent(new Event('input'));
            });
        });

        measure();
        lightNodes();

        /* Reveal the stat numbers with a short count-up when the tab opens.
           Targets come straight from the markup, so the animation can never
           show a figure the page does not already claim. */
        var statsDone = false;
        function diaryCountUp() {
            if (statsDone) return;
            statsDone = true;
            document.querySelectorAll('.diary-stat .v').forEach(function (el) {
                var m = /^(\d+(?:\.\d+)?)(.*)$/.exec(el.textContent.trim());
                if (!m) return;
                var target = parseFloat(m[1]);
                var suffix = m[2] || '';
                var decimals = (m[1].split('.')[1] || '').length;
                var start = null;
                var DURATION = 900;
                function step(ts) {
                    if (start === null) start = ts;
                    var p = Math.min((ts - start) / DURATION, 1);
                    var eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = (target * eased).toFixed(decimals) + suffix;
                    if (p < 1) requestAnimationFrame(step);
                    else el.textContent = target.toFixed(decimals) + suffix;
                }
                el.textContent = (0).toFixed(decimals) + suffix;
                if (typeof requestAnimationFrame === 'function') requestAnimationFrame(step);
                else el.textContent = target.toFixed(decimals) + suffix;
            });
        }

        var diaryTab = document.querySelector('.showcase-tab[data-target="diary"]');
        if (diaryTab) diaryTab.addEventListener('click', diaryCountUp);
    });
})();
