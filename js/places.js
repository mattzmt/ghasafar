const container=document.getElementById(places);

let data = [];

fetch('../js/birds.json')
	.then(response => response.json())
	.then(jsonData => {
		data = jsonData;
		displayItems(data);
		updateTagColors();
	})
	.catch(error => console.error("Error loading data:", error));

function displayItems(items) {
	container.innerHTML = "";
	const fragment = document.createDocumentFragment();

	items.forEach(item => {
		const clone = template.content.cloneNode(true);
		clone.querySelector(".name").textContent = item["name"];
		clone.querySelector(".desc").textContent = item["desc"];
		clone.querySelector(".place").style.backgroundImage = `url('${item["smallImg"]}')`;
		clone.querySelector(".more").addEventListener("click", () => showPopup(item));
		fragment.appendChild(clone);
	});
	container.appendChild(fragment);

	const resultText = items.length === 1 ? "1" : `${items.length}`;
	resultsCount.textContent = resultText;
}