# WarehousePicker
This example is designed to showcase some best practices you can do with Javascript, including testing using Mocha and Chai, and functional programming.

To get started, open index.html and see the basic behavior of the app.  And then click to go and see the tests that have been written based on the project requirements.

The core functionality of the app is found in the js/warehouse.js file, which describes a little further the layout of the warehouse and the behavior of the three key functions that make the application work:

getBaySequence - converts a bay code into a numerical ordered position.

findProductsByBays - given a list of bays, returns the product names found in those bays, and also the maximum distance between the bays.

findBaysByProductNames - given a list of product names, returns the exact bays that should be visited, in sequence, in order to collect all the named items.

Enjoy in good health!
