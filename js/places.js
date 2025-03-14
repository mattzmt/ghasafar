const root = document.documentElement;
const container = document.getElementById("places");
const template = document.getElementById("template");

let data = [];

fetch('../js/places.json')
	.then(response => response.json())
	.then(jsonData => {
		console.log("Loaded data:", jsonData);
		data = jsonData;
		displayItems(data);
	})
	.catch(error => console.error("Error loading data:", error));

function displayItems(places) {
	container.innerHTML = "";
	const fragment = document.createDocumentFragment();

	places.forEach(item => {
		const clone = template.content.cloneNode(true);
		clone.querySelector(".name").textContent = item["name"];
		clone.querySelector(".owner").textContent = item["owner"];
		const loc = clone.querySelector(".loc");
		loc.insertBefore(document.createTextNode(item["loc"] + " "), locElement.firstChild);
		clone.querySelector(".place").style.backgroundImage = `url('${item["smallImg"]}')`;
		clone.querySelector(".more").addEventListener("click", () => showPopup(item));
		fragment.appendChild(clone);
	});
	container.appendChild(fragment);
}