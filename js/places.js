const root = document.documentElement;
const container = document.getElementById("places");
const template = document.getElementById("template");
const backToTop = document.getElementById("go-top");

let data = [];

fetch('../js/places.json')
	.then(response => response.json())
	.then(jsonData => {
		data = jsonData;
		displayplaces(data);
		updateTagColors();
	})
	.catch(error => console.error("Error loading data:", error));

function displayplaces(places) {
	container.innerHTML = "";
	const fragment = document.createDocumentFragment();

	places.forEach(item => {
		const clone = template.content.cloneNode(true);
		clone.querySelector(".name").textContent = item["name"];
		clone.querySelector(".desc").textContent = item["desc"];
		clone.querySelector(".place").style.backgroundImage = `url('${item["smallImg"]}')`;
		clone.querySelector(".more").addEventListener("click", () => showPopup(item));
		fragment.appendChild(clone);
	});
	container.appendChild(fragment);

	const resultText = places.length === 1 ? "1" : `${places.length}`;
	resultsCount.textContent = resultText;
}

backToTop.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});