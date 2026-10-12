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
            keywords: ['alphadigest', 'swarm', 'saham', 'idx', 'bei', 'agen', 'financial', 'dcf', 'investasi'],
            responses: [
                "AlphaDigest adalah Autonomous IDX Financial Intelligence Swarm buatan Riszky: 8 agen AI spesialis yang memantau & menganalisis laporan keuangan BEI secara adaptif (10 sektor), valuasi DCF 3-stage, dan integrasi Obsidian.",
                "AlphaDigest mengadopsi 3-Layer Extraction Framework: Core Financials, KPI Operasional Sektoral (NIM/NPL/Strip Ratio), dan Intelegensi Kualitatif Catatan Kaki/Auditor bebas halusinasi."
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
                "Proyek unggulan yang ditampilkan meliputi: 1) AlphaDigest (Autonomous IDX Multi-Agent Swarm), 2) VeriMatch Enterprise (NestJS & PostgreSQL), 3) Personal Diary OS, 4) PSB Online, dan 5) Financely v2.",
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
        var everFocused = false;
        input.addEventListener('focus', function () { everFocused = true; });

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
                /* Until the visitor has put a caret in the editor, "insert at the
                   caret" would silently prepend to the top of the text and look
                   like nothing happened. Append at the end instead. */
                var start = everFocused && input.selectionStart != null
                    ? input.selectionStart
                    : input.value.length;
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
    
    // 7. AlphaDigest Interactive Swarm Sector Inspector
    const swarmSectorData = {
        'banking': {
            name: 'Perbankan & Multifinance',
            tickers: 'BBCA, BBRI, BMRI, BBNI',
            status: '● 3-Layer Verified (OJK/BEI)',
            agents: ['🔍 IDX Scraper', '📄 3-Layer Extractor', '📊 Bank Summarizer', '📈 3-Stage DCF', '⚠️ Risk & QC Sign'],
            core: {
                rev: 'Rp 112,4 Triliun (+12.4% YoY)',
                profit: 'Rp 54,8 Triliun (+14.1% YoY)',
                fcf: 'Rp 68,2 Triliun (+9.8%)'
            },
            kpis: [
                { label: 'Net Interest Margin (NIM)', val: '5.8% (Optimal)' },
                { label: 'NPL Gross / Net', val: '1.9% / 0.6% (Sehat)' },
                { label: 'CASA Ratio', val: '81.4% (Tinggi)' },
                { label: 'Capital Adequacy (CAR)', val: '27.3% (Sangat Kuat)' },
                { label: 'Cost of Funds (CoF)', val: '2.1% (Efisien)' }
            ],
            qualitative: {
                auditor: 'Wajar Tanpa Pengecualian (WTP) - Big 4',
                governance: 'Model ECL PSAK 71 memadai, Coverage ratio > 220%',
                guidance: 'Target loan growth 10-12%, payout dividen 70%+'
            },
            valuation: {
                fairValue: 'Rp 11.200 / saham',
                marketPrice: 'Rp 9.850',
                mos: '+13.7%',
                signal: '🟢 UNDERVALUED'
            }
        },
        'mining': {
            name: 'Pertambangan & Logam',
            tickers: 'ANTM, PTBA, BYAN, AMMN',
            status: '● 3-Layer Verified (ESDM/BEI)',
            agents: ['🔍 IDX Scraper', '📄 Commodity Extractor', '⛏️ Mining Specialist', '📈 Multiple DCF', '🌿 ESG & QC Sign'],
            core: {
                rev: 'Rp 48,6 Triliun (+8.2% YoY)',
                profit: 'Rp 11,3 Triliun (+18.5% YoY)',
                fcf: 'Rp 14,7 Triliun (+21.0%)'
            },
            kpis: [
                { label: 'Volume Produksi Batubara / Bijih', val: '41,2 Juta Ton (Target Met)' },
                { label: 'Cash Cost per Ton', val: '$44.8 / ton (Low-Quartile)' },
                { label: 'Average Selling Price (ASP)', val: '$88.5 / ton (Positive)' },
                { label: 'Stripping Ratio', val: '4.8x bcm/ton (Normal)' },
                { label: 'Proven Ore Reserves', val: '318 Mton (Long-Life Mine)' }
            ],
            qualitative: {
                auditor: 'Wajar Tanpa Pengecualian (WTP)',
                governance: 'Kepatuhan DMO 100%, dana jaminan reklamasi telah dialokasikan',
                guidance: 'Progres smelter HPAL fase 2 mencapai 78% COD Q3'
            },
            valuation: {
                fairValue: 'Rp 2.450 / saham',
                marketPrice: 'Rp 1.780',
                mos: '+37.6%',
                signal: '🟢 UNDERVALUED (Strong Buy)'
            }
        },
        'property': {
            name: 'Properti & Kawasan',
            tickers: 'PANI, BSDE, CTRA, SMRA',
            status: '● 3-Layer Verified (ATR/BPN/BEI)',
            agents: ['🔍 IDX Scraper', '📄 Landbank Extractor', '🏢 Property Analyst', '📈 NAV/DCF Engine', '⚠️ Credit Risk Sign'],
            core: {
                rev: 'Rp 14,2 Triliun (+24.1% YoY)',
                profit: 'Rp 3,8 Triliun (+31.0% YoY)',
                fcf: 'Rp 4,1 Triliun (+15.2%)'
            },
            kpis: [
                { label: 'Marketing Sales / Presales', val: 'Rp 9,8 Triliun (Top-Tier)' },
                { label: 'Total Landbank Terkumpul', val: '5.420 Hektar (Massive)' },
                { label: 'Revenue Backlog Terjamin', val: 'Rp 12,6 Triliun (Secured)' },
                { label: 'Take-Up Rate Kawasan', val: '86.4% (Optimal)' },
                { label: 'Net Gearing Ratio', val: '0.24x (Sangat Sehat)' }
            ],
            qualitative: {
                auditor: 'Wajar Tanpa Pengecualian (WTP)',
                governance: 'Sertifikasi HGB murni entitas grup, bebas sengketa lahan konsesi',
                guidance: 'Peluncuran township baru 300 Ha & ekspansi waterfront city'
            },
            valuation: {
                fairValue: 'Rp 18.500 / saham',
                marketPrice: 'Rp 14.900',
                mos: '+24.1%',
                signal: '🟢 UNDERVALUED (Growth Play)'
            }
        },
        'energy': {
            name: 'Energi & Utilitas',
            tickers: 'PGEO, MEDC, ESSA, ENRG',
            status: '● 3-Layer Verified (PLN PPA/BEI)',
            agents: ['🔍 IDX Scraper', '📄 PPA Extractor', '⚡ Energy Specialist', '📈 3-Stage DCF', '⚠️ Sovereign Risk Sign'],
            core: {
                rev: 'USD 428 Juta (+6.8% YoY)',
                profit: 'USD 163 Juta (+12.4% YoY)',
                fcf: 'USD 215 Juta (+8.9%)'
            },
            kpis: [
                { label: 'Kapasitas Terpasang Total', val: '1.877 MW (Dominant)' },
                { label: 'Capacity Factor Operasional', val: '97.2% (World-Class)' },
                { label: 'Tarif PPA Listrik/Uap', val: 'USD 0.076 / kWh (Hedged)' },
                { label: 'Sisa Durasi Kontrak PPA', val: '28 Tahun (Long-Term Annuity)' },
                { label: 'EBITDA Margin', val: '83.5% (High Margin)' }
            ],
            qualitative: {
                auditor: 'Wajar Tanpa Pengecualian (WTP)',
                governance: 'Sovereign Guarantee pemerintah atas kontrak pasokan uap PLN',
                guidance: 'Eksplorasi sumur baru 55 MW COD on track kuartal depan'
            },
            valuation: {
                fairValue: 'Rp 1.480 / saham',
                marketPrice: 'Rp 1.190',
                mos: '+24.3%',
                signal: '🟢 UNDERVALUED (Clean Energy)'
            }
        },
        'telco': {
            name: 'Telekomunikasi & Cloud',
            tickers: 'TLKM, ISAT, EXCL, TOWR',
            status: '● 3-Layer Verified (Kominfo/BEI)',
            agents: ['🔍 IDX Scraper', '📄 ARPU Extractor', '📡 Telco Specialist', '📈 Multiples DCF', '⚠️ CapEx Auditor Sign'],
            core: {
                rev: 'Rp 151,2 Triliun (+4.1% YoY)',
                profit: 'Rp 24,9 Triliun (+3.8% YoY)',
                fcf: 'Rp 38,4 Triliun (+6.2%)'
            },
            kpis: [
                { label: 'Blended ARPU Seluler', val: 'Rp 48.500 / bln (Rising)' },
                { label: 'Total Pelanggan Broadband', val: '162 Juta Pelanggan (Huge)' },
                { label: 'Tenancy Ratio Menara', val: '1.89x (Optimal)' },
                { label: 'Jangkauan Fiber Optic', val: '178.000 Km (Nationwide)' },
                { label: 'EBITDA Margin', val: '51.8% (Solid)' }
            ],
            qualitative: {
                auditor: 'Wajar Tanpa Pengecualian (WTP)',
                governance: 'BHP spektrum frekuensi telah dibayar tuntas, merger tower efisien',
                guidance: 'Monetisasi data center hyperscale & roll-out B2B AI cloud'
            },
            valuation: {
                fairValue: 'Rp 4.250 / saham',
                marketPrice: 'Rp 3.120',
                mos: '+36.2%',
                signal: '🟢 UNDERVALUED (Defensive Value)'
            }
        }
    };

    const sectorBtns = document.querySelectorAll('.swarm-sector-btn');
    if (sectorBtns.length > 0) {
        sectorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sectorBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const sectorKey = btn.dataset.sector;
                const d = swarmSectorData[sectorKey];
                if (!d) return;

                // Update UI elements
                const tickersEl = document.getElementById('swarm-tickers');
                const revEl = document.getElementById('swarm-core-rev');
                const profitEl = document.getElementById('swarm-core-profit');
                const fcfEl = document.getElementById('swarm-core-fcf');
                const kpiListEl = document.getElementById('swarm-kpi-list');
                const qualEl = document.getElementById('swarm-qual-content');
                const fairEl = document.getElementById('swarm-val-fair');
                const marketEl = document.getElementById('swarm-val-market');
                const mosEl = document.getElementById('swarm-val-mos');
                const signalEl = document.getElementById('swarm-val-signal');
                const relayEl = document.getElementById('swarm-relay-container');
                const badgeEl = document.getElementById('swarm-active-badge');

                if (tickersEl) tickersEl.textContent = d.tickers;
                if (revEl) revEl.textContent = d.core.rev;
                if (profitEl) profitEl.textContent = d.core.profit;
                if (fcfEl) fcfEl.textContent = d.core.fcf;
                if (badgeEl) badgeEl.textContent = d.status;

                if (kpiListEl) {
                    kpiListEl.innerHTML = d.kpis.map(k => 
                        `<div class="swarm-kpi-row"><span class="swarm-kpi-label">${k.label}:</span><span class="swarm-kpi-val">${k.val}</span></div>`
                    ).join('');
                }

                if (qualEl) {
                    qualEl.innerHTML = `
                        <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">Opini Auditor:</strong> ${d.qualitative.auditor}</p>
                        <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">Governance:</strong> ${d.qualitative.governance}</p>
                        <p style="margin: 0;"><strong style="color: var(--text-primary);">Guidance Manajemen:</strong> ${d.qualitative.guidance}</p>
                    `;
                }

                if (fairEl) fairEl.textContent = d.valuation.fairValue;
                if (marketEl) marketEl.textContent = d.valuation.marketPrice;
                if (mosEl) mosEl.innerHTML = `<i class="bi bi-shield-shaded"></i> Margin of Safety (MOS): ${d.valuation.mos}`;
                if (signalEl) signalEl.textContent = d.valuation.signal;

                if (relayEl) {
                    relayEl.innerHTML = d.agents.map((ag, idx) => 
                        `<span class="swarm-agent-tag"${idx === d.agents.length - 1 ? ' style="border-color: rgba(245, 158, 11, 0.4); color: #f59e0b;"' : ''}>${ag}</span>` +
                        (idx < d.agents.length - 1 ? '<span style="color: var(--text-secondary); font-size: 0.7rem;">➔</span>' : '')
                    ).join(' ');
                }
            });
        });
    }

});

})();

