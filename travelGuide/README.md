✈️ MyTravelPlanner — Personal Travel Memory & Planning App

A JavaScript travel planner that combines exploration, memory-keeping, and modern web features into a single-page application.

🌍 Overview

MyTravelPlanner is a browser-based single-page web app built with HTML, CSS, and vanilla JavaScript.
It allows users to:

Explore countries and view travel details

Track visa requirements

Add destinations to a personal travel board

Upload personal photos (stored locally)

Add a “trip vibe” Spotify song

Write notes or journaling thoughts

Mark places as visited

Store everything persistently using LocalStorage

On top of these features, the project was designed to demonstrate a deep understanding of Programming Language Design concepts, including scoping, binding, polymorphism, reflection, memory management, and more.

This project began as a course assignment and evolved into a tool I can actually use to plan future trips.

🎯 Features
🔎 Explore Destinations

Country dropdown selector

Displays capital, weather, currency, and visa info

Fetches weather using Open-Meteo API

Fetches exchange rate using open.er-api.com (1 USD → local currency)

📌 Travel Board

Add destinations to a personalized board

Upload your own photos

Add notes (handwritten style)

Attach a Spotify track that represents the vibe

Mark places as visited (card turns gold)

Remove destinations

Everything saves to LocalStorage

🎵 Spotify Integration

Paste a track URL → automatically converts into an embedded player.

🖼️ Photo Upload

Upload your own images for places you’ve visited.
Images are stored locally as Base64 — no backend required.

💾 Persistent Storage

Everything stays saved using the browser’s LocalStorage.

🧠 Technical Concepts Demonstrated

This project intentionally incorporates key JavaScript and programming language principles:

✔ Static (lexical) scoping

Understanding how JS resolves variable scope at compile time.

✔ Dynamic binding of this

Examples include method extraction, .bind(), and callback behavior.

✔ Polymorphism

Inclusion polymorphism through method overriding

Simulated ad-hoc polymorphism through flexible parameter handling

✔ Type coercion & type checking

Demonstrated through UI input handling and equality examples.

✔ Evaluation order & operator precedence

Especially in DOM rendering and string/number operations.

✔ Memory hazards

DOM reference leaks

Persistent closures

Untracked event listeners

Unbounded arrays

Objects passed by reference

✔ Reflection

Using Object.keys(), Reflect.get, Reflect.set, and inspecting object structure dynamically.

✔ Exception handling

Use of try…catch around API calls and JSON operations.

✔ Event loop & concurrency

Asynchronous APIs (fetch, async/await) and UI rendering driven by JS’s event loop.

🛠️ Tech Stack

JavaScript (ES6+)

HTML5

CSS3

LocalStorage

Open-Meteo API (Weather)

Open Exchange Rate API (open.er-api.com) (Exchange Rate)

RestCountries (Base country data)

📁 Project Structure
MyTravelPlanner/
│── index.html
│── style.css
│── app.js
│── countries.json
│── README.md
│── /img (optional personal images)

