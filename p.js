(function(global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
  var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";

  // Function to get a random category short name
  function getRandomCategoryShortName(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].short_name;
  }

  // Load the home page snippet
  dc.loadHomePage = function() {
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      function(categories) {
        var randomCategoryShortName = getRandomCategoryShortName(categories);
        insertProperty("#specials-link", "onclick", "$dc.loadMenuItems('" + randomCategoryShortName + "')");
      },
      true
    );
  };

  // Function to insert properties dynamically
  function insertProperty(selector, attribute, value) {
    var element = document.querySelector(selector);
    if (element) {
      element.setAttribute(attribute, value);
    }
  }

  global.$dc = dc;
})(window);

// Load the home page on script initialization
document.addEventListener("DOMContentLoaded", function(event) {
  $dc.loadHomePage();
});
