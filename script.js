const API_URL = "http://localhost:5000/api/properties";
let allProperties = [];

// Fetch all houses from backend
async function loadProperties() {
  const res = await fetch(API_URL);
  allProperties = await res.json();
  displayProperties(allProperties);
}

// Display cards
function displayProperties(list) {
  const container = document.getElementById("propertyList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<p class='text-center text-xl text-red-600'>No matching houses found.</p>`;
    return;
  }

  list.forEach(p => {
    const img = p.images?.[0] ? `http://localhost:5000${p.images[0]}` : "https://via.placeholder.com/400";

    container.innerHTML += `
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <img src="${img}" class="h-48 w-full object-cover">

        <div class="p-4">
          <h2 class="text-xl font-bold">${p.title}</h2>
          <p class="text-gray-600 mt-1">${p.location}</p>

          <p class="font-semibold text-indigo-600 mt-2">₹ ${p.price.toLocaleString()}</p>

          <div class="flex justify-between text-sm mt-3 text-gray-700">
            <span>${p.bedrooms} Beds</span>
            <span>${p.bathrooms} Bath</span>
            <span>${p.area} sqft</span>
          </div>
        </div>
      </div>
    `;
  });
}

// Search & Filters
function applyFilters() {
  let filtered = [...allProperties];

  const query = document.getElementById("searchInput").value.toLowerCase();
  const min = Number(document.getElementById("priceMin").value);
  const max = Number(document.getElementById("priceMax").value);
  const bedrooms = Number(document.getElementById("bedroomFilter").value);

  if (query) {
    filtered = filtered.filter(h =>
      h.title.toLowerCase().includes(query) ||
      h.location.toLowerCase().includes(query)
    );
  }

  if (min) filtered = filtered.filter(h => h.price >= min);
  if (max) filtered = filtered.filter(h => h.price <= max);
  if (bedrooms) filtered = filtered.filter(h => h.bedrooms >= bedrooms);

  displayProperties(filtered);
}

// Load on start
loadProperties();
