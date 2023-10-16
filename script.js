document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const location = document.getElementById('location').value;
        const minPrice = document.getElementById('min-price').value;
        const maxPrice = document.getElementById('max-price').value;
        const beds = document.getElementById('beds').value;
        const baths = document.getElementById('baths').value;

        // Send input to the server for property search
        const searchQuery = `Location: ${location}, Price Range: ${minPrice}-${maxPrice}, Beds: ${beds}, Baths: ${baths}`;
        searchResults.innerHTML = `Searching properties with: ${searchQuery}`;
    });
});
