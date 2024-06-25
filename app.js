// Pre-populated in-memory storage for city population data
let cityPopulations = [
    { id: 1, cityName: 'Ahmedabad', countryName: 'India', year: 2001, population:3520085},
    { id: 2, cityName: 'Ajmer', countryName: 'India', year: 2001, population: 485575},
    { id: 3, cityName: 'Bihar', countryName: 'India', year: 2003, population: 8982000 },
    { id: 4, cityName: 'Bilaspur', countryName: 'India', year: 2002, population: 4562000 }
];
let cityIdCounter = 5; // ID counter starts from 4

// Function to render city population data in table format
function renderCityPopulations() {
    const cityPopulationBody = document.getElementById('cityPopulationBody');
    cityPopulationBody.innerHTML = ''; // Clear previous table body
    cityPopulations.forEach(city => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${city.id}</td>
            <td>${city.cityName}</td>
            <td>${city.countryName}</td>
            <td>${city.year}</td>
            <td>${city.population}</td>
            <td>
                <button onclick="editCityPopulation(${city.id}, '${city.cityName}', '${city.countryName}', ${city.year}, ${city.population})">Edit</button>
                <button onclick="deleteCityPopulationById(${city.id})">Delete</button>
            </td>
        `;
        cityPopulationBody.appendChild(tr);
    });
}

// Function to create new city population entry
function createCityPopulation() {
    const cityName = document.getElementById('cityName').value;
    const countryName = document.getElementById('countryName').value;
    const year = parseInt(document.getElementById('year').value);
    const population = parseInt(document.getElementById('population').value);

    if (cityName && countryName && year && population) {
        const newCity = {
            id: cityIdCounter++,
            cityName,
            countryName,
            year,
            population
        };

        cityPopulations.push(newCity);
        saveCityPopulations(); // Save city populations to local storage
        document.getElementById('cityName').value = '';
        document.getElementById('countryName').value = '';
        document.getElementById('year').value = '';
        document.getElementById('population').value = '';
        alert('City population added successfully!');
        renderCityPopulations(); // Re-render city populations
    } else {
        alert('Please fill in all fields');
    }
}

// Function to update city population entry
function updateCityPopulation() {
    const id = parseInt(document.getElementById('updateId').value);
    const cityName = document.getElementById('updateCityName').value;
    const countryName = document.getElementById('updateCountryName').value;
    const year = parseInt(document.getElementById('updateYear').value);
    const population = parseInt(document.getElementById('updatePopulation').value);

    const city = cityPopulations.find(city => city.id === id);

    if (city && cityName && countryName && year && population) {
        city.cityName = cityName;
        city.countryName = countryName;
        city.year = year;
        city.population = population;

        updateCityPopulation(); // Save city populations to local storage
        document.getElementById('updateId').value = '';
        document.getElementById('updateCityName').value = '';
        document.getElementById('updateCountryName').value = '';
        document.getElementById('updateYear').value = '';
        document.getElementById('updatePopulation').value = '';
        alert('City population updated successfully!');
        renderCityPopulations(); // Re-render city populations
    } else {
        alert('Please enter valid data');
    }
}
// Function to save city populations to local storage
function saveCityPopulations() {
    // In real usage, you would uncomment the following line to save to local storage
     localStorage.setItem('cityPopulations', JSON.stringify(cityPopulations));
}


// Function to delete city population entry by ID
function deleteCityPopulationById(id) {
    const index = cityPopulations.findIndex(city => city.id === id);

    if (index !== -1) {
        cityPopulations.splice(index, 1);
        saveCityPopulations(); // Save city populations to local storage
        alert('City population deleted successfully!');
        renderCityPopulations(); // Re-render city populations
    } else {
        alert('City population not found');
    }
}


// Function to edit city population entry (populate update form)
function editCityPopulation(id, cityName, countryName, year, population) {
    document.getElementById('updateId').value = id;
    document.getElementById('updateCityName').value = cityName;
    document.getElementById('updateCountryName').value = countryName;
    document.getElementById('updateYear').value = year;
    document.getElementById('updatePopulation').value = population;
}



// Function to render filtered city populations based on search input
function searchCities() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCities = cityPopulations.filter(city => city.cityName.toLowerCase().includes(searchInput));
    renderFilteredCities(filteredCities);
}

// Function to render filtered city populations(For a search-bar)
function renderFilteredCities(filteredCities) {
    const cityPopulationBody = document.getElementById('cityPopulationBody');
    cityPopulationBody.innerHTML = ''; // Clear previous table body
    filteredCities.forEach(city => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${city.id}</td>
            <td>${city.cityName}</td>
            <td>${city.countryName}</td>
            <td>${city.year}</td>
            <td>${city.population}</td>
             <td>
                <button onclick="editCityPopulation(${city.id}, '${city.cityName}', '${city.countryName}', ${city.year}, ${city.population})">Edit</button>
                <button onclick="deleteCityPopulationById(${city.id})">Delete</button>
            </td>
        `;
        cityPopulationBody.appendChild(tr);
    });
}

// Initial rendering of city populations on page load
window.onload = function() {
    // In real usage, you would uncomment the following line to initialize from local storage
    initializeCityPopulations();
    renderCityPopulations();
}



function initializeCityPopulations() {
    const storedCityPopulations = localStorage.getItem('cityPopulations');
    if (storedCityPopulations) {
        cityPopulations = JSON.parse(storedCityPopulations);
    } else {
        // Initialize with default data if no data is found in localStorage
        cityPopulations = [
            { id: 1, cityName: 'Ahmedabad', countryName: 'India', year: 2001, population:3520085},
            { id: 2, cityName: 'Ajmer', countryName: 'India', year: 2001, population: 485575},
            { id: 3, cityName: 'Bihar', countryName: 'India', year: 2003, population: 8982000 },
            { id: 4, cityName: 'Bilaspur', countryName: 'India', year: 2002, population: 4562000 }
            // Add more default cities if needed
        ];
        saveCityPopulations(); // Save initial data to localStorage
    }
}

