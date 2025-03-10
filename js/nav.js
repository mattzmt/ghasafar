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