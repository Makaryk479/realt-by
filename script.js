/* ============ ДАННЫЕ ============ */
const OBJECTS = [
    {
        id: 1,
        title: 'Дом в пригороде',
        addr: 'Минский р-н, д. Лесная',
        price: '120 000$',
        meta: '120 м² · 2 этажа',
        cat: 'Дома',
        img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'
    },
    {
        id: 2,
        title: '2-комнатная квартира',
        addr: 'Минск, ул. Купалы 14',
        price: '65 000$',
        meta: '50 м² · 4/9 этаж',
        cat: 'Квартиры',
        img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'
    },
    {
        id: 3,
        title: 'Коммерческая недвижимость',
        addr: 'Минск, ул. Немига 5',
        price: '152 000$',
        meta: '200 м² · 1 этаж',
        cat: 'Коммерческая недвижимость',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
    }
];

let currentFilter = 'all';
let currentSearch = '';

/* ============ ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ ============ */
function go(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => {
        const onclick = n.getAttribute('onclick') || '';
        if (onclick.includes(`'${screenId}'`)) n.classList.add('active');
    });
}

/* ============ РЕНДЕР КАРТОЧЕК ============ */
function renderCards() {
    const container = document.getElementById('cardsContainer');
    let list = OBJECTS;

    if (currentFilter !== 'all') {
        list = list.filter(o => o.cat === currentFilter);
    }
    if (currentSearch.trim()) {
        const q = currentSearch.toLowerCase();
        list = list.filter(o =>
            o.title.toLowerCase().includes(q) ||
            o.addr.toLowerCase().includes(q)
        );
    }

    if (list.length === 0) {
        container.innerHTML = `<p style="text-align:center;color:#999;padding:20px;font-size:12px;">
            Ничего не найдено</p>`;
        return;
    }

    container.innerHTML = list.map(o => `
        <article class="card" onclick="openDetail(${o.id})">
            <img src="${o.img}" alt="${o.title}">
            <div class="card-info">
                <h3>${o.title}</h3>
                <p class="addr">${o.addr}</p>
                <p class="price">${o.price}</p>
                <p class="meta">${o.meta}</p>
            </div>
        </article>
    `).join('');
}

/* ============ ОТКРЫТИЕ ОБЪЕКТА ============ */
function openDetail(id) {
    const o = OBJECTS.find(x => x.id === id);
    if (!o) return;

    document.getElementById('detailImg').src = o.img;
    document.getElementById('detailTitle').textContent = o.title;
    document.getElementById('detailAddr').textContent = o.addr;
    document.getElementById('detailPrice').textContent = o.price;
    document.getElementById('detailMeta').textContent = o.meta;

    go('detail');
}

/* ============ СЕРДЕЧКО ============ */
function toggleHeart(btn) {
    btn.classList.toggle('active');
}

/* ============ ФИЛЬТР ПО КАТЕГОРИИ ============ */
function filterCat(cat) {
    currentFilter = cat;
    renderCards();
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
}

/* ============ ТАБЫ КУПИТЬ / АРЕНДА ============ */
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = 'all';
        renderCards();
    });
});

/* ============ ПОИСК ============ */
document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderCards();
});

/* ============ СТАРТ ============ */
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
});