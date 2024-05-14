// main.js
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', searchNutrition);
});
async function searchNutrition() {
  const foodInput = document.getElementById('foodInput').value;
  const url = `https://api.edamam.com/search?q=${foodInput}&app_id=66c8a035&app_key=7c335779213803c4e535a2216d4637e4`;
  try {
    const response = await fetch(url);
    const responseData = await response.json();
    displayNutrition(responseData);
  } catch (error) {
    console.error('Error fetching nutrition data: ', error);
  }
}
function displayNutrition(responseData) {
  const resultsDiv = document.getElementById('nutritionResults');
  resultsDiv.innerHTML = '';

  if (responseData.hits && responseData.hits.length > 0) {
    responseData.hits.forEach(hit => {
      const foodItem = hit.recipe.label;
      const calories = hit.recipe.calories;
      const image = hit.recipe.image;
      const foodItemDiv = document.createElement('div');
      foodItemDiv.classList.add('food-item');
      const foodNameLabel = document.createElement('h2');
      foodNameLabel.textContent = foodItem;
      const caloriesLabel = document.createElement('p');
      caloriesLabel.textContent = `Calories: ${calories.toFixed(2)}`;
      const foodImageElement = document.createElement('img');
      foodImageElement.src = image;
      foodItemDiv.appendChild(foodNameLabel);
      foodItemDiv.appendChild(caloriesLabel);
      foodItemDiv.appendChild(foodImageElement);
      resultsDiv.appendChild(foodItemDiv);

    });
  } else {
    resultsDiv.textContent = 'No nutrition information was found.';
  }
}