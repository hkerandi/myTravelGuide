
# ✈️ **MyTravelPlanner — Personal Travel Memory & Planning App**

A browser-based travel planner that blends exploration, memory-keeping, personalization, and modern JavaScript engineering. Built as a single-page application (SPA) using only **HTML, CSS, and vanilla JavaScript** — no frameworks.

---

## 🌍 **Overview**

**MyTravelPlanner** helps users plan trips, store memories, and interact with travel data in a beautiful, intuitive interface.
Users can:

* Explore countries and view travel details
* Check visa requirements
* Add destinations to a personalized travel board
* Upload photos (stored locally — no backend needed)
* Attach a “trip vibe” Spotify track
* Write notes or journal entries
* Mark destinations as visited
* Persist all data using **LocalStorage**

Beyond being a functional travel app, this project was intentionally engineered to showcase deep understanding of **Programming Language Design** concepts — scoping, binding, polymorphism, reflection, memory management, and more.

Originally created for a course, the project evolved into a tool I now use for planning real trips.

---

## 🎯 **Features**

### 🔎 **Explore Destinations**

* Country dropdown selector
* Displays **capital**, **currency**, **weather**, **visa info**
* Weather via **Open-Meteo API**
* Exchange rates via **open.er-api.com**
* Clean, dynamic UI

---

### 📌 **Personal Travel Board**

Users can:

* Add destinations to a custom board
* Upload personal trip photos
* Write notes in a handwritten-style UI
* Attach a Spotify track for the “trip vibe”
* Mark destinations as **visited** (card turns gold ✨)
* Remove destinations
* Automatically save everything to **LocalStorage**

---

### 🎵 **Spotify Integration**

Paste any Spotify track URL → automatically embeds a playable track.

---

### 🖼️ **Photo Upload**

Upload images that are converted to **Base64** strings and stored locally.

---

### 💾 **Persistent Storage**

All data — photos, notes, songs, and visited status — persists using **LocalStorage**, making the app fully offline-friendly.

---

## 🧠 **Programming Language Concepts Demonstrated**

This project intentionally highlights core principles from programming language theory:

### ✔ **Static (Lexical) Scoping**

Understanding how JavaScript resolves variable scope at compile time.

### ✔ **Dynamic Binding of `this`**

Including:

* Method extraction
* `bind()` usage
* Callback context handling

### ✔ **Polymorphism**

* Inclusion polymorphism (method overriding)
* Simulated ad-hoc polymorphism via flexible parameter handling

### ✔ **Type Coercion & Checking**

Managing user inputs, runtime type issues, and equality decisions.

### ✔ **Evaluation Order & Operator Precedence**

Especially in DOM updates and async UI rendering.

### ✔ **Memory Hazards Identified & Mitigated**

* DOM reference leaks
* Persistent closures
* Unbounded arrays
* Event listeners that can accumulate
* Objects passed by reference unexpectedly

### ✔ **Reflection**

Use of:

* `Object.keys()`
* `Reflect.get()` / `Reflect.set()`
* Dynamic inspection of objects

### ✔ **Exception Handling**

`try…catch` for API calls, JSON parsing, and data failures.

### ✔ **Event Loop & Concurrency**

Handling:

* `fetch` API
* `async/await`
* Rendering tied to JS’s event loop

---

## 🛠️ **Tech Stack**

* **JavaScript (ES6+)**
* **HTML5**
* **CSS3**
* **LocalStorage**
* **Open-Meteo API** — weather
* **open.er-api.com** — exchange rates
* **RestCountries API** — base country data

---

## 📁 **Project Structure**

```
MyTravelPlanner/
│── index.html
│── style.css
│── app.js
│── countries.json
│── README.md
│── /img          # user-provided images (optional)
```

---

## 🚀 Want me to also write:

### ✓ a polished short description for your portfolio card?

### ✓ the README intro section?

### ✓ a GIF demo mockup text for the page?

Just say **“yes, write those too”** and I’ll package everything professionally.
