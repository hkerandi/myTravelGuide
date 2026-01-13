/* ===========================================================
   LOAD COUNTRY LIST FROM LOCAL JSON
============================================================ */

async function loadCountryList() {
    try {
        const res = await fetch("countries.json");
        const data = await res.json();

        console.log("Countries loaded:", data.length);

        const select = document.getElementById("countrySelect");
        data.sort().forEach(name => {
            const opt = document.createElement("option");
            opt.value = name;
            opt.textContent = name;
            select.appendChild(opt);
        });

    } catch (err) {
        console.error("Dropdown failed:", err);
    }
}

loadCountryList();



/* ============================================================
   DESTINATION STORAGE
============================================================ */

let destinations = JSON.parse(localStorage.getItem("destinations")) || [];

function saveDestinations() {
    localStorage.setItem("destinations", JSON.stringify(destinations));
}



/* ============================================================
   WHEN USER CLICKS EXPLORE
============================================================ */

document.getElementById("exploreBtn").addEventListener("click", () => {
    let name = document.getElementById("countrySelect").value;
    showCountryInfo(name);
});



/* ============================================================
   DISPLAY COUNTRY INFO (NO STRESS APIs)
============================================================ */

async function showCountryInfo(name) {
    try {
        // RestCountries → SAFE API
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const data = await res.json();
        const c = data[0];

        const countryDiv = document.getElementById("countryInfo");

        let capital = c.capital ? c.capital[0] : "N/A";
        let currencyCode = Object.keys(c.currencies)[0];
        

	// Exchange rate (1 USD → currency)
	let usdToCurrency = "N/A";

	try {
    	const resEx = await fetch("https://open.er-api.com/v6/latest/USD");
    	const jsonEx = await resEx.json();

    	if (jsonEx.rates[currencyCode]) {
        	usdToCurrency = jsonEx.rates[currencyCode];  // Already 1 USD = X currency
    	}	
	} catch {
    	usdToCurrency = "N/A";
}



	let temp = "Loading…";

        // weather from Open-Meteo (SAFE)
        const lat = c.latlng[0];
        const lon = c.latlng[1];

        try {
            const w = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
            );
            const wJson = await w.json();
            temp = wJson.current_weather.temperature;
        } catch {
            temp = "N/A";
        }

        // preview card
        countryDiv.innerHTML = `
            <h3>${c.name.common}</h3>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Weather:</strong> ${temp}°C</p>
            <p><strong>Currency:</strong> ${currencyCode}</p>
	    <p><strong>1 USD = ${usdToCurrency} ${currencyCode}</strong></p>

            <label for="visaSelect"><strong>Visa Type:</strong></label>
            <select id="visaSelect">
                <option>No Visa Needed</option>
                <option>eVisa</option>
                <option>Visa on Arrival</option>
                <option>Visa Required</option>
            </select>

            <button id="addBtn">Add to My Travel Board</button>
        `;

        // button saves destination
        document.getElementById("addBtn").onclick = () => {
            addDestination({
                id: Date.now(),
                name: c.name.common,
                capital,
                weather: temp,
                currency: currencyCode,
		rate: usdToCurrency,
		visa: document.getElementById("visaSelect").value,
                img: "",           // empty until user uploads
                spotify: "",
                notes: "",
                visited: false
            });
        };

    } catch (err) {
        console.error("Explore error:", err);
        document.getElementById("countryInfo").innerHTML = `
            <p style="color:red">Something went wrong ❌</p>
        `;
    }
}



/* ============================================================
   ADD DESTINATION
============================================================ */

function addDestination(dest) {
    destinations.push(dest);
    saveDestinations();
    displayDestinations();
}



/* ============================================================
   DISPLAY ALL DESTINATIONS
============================================================ */

function displayDestinations() {
    const board = document.getElementById("destBoard");
    board.innerHTML = "";

    destinations.forEach(dest => {
        let card = document.createElement("div");
        card.className = "dest-card" + (dest.visited ? " visited" : "");

        card.innerHTML = `
            <!-- Photo -->
            ${dest.img
                ? `<img class="dest-img" src="${dest.img}">`
                : `<div class="photo-placeholder">📸 No Photo</div>`}

            <div class="dest-content">
                <h3 class="dest-title">${dest.name}</h3>

                <p><strong>Weather:</strong> ${dest.weather}°C</p>
                <p><strong>Currency:</strong> ${dest.currency}</p>
		<p><strong>1 USD = ${dest.rate} ${dest.currency}</strong></p>
    
                <p><strong>Visa:</strong> ${dest.visa}</p>

                <!-- Upload button -->
                <label class="upload-btn">
                    + Add Photo
                    <input type="file" accept="image/*"
                        onchange="changePhoto(${dest.id}, event)">
                </label>

                <!-- Spotify -->
                <input type="text" 
                       placeholder="Paste Spotify track URL"
                       class="spotify-input"
                       id="spotify-${dest.id}">
                <button onclick="addSpotify(${dest.id})">Add Song</button>

                ${dest.spotify ? `
                    <iframe class="spotify-player"
                        src="${dest.spotify}"
                        width="100%" height="80" frameborder="0"
                        allow="autoplay; encrypted-media">
                    </iframe>
                ` : ""}

                <!-- Notes -->
                <p><strong>Notes:</strong></p>
                <textarea class="notes" id="notes-${dest.id}"
                    oninput="updateNotes(${dest.id})"
                >${dest.notes}</textarea>

                <!-- Buttons -->
                <button onclick="toggleVisited(${dest.id})">
                    ${dest.visited ? "Mark Unvisited" : "Mark Visited"}
                </button>

                <button class="remove-btn"
                        onclick="removeDestination(${dest.id})">
                    Remove
                </button>
            </div>
        `;

        board.appendChild(card);
    });
}

displayDestinations();



/* ============================================================
   PHOTO UPLOAD HANDLER
============================================================ */

function changePhoto(id, event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        let dest = destinations.find(d => d.id === id);
        dest.img = reader.result;
        saveDestinations();
        displayDestinations();
    };
    reader.readAsDataURL(file);
}



/* ============================================================
   SPOTIFY EMBED HANDLER
============================================================ */

function addSpotify(id) {
    let input = document.getElementById(`spotify-${id}`).value.trim();
    if (!input.includes("spotify.com/track")) {
        alert("Please paste a valid Spotify track URL");
        return;
    }

    let trackID = input.split("track/")[1].split("?")[0];
    let embed = `https://open.spotify.com/embed/track/${trackID}`;

    let dest = destinations.find(d => d.id === id);
    dest.spotify = embed;

    saveDestinations();
    displayDestinations();
}



/* ============================================================
   DESTINATION EDIT FUNCTIONS
============================================================ */

function updateNotes(id) {
    let dest = destinations.find(d => d.id === id);
    dest.notes = document.getElementById(`notes-${id}`).value;
    saveDestinations();
}

function toggleVisited(id) {
    let dest = destinations.find(d => d.id === id);
    dest.visited = !dest.visited;
    saveDestinations();
    displayDestinations();
}

function removeDestination(id) {
    destinations = destinations.filter(d => d.id !== id);
    saveDestinations();
    displayDestinations();
}

