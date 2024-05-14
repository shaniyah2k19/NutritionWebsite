// main.js

//Waiting for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Getting the search button element
  const searchButton = document.getElementById('searchButton');
  // Adding event listener to the search button
  searchButton.addEventListener('click', searchNutrition);
});
// Function to search for nutrition information
async function searchNutrition() {
  // Getting the foot input value
  const foodInput = document.getElementById('foodInput').value;
  // Construct the API URL for the search query
  const url = `https://api.edamam.com/search?q=${foodInput}&app_id=66c8a035&app_key=7c335779213803c4e535a2216d4637e4`;
  try {
    // Fetching the data from the API
    const response = await fetch(url);
    // Parse the response as JSON
    const responseData = await response.json();
    // Displaying the retrieved nutrition information
    displayNutrition(responseData);
  } catch (error) {
    // Handling errors if any occur during the fetch operation
    console.error('Error fetching nutrition data: ', error);
  }
}
// Function to display nutrition information
function displayNutrition(responseData) {
  // Getting the div element where the results will be displayed
  const resultsDiv = document.getElementById('nutritionResults');
  // Clearing any previous results
  resultsDiv.innerHTML = '';
  // Check if there are hits in the response
  if (responseData.hits && responseData.hits.length > 0) {
    //Loooping through each hit in the response
    responseData.hits.forEach(hit => {
      // Extracting relevant information for each food item
      const foodItem = hit.recipe.label;
      const calories = hit.recipe.calories;
      const image = hit.recipe.image;
      // Creating elements to display the food item information
      const foodItemDiv = document.createElement('div');
      foodItemDiv.classList.add('food-item');
      const foodNameLabel = document.createElement('h2');
      foodNameLabel.textContent = foodItem;
      const caloriesLabel = document.createElement('p');
      caloriesLabel.textContent = `Calories: ${calories.toFixed(2)}`;
      const foodImageElement = document.createElement('img');
      foodImageElement.src = image;
      // Appending elements to the food item div
      foodItemDiv.appendChild(foodNameLabel);
      foodItemDiv.appendChild(caloriesLabel);
      foodItemDiv.appendChild(foodImageElement);
      // Appending the food item div to the results div
      resultsDiv.appendChild(foodItemDiv);

    });
  } else {
    // If no nutrition information is found, display a message 
    resultsDiv.textContent = 'No nutrition information was found.';
  }
}