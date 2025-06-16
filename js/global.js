document.querySelector("#nav-toggle").addEventListener("click", function () {
    const filters = document.querySelector("nav");
    
    if (filters.classList.contains("collapseNav")) {
        filters.classList.remove("collapseNav");
        filters.classList.add("expandNav");
        filters.style.visibility = "visible";
    } else {
        filters.classList.remove("expandNav");
        filters.classList.add("collapseNav");
    }
});

//LANGUAGE

const defaultLang = 'en';
const langToggle = document.getElementById('langToggle');
const storedLang = localStorage.getItem('lang') || defaultLang;

function setLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.hidden = el.getAttribute('data-lang') !== lang;
    });
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    
    if (langToggle) {
        langToggle.textContent = lang === 'en' ? '🇬🇧' : '🇲🇹';
    }
    
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.placeholder = lang === 'en' ? 'Search for birds...' : 'Fittex għall-għasafar...';
    }
}

if (langToggle) {
    langToggle.addEventListener('click', () => {
        const currentLang = localStorage.getItem('lang') || defaultLang;
        const newLang = currentLang === 'en' ? 'mt' : 'en';
        setLanguage(newLang);
    });
}

setLanguage(storedLang);

//BORDER TOGGLE

const borderToggle = document.getElementById('borderToggle');
const borderPref = 'borderVisible';

function setBorderState(visible) {
    document.querySelectorAll('[data-border]').forEach(el => {
        el.style.border = visible ? '3px solid #fff' : 'none';
    });
    
    localStorage.setItem(borderPref, visible ? 'true' : 'false');
}

if (borderToggle) {
    borderToggle.addEventListener('click', () => {
        const current = localStorage.getItem(borderPref) === 'true';
        setBorderState(!current);
    });
}

setBorderState(localStorage.getItem(borderPref) === 'true');

//PERFORMANCE TOGGLE

const perfToggle = document.getElementById('perfToggle');
const perfPref = 'true';

function setPerfState(on) {
    document.querySelectorAll('[data-taxing]').forEach(el => {
        el.classList.toggle('performance', on);
    });
    
    localStorage.setItem(perfPref, on ? 'true' : 'false');
}

if (perfToggle) {
    perfToggle.addEventListener('click', () => {
        const current = localStorage.getItem(perfPref) === 'true';
        setPerfState(!current);
    });
}

setPerfState(localStorage.getItem(perfPref) === 'true');