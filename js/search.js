let currentLanguageFilters = new Set(["en", "mt", "scn"]);
let currentRarityFilters = new Set(["Common", "Uncommon", "Rare"]);

const root = document.documentElement;
const c1 = getComputedStyle(root).getPropertyValue('--c1');
const c2 = getComputedStyle(root).getPropertyValue('--c2');
const c3 = getComputedStyle(root).getPropertyValue('--c3');
const c4 = getComputedStyle(root).getPropertyValue('--c4');
const c5 = getComputedStyle(root).getPropertyValue('--c5');
const container = document.getElementById("items");
const resultsCount = document.getElementById("results-count");
const template = document.getElementById("template");
const popup = document.getElementById("popup");
const popupCont = document.getElementById("popup-content");
const popupEn = document.getElementById("popup-en");
const popupMt = document.getElementById("popup-mt");
const popupScn = document.getElementById("popup-scn");
const popupDesc = document.getElementById("popup-desc");
const popupImage = document.getElementById("popup-image");
const searchInput = document.getElementById("search");
const langFilters = document.querySelectorAll("#lang-filters button");
const rarityFilters = document.querySelectorAll("#rty-filters button");

let data = [];

fetch('../js/birds.json')
	.then(response => response.json())
	.then(jsonData => {
		data = jsonData;
		displayItems(data);
		updateTagColors();
	})
	.catch(error => console.error("Error loading data:", error));

function normalizeText(text) {
	return text
		.toLowerCase()
		.replace(/[żġħċ]-/g, (match) => ({ 'ż': 'z', 'ġ': 'g', 'ħ': 'h', 'ċ': 'c' })[match[0]] || match)
		.replace(/ie/g, "ie");
}

function displayItems(items) {
	container.innerHTML = "";
	const fragment = document.createDocumentFragment();

	items.forEach(item => {
		const clone = template.content.cloneNode(true);
		clone.querySelector(".en").textContent = item["en"];
		clone.querySelector(".mt").textContent = item["mt"];
		clone.querySelector(".scn").textContent = item["scn"];
		clone.querySelector(".item").style.backgroundImage = `url('${item["smallImg"]}')`;
		clone.querySelector(".more").addEventListener("click", () => showPopup(item));
		fragment.appendChild(clone);
	});
	container.appendChild(fragment);

	const resultText = items.length === 1 ? "1" : `${items.length}`;
	resultsCount.textContent = resultText;
}

function showPopup(item) {
	popupEn.textContent = item["en"];
	popupMt.textContent = item["mt"];
	popupScn.textContent = item["scn"];
	popupDesc.textContent = item["desc"];
	popupCont.style.left = `${e.clientX}px`;
	popupCont.style.top = `${e.clientY}px`;
	popupCont.style.transform = `scale(${0})`;
	popup.style.display = "flex";
	document.body.classList.add("no-scroll");
}

popup.addEventListener("click", (event) => {
	if (event.target === popup) {
		popup.style.display = "none";
		document.body.classList.remove("no-scroll");
	}
});

document.getElementById("close-popup").addEventListener("click", () => {
	popup.style.display = "none";
	document.body.classList.remove("no-scroll");
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && popup.style.display === "flex") {
        popup.style.display = "none";
        document.body.classList.remove("no-scroll");
    }
});

function filterItems(query) {
	return data.filter(item => {
		const matchesQuery = (
			(currentLanguageFilters.size === 0 ||
				(currentLanguageFilters.has("en") && normalizeText(item["en"]).includes(query)) ||
				(currentLanguageFilters.has("mt") && normalizeText(item["mt"]).includes(query)) ||
				(currentLanguageFilters.has("scn") && normalizeText(item["scn"]).includes(query)))
		);

		const matchesRarity = currentRarityFilters.size === 0 || currentRarityFilters.has(item["rty"]);
		return matchesQuery && matchesRarity;
	});
}

searchInput.addEventListener("input", debounce(function() {
	const query = normalizeText(this.value);
	displayItems(filterItems(query));
	updateTagColors();
}, 300));

function debounce(func, wait) {
	let timeout;
	return function(...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}

function updateTagColors() {
	langFilters.forEach(button => {
		const filterKey = button.id.split("-")[0];
		button.classList.toggle("active", currentLanguageFilters.has(filterKey));
	});

	rarityFilters.forEach(button => {
		const rarityKey = button.id.split("-")[0];
		const formattedRarity = rarityKey.charAt(0).toUpperCase() + rarityKey.slice(1);
		button.classList.toggle("active", currentRarityFilters.has(formattedRarity));
	});
}

function toggleFilter(set, filter, query) {
	if (set.has(filter) && set.size === 1) return;
	set.has(filter) ? set.delete(filter) : set.add(filter);
	displayItems(filterItems(query));
	updateTagColors();
}

function handleFilterClick(event, set, filter) {
	const query = normalizeText(searchInput.value);
	toggleFilter(set, filter, query);
}

document.querySelector("#filter-toggle").addEventListener("click", function () {
    const filters = document.querySelector("#filters");

    if (filters.classList.contains("clip")) {
        filters.classList.remove("clip");
        filters.classList.add("undoClip");
		filters.style.visibility = "visible";
    } else {
        filters.classList.remove("undoClip");
        filters.classList.add("clip");
    }
});

document.getElementById("en-filter").addEventListener("click", (event) => handleFilterClick(event, currentLanguageFilters, "en"));
document.getElementById("mt-filter").addEventListener("click", (event) => handleFilterClick(event, currentLanguageFilters, "mt"));
document.getElementById("scn-filter").addEventListener("click", (event) => handleFilterClick(event, currentLanguageFilters, "scn"));
document.getElementById("common-filter").addEventListener("click", (event) => handleFilterClick(event, currentRarityFilters, "Common"));
document.getElementById("uncommon-filter").addEventListener("click", (event) => handleFilterClick(event, currentRarityFilters, "Uncommon"));
document.getElementById("rare-filter").addEventListener("click", (event) => handleFilterClick(event, currentRarityFilters, "Rare"));