// Create a javascript function called createCocktailCard which takes three arguments: name, imageUrl and id. (We won't use the id for now, but we'll need it later)
/* Return this div:
<div class="card">
   <h3>{{name}}</h3>
   <img src="{{imageUrl}}">
</div>
*/

function createCocktailCard(name, imageURL, id) {
   // Create all the necessary elements with createElement method and append them to their corresponding parent with appendChild method
   var card = document.createElement("div");
   card.classList.add("card");

   var h3 = document.createElement("h3");
   h3.textContent = name;
   card.appendChild(h3);

   var img = document.createElement("img");
   img.src = imageURL;
   card.appendChild(img);

   // Return the parent element containing all of the appended children
   return card;
}

// TEST CREATE COCKTAIL FUNCTION
// var testCocktailCard = createCocktailCard("Casino", "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/1mvjxg1504348579.jpg", 17185);

// // Select html element by using querySelector method
// var cocktailList = document.querySelector("#cocktail-list");
// cocktailList.appendChild(testCocktailCard);

// GET DATA FROM API BY USING PROMISES (create a generic function to get api data)
/*
   > Create function fetchJSON (url) {} that returns a promise object (created in it with "new" and two functions as parameters - 
   "resolve" for success and "reject" for error) - the object has JSON data from the url parameter
   > Call fetchJSON (url) with url value and bind it to a var in order to create a promise
      > initialize the api request using new XMLHttpRequest; 
         > request.open method to initialize the request;
         > request.addEventListener on load, to check if request.status is !200; else continue to resolve with JSON data returned as request value and parsed as a string!!!
         > request.response
   > In order to get the value from the promise object, we use the Promise object "then" method - promise.then(callback) - the callback gets the apiResponse passed as an argument 
*/

function fetchJSON(url) {
   return new Promise(function (resolve, reject) {
      // initialize an API request
      var request = new XMLHttpRequest;
      request.open("GET", url);
      request.addEventListener("load", function (event) {
         if (request.status != 200) {
            reject();
         }
         var response = JSON.parse(request.response);
         resolve(response);
      });
      request.send();
   });
}

var myPromise = fetchJSON("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin");

myPromise.then(function (apiResponse) {
   // Because we expect one object with one element - that element is array consisting of multiple objects that is data for our cocktail cards 
   // (each card is a drink; each object in the array is a drink) we need to have a var where all cocktail cards will be appended to; then fill each cocktail card with data 
   // from the apiResponse.

   var cocktailList = document.querySelector("#cocktail-list");
   var drinks = apiResponse.drinks;

   for (var i = 0; i < drinks.length; i++) {
      var drink = drinks[i];

      var name = drink.strDrink;
      var imageURL = drink.strDrinkThumb;
      var id = drink.idDrink;

      var cocktailCard = createCocktailCard(name, imageURL, id);
      cocktailList.appendChild(cocktailCard);
   }
});

// Write a function called createCocktailSpotlight, which takes again the name, title and id as parameters and returns an html element like this:
/*
<div id="spotlight">
   <div id="spotlight-card">
      <h1>{{name}}</h1>
      <img src={{imageUrl}}>
      <p>Instructions will go here...</p>
   </div>
</div>
*/

function createCocktailSpotlight (name, title, id) {
 var spotlight = document.createElement("div");
 spotlight.id = "spotlight";

 var spotlightCard = document.createElement("div");
 spotlightCard.id = "spotlight-card";
 spotlight.appendChild(spotlightCard);



}


