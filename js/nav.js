document.addEventListener("DOMContentLoaded", async function () {
    const header = document.createElement("header");

    const logo = document.createElement("a");
    logo.href = "";
    logo.id = "logo";
    const logoImg = document.createElement("img");
    logoImg.src = "images/ui/logo.svg";
    logo.appendChild(logoImg);

    const navToggle = document.createElement("div");
    navToggle.id = "nav-toggle";
    const navImg = document.createElement("img");
    navImg.src = "images/ui/nav.svg";
    navToggle.appendChild(navImg);

    const nav = document.createElement("nav");
    nav.classList.add("collapse");
    nav.style.visibility = "hidden";

    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const isBaseIndex = pathSegments.length === 0 || (pathSegments.length === 1 && pathSegments[0] === "index.html");
    const relativePrefix = isBaseIndex ? "" : "../";

    try {
        const response = await fetch(relativePrefix + "nav.json");
        if (!response.ok) throw new Error("Failed to fetch navigation");
        const navItems = await response.json();

        navItems.forEach(item => {
            const link = document.createElement("a");
            link.href = relativePrefix + item.url;
            link.textContent = item.name;

            const normalizedUrl = item.url.replace(/\/$/, "");
            if (normalizedUrl === pathSegments[pathSegments.length - 1]) {
                link.id = "selected";
            }

            nav.appendChild(link);
        });

    } catch (error) {
        console.error(error);
    }

    header.appendChild(logo);
    header.appendChild(navToggle);
    header.appendChild(nav);

    document.body.insertBefore(header, document.body.firstChild);
});

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