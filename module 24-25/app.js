document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map").setView([12.8797, 121.7740], 6);
    const locationInput = document.getElementById("locationInput");
    const addLocationButton = document.getElementById("addLocationButton");
    const locationsList = document.getElementById("locationsList");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    addLocationButton.addEventListener("click", function () {
        const location = locationInput.value.trim();
        if (!location) return;

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon, display_name } = data[0];

                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                        .then(res => res.json())
                        .then(details => {
                            const countryCode = details.address.country_code?.toUpperCase();
                            const flagUrl = countryCode
                                ? `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`
                                : "https://upload.wikimedia.org/wikipedia/commons/8/84/Globe_icon.svg";

                            L.marker([lat, lon]).addTo(map).bindPopup(`<b>${display_name}</b>`).openPopup();

                            const listItem = document.createElement("li");
                            listItem.innerHTML = `<img src="${flagUrl}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/8/84/Globe_icon.svg';" alt="Flag" /> ${display_name}`;
                            locationsList.appendChild(listItem);

                            map.setView([lat, lon], 10);
                        });
                }
            });
    });
});
