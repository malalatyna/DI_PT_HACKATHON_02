
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const addRecipesLink = document.getElementById('addRecipesLink');
const formElement = document.querySelector('.form-content');
const formCloseBtn = document.getElementById('form-close-btn');
const addRecipesButton = document.getElementById('add-recipe-button');
const formDataElement = document.getElementById('form-data');

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
    <div class="recipe-meal-img">
      <img src="${mealItem.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
    <a href="${mealItem.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></i></a>
  
  </div>
       <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <button class="fav-btn">
        <i class="fas fa-heart"></i>
       </button>
      <p>${mealItem.strInstructions}</p>
    </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}

// Close the recipe modal
function closeRecipeModal() {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
}


 // Add an event listener to the "Add Recipes" link
 addRecipesLink.addEventListener('click', function(event) {
   event.preventDefault(); 
   formElement.style.display = 'block';
 });

 // Add an event listener to the close button
 formCloseBtn.addEventListener('click', function(event) {
  event.preventDefault(); 
  formElement.style.display = 'none';
});

//upload the recipe

addRecipesButton.addEventListener('click', function(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const titleInput = document.getElementById('title');
  const ingredientsInput = document.getElementById('ingredients');
  const contactInput = document.getElementById('contact');
  const descriptionInput = document.getElementById('description');

  const name = nameInput.value;
  const title = titleInput.value;
  const ingredients = ingredientsInput.value;
  const contact = contactInput.value;
  const description = descriptionInput.value;

  const formDataHTML = `
    <h3>Your recipe details:</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Ingredients:</strong> ${ingredients}</p>
    <p><strong>Contact Number:</strong> ${contact}</p>
    <p><strong>Description:</strong> ${description}</p>
  `;

  formDataElement.innerHTML = formDataHTML;

  nameInput.value = '';
  titleInput.value = '';
  ingredientsInput.value = '';
  contactInput.value = '';
  descriptionInput.value = '';
});

// to handle the form submission and send to the server
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recipe-form');
  const formDataDiv = document.getElementById('form-data');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const contact = document.getElementById('contact').value;
    const description = document.getElementById('description').value;

 
    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        title,
        ingredients,
        contact,
        description,
      }),
    })
      .then((res) => res.text())
      .then((message) => {
        formDataDiv.innerHTML = `<p>${message}</p>`;
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        formDataDiv.innerHTML = '<p>Error submitting recipe.</p>';
      });
  });
});

