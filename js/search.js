let currentLanguageFilters = new Set(["en", "mt", "scn"]);
let currentRarityFilters = new Set(["Common", "Uncommon", "Rare"]);

const root = document.documentElement;

const container = document.getElementById("items");

const template = document.getElementById("template");

const popup = document.getElementById("popup");
const popupCont = document.getElementById("popup-content");
const popupEn = document.getElementById("popup-en");
const popupMt = document.getElementById("popup-mt");
const popupScn = document.getElementById("popup-scn");
const popupOrder = document.getElementById("popup-order");
const popupFamily = document.getElementById("popup-family");
const popupGenus = document.getElementById("popup-genus");
const popupStatus = document.getElementById("popup-status");
const popupDesc = document.getElementById("popup-desc");
const popupImg = document.getElementById("popup-img");
const popupCredit = document.getElementById("popup-credit");

const langFilters = document.querySelectorAll("#lang-filters button");
const rarityFilters = document.querySelectorAll("#rty-filters button");
const searchInput = document.getElementById("search");
const resultsCount = document.getElementById("results-count");
const backToTop = document.getElementById("go-top");


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
		.replace(/[żġħċ]/g, (match) => ({ 'ż': 'z', 'ġ': 'g', 'ħ': 'h', 'ċ': 'c' }[match]))
		.replace(/-/g, " ");
}

function displayItems(items) {
	container.innerHTML = "";
	const fragment = document.createDocumentFragment();

	items.forEach(item => {
		const clone = template.content.cloneNode(true);
		clone.querySelector(".en").textContent = item["en"];
		clone.querySelector(".mt").textContent = item["mt"];
		clone.querySelector(".scn").textContent = item["scn"];
		clone.querySelector(".credit").textContent = "Image credit: "+item["credit"];
		clone.querySelector(".item").style.backgroundImage = `url('${item["smallImg"]}')`;
		clone.querySelector(".item").addEventListener("click", () => showPopup(item));
		fragment.appendChild(clone);
	});
	container.appendChild(fragment);

	const resultText = items.length === 1 ? "1" : `${items.length}`;
	resultsCount.textContent = resultText;
}

function showPopup(item) {
    document.body.classList.add("no-scroll");

    popupEn.textContent = item["en"];
    popupMt.textContent = item["mt"];
    popupScn.textContent = item["scn"];
    popupDesc.textContent = item["desc"];
    popupStatus.textContent = item["status"];
    popupOrder.textContent = item["order"];
    popupFamily.textContent = item["family"];
    popupGenus.textContent = item["genus"];
	popupImg.style.visibility = "hidden";
	popupImg.src = item["img"];
	popupCredit.textContent = item["credit"];
	popupCredit.href = item["source"];
    popup.style.display = "flex";

    document.querySelectorAll("#popup-statuses h3").forEach(el => el.classList.remove("statusSelected"));

    const statusMap = {
        "Extinct": "ex",
        "Extinct in the Wild": "ew",
        "Critically Endangered": "cr",
        "Endangered": "en",
        "Vulnerable": "vu",
        "Near Threatened": "nt",
        "Least Concern": "lc"
    };

    const statusKey = item["status"]?.trim();

    if (statusKey !== "No Data" && statusMap[statusKey]) {
        document.getElementById(statusMap[statusKey]).classList.add("statusSelected");
    }
}

popupImg.onload = function() {
    popupImg.style.visibility = 'visible';
};

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

backToTop.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("en-filter").addEventListener("click", (event) => handleFilterClick(event, currentLanguageFilters, "en"));
document.getElementById("mt-filter").addEventListener("click", (event) => handleFilterClick(event, currentLanguageFilters, "mt"));
document.getElementById("scn-filter").addEventListener("click", (event) => handleFilterClick(event, currentLanguageFilters, "scn"));
document.getElementById("common-filter").addEventListener("click", (event) => handleFilterClick(event, currentRarityFilters, "Common"));
document.getElementById("uncommon-filter").addEventListener("click", (event) => handleFilterClick(event, currentRarityFilters, "Uncommon"));
document.getElementById("rare-filter").addEventListener("click", (event) => handleFilterClick(event, currentRarityFilters, "Rare"));