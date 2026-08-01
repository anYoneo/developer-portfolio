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
            document.getElementById(target).classList.add('active');

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
                "Muhammad Riszky Wibowo adalah seorang System Analyst & Full Stack Developer yang berfokus pada Laravel, Python, dan arsitektur database.",
                "Riszky adalah pencipta portofolio ini, ia berpengalaman dalam pengembangan sistem informasi sekolah, integrasi Odoo, dan NLP."
            ]
        },
        {
            keywords: ['project', 'portofolio', 'aplikasi'],
            responses: [
                "Proyek utama yang ditampilkan di sini meliputi: 1) PSB Online (Laravel 11), 2) NLP Chatbot (Python/Flask), dan 3) Brazilian E-Commerce Data Analysis.",
                "Ada 3 proyek unggulan di GitHub Riszky: PSB Online, Chatbot NLP, dan Analisis Data Brazilian E-Commerce."
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
                " Brazilian E-Commerce Analysis menganalisis dataset Olist (Kaggle) menggunakan Pandas, Matplotlib, dan Seaborn untuk mendapatkan insights RFM dan tren pembayaran."
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
                "Financely adalah dashboard keuangan glassmorphism premium. Memiliki fitur visualisasi kartu debit, alokasi pengeluaran, tabungan berprogres, serta tren arus kas bulanan.",
                "Proyek terbaru saya adalah Financely Dashboard yang dibangun menggunakan React + Vite + Chart.js dengan desain antarmuka glassmorphism tingkat tinggi."
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
        return "Maaf, saya tidak mengerti maksud Anda. Anda bisa menanyakan tentang 'owner', 'project', 'PSB', atau 'analisis data'.";
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

            // Simulate bot typing delay
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

    let demoBalance = 7500000;

    function formatIDR(val) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(val);
    }

    if (cardholderInput && cardholderDisplay) {
        cardholderInput.addEventListener('input', (e) => {
            cardholderDisplay.textContent = e.target.value.toUpperCase() || 'M. RISZKY WIBOWO';
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
