document.querySelector("#nav-toggle").addEventListener("click", function () {
    const filters = document.querySelector("nav");
    
    if (filters.classList.contains("collapse")) {
        filters.classList.remove("collapse");
        filters.classList.add("expand");
        filters.style.visibility = "visible";
    } else {
        filters.classList.remove("expand");
        filters.classList.add("collapse");
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
        console.log("HEY");
    });
}

setBorderState(localStorage.getItem(borderPref) === 'true');