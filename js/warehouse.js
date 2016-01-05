// This example is designed to showcase functional programming
// in Javascript.  Use of sort, forEach, and filter is explored.

// We start with a list of products arranged in 3 racks, a b and c, laid out as follows:

//     c1 c2 c3 c4 c5 c6 c7 c8 c9 c10
//
// a1    _________________________    b1
// a2   |                         |   b2
// a3   |                         |   b3
// a4   | Loading bay...          |   b4
// a5   |                         |   b5
// a6   |                         |   b6
// a7   | Can't walk here.        |   b7
// a8   |                         |   b8
// a9   |                         |   b9
// a10  |                         |   b10
//
// >> entrance                     >> exit


// All 30 products sorted alphabetically
var products = [{name: "bath fizzers", bay: "b7"},
  {name: "blouse", bay: "a3"},
  {name: "bookmark", bay: "a7"},
  {name: "candy wrapper", bay: "c8"},
  {name: "chalk", bay: "c3"},
  {name: "cookie jar", bay: "b10"},
  {name: "deodorant", bay: "b9"},
  {name: "drill press", bay: "c2"},
  {name: "face wash", bay: "c6"},
  {name: "glow stick", bay: "a9"},
  {name: "hanger", bay: "a4"},
  {name: "leg warmers", bay: "c10"},
  {name: "model car", bay: "a8"},
  {name: "nail filer", bay: "b5"},
  {name: "needle", bay: "a1"},
  {name: "paint brush", bay: "c7"},
  {name: "photo album", bay: "b4"},
  {name: "picture frame", bay: "b3"},
  {name: "rubber band", bay: "a10"},
  {name: "rubber duck", bay: "a5"},
  {name: "rusty nail", bay: "c1"},
  {name: "sharpie", bay: "b2"},
  {name: "shoe lace", bay: "c9"},
  {name: "shovel", bay: "a6"},
  {name: "stop sign", bay: "a2"},
  {name: "thermometer", bay: "c5"},
  {name: "tyre swing", bay: "b1"},
  {name: "tissue box", bay: "b8"},
  {name: "tooth paste", bay: "b6"},
  {name: "word search", bay: "c4"}
];

// Finds a number that indicates how far along on the warehouse floor each bay is, from 0 to 29
// For instance, a10 = 0, a9 = 1, etc up to b10 = 29
// (or d1 = 39 for when the new racks arrive.)
// Useful to sort bays in order, or to index into an array sorted by bay sequence
function getBaySequence(bay) {
  var num = parseInt(bay.substring(1,10));
  switch(bay[0]){
    case "a":
      return 10 - num;
    case "b":
      return 19 + num;
    case "c":
      return 9 + num;
    case "d":    // Not implemented yet, but if that new part of the warehouse ever gets built ... :)
      return 40 - num;
  }
}

// Simple example of using functional programming to sort everything by its sequence on the warehouse floor
// As long as each bay has one and only one product, this will end up being 30 things, and everything will work.
// But -- it's suceptible to trouble if there is an empty bay or more than one product in a given bay!
var floorSequence = products.sort(function(a, b){
  return getBaySequence(a.bay) - getBaySequence(b.bay);
});

// Pass in an array of bays (or a string describing the bays)
// and get back an object with a product name array, plus the maximum distance between products
function findProductsByBays(bays) {
  // Used to find the distance between the first and last items we need
  var minIndex = Number.MAX_SAFE_INTEGER;   // As large a number as we can have
  var maxIndex = -1;   // One lower than is possible since we start counting at 0

  var productNames = [];

  // If they pass in a string of "b3, c7, c9 and a3" then we turn it into an array of bays
  if(typeof(bays) == "string") {
    // Use regex global matchers to do the replacing, so all instances are changed.
    // Spaces are removed, the word "and" turns into a comma, and finally doubled-up commas are turned into a single comma.
    bays = bays.replace(/ /g, "").replace(/and/g, ",").replace(/,,/g, ",").split(",");
  }

  // Another simple example of functional programming.
  // The function passed into forEach runs once for every bay.
  bays.forEach(function(bay){
    var index = getBaySequence(bay);
    // Maintain minimum and maximum tallies
    if(index < minIndex) {
      minIndex = index;
    }
    if(index > maxIndex) {
      maxIndex = index;
    }
    productNames.push(floorSequence[index].name);
  });

  // Return null if there were no matches, or an object containing both product names and max distance
  return (maxIndex == -1) ? null : {productNames: productNames, distance: maxIndex - minIndex};
}

// Pass in an array of names (or a string listing the names)
// and get back an array of bays in the proper sequence
function findBaysByProductNames(productNames) {
  var bays = [];

  // If they pass in a comma-separated string, for instance "hanger, deodorant, candy wrapper, rubber band"
  // then we turn it into an array of productNames
  if(typeof(productNames) == "string") {
    productNames = productNames.replace(/, /g, ",").split(",");
  }

  // Go through all supplied product names, and populate the bays array
  productNames.forEach(function(productName){
    // For each of the product names, find matching product(s) using a case-insensitive search
    var product = products.filter(function(product) {
      return product.name.toLowerCase() === productName.toLowerCase();
    });
    if(product.length > 0) {
      bays.push(product[0].bay);
    }
  });

  // Sort the resulting bays by the sequence in which they exist in the warehouse, and return this list
  return bays.sort(function(a, b){
    return getBaySequence(a) - getBaySequence(b);
  });
}
