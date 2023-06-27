
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', closeRecipeModal);

// Get meal list that matches with the ingredients
async function getMealList() {
  const searchInput = document.getElementById('search-input').value.trim();
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
  const data = await response.json();
  
  let html = "";
  if (data.meals) {
    data.meals.forEach(meal => {
      html += createMealItemHTML(meal);
    });
    mealList.classList.remove('notFound');
  } else {
    html = "Please try to input a different ingredient to find recipes";
    mealList.classList.add('notFound');
  }
  mealList.innerHTML = html;
}

// Create HTML markup for a meal item
function createMealItemHTML(meal) {
  return `
    <div class="meal-item" data-id="${meal.idMeal}">
      <div class="meal-img">
        <img src="${meal.strMealThumb}" alt="food">
      </div>
      <div class="meal-name">
        <h3>${meal.strMeal}</h3>
        <a href="#" class="recipe-btn">View Recipe</a>
      </div>
    </div>
  `;
}

// Get recipe of the meal
async function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    const mealItem = e.target.parentElement.parentElement;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`);
    const data = await response.json();
    mealRecipeModal(data.meals);
  }
}

// Display the meal recipe in a modal
function mealRecipeModal(meal) {
  const mealItem = meal[0];
  const html = `
    <h2 class="recipe-title">${mealItem.strMeal}</h2>
    <p class="recipe-category">${mealItem.strCategory}</p>
    <div class="recipe-instruct">
      <h3>Instructions:</h3>
      <p>${mealItem.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
      <img src="${mealItem.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
      <a href="${mealItem.strYoutube}" target="_blank">Watch Video</a>
    </div>
  `;
  
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}

// Close the recipe modal
function closeRecipeModal() {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
}
