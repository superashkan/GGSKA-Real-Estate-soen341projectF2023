function isNullOrEmpty(stringInput) {
  if (stringInput === null || stringInput.toString().trim() === "") {
    return true;
  } else {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');

    searchForm.addEventListener('submit', async function(event) {
      try {
        event.preventDefault();

        var location = document.getElementById('location').value;
        if (isNullOrEmpty(location)) {
          location = "";
        }
        var minPrice = document.getElementById('min-price').value;
        if (isNullOrEmpty(minPrice)) {
          minPrice = 0.00;
        }
        if (minPrice < 0) {
          throw new Error("Error: If you wish to input a minimum price, you must input a non-negative value.");
        }
        var maxPrice = document.getElementById('max-price').value;
        if (isNullOrEmpty(maxPrice)) {
          maxPrice = null;
        }
        if (maxPrice <= 0) {
          throw new Error("Error: If you wish to input a maximum price, you must input a positive value.");
        }
        const beds = document.getElementById('beds').value;
        if (isNullOrEmpty(beds) || beds === 0) {
          throw new Error("Error: A number of bedrooms must be selected.");
        }
        const baths = document.getElementById('baths').value;
        if (isNullOrEmpty(baths) || baths === 0) {
          throw new Error("Error: A number of bathrooms must be selected.");
        }

        // Send input to the server for property search
        const searchQuery = `Location: ${location}, Price Range: ${minPrice}-${maxPrice}, Beds: ${beds}, Baths: ${baths}`;
        searchResults.innerHTML = `Searching properties with: ${searchQuery}`;
        var result = await getResults(location, "", maxPrice, minPrice, "", beds, baths);
        alert(result);
      }
      catch(error) {
        alert(error);
      }
    });
});
