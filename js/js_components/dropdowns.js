import { fetchStationData, jsonData } from './fetch_data.js'; 
import { handleSelectionChange } from './main_functions.js'; 
import map from './map2.js';
// This function capitalizes a word
function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// This function helps create the dropdown user flow
function handleCollapsibleSelection(index) {
  // It's like, "When someone clicks on the dropdown, do some things."

  // First, it finds the dropdown selections in index.html to click on, and it's giving it a name.
  const collapsibleClick = document.querySelectorAll('.collapsible__selection')[index];
  const collapsible = document.querySelectorAll('.collapsible')[index];
  const selectedOption = document.getElementById(`selectedOption${index}`);

  // When someone clicks on the dropdown, it's like, "Hey, computer, listen!"
  collapsibleClick.addEventListener('click', function () {

    // First, it closes other boxes that are open.
    const allCollapsibles = document.querySelectorAll('.collapsible');
    allCollapsibles.forEach((element, i) => {
      if (i !== index) {
        element.classList.remove('collapsible--expanded');
      }
    });

    // Then, it opens and closes the box clicked on.
    collapsible.classList.toggle('collapsible--expanded');

    // If the box is open, it does even more things.

    if (collapsible.classList.contains('collapsible--expanded')) {
      // It's like, "When clicking on things inside the open box, do these things."

      const collapsibleListItems = collapsible.querySelectorAll('.collapsible__list');
      collapsibleListItems.forEach((item) => {
        item.addEventListener('click', function (event) {
          // When you click on something inside the box, it changes the dropdown selection.

          selectedOption.textContent = event.target.textContent;

          // It also asks for help from another function to do more tasks.
          handleSelectionChange(map);

          // Adding a new value attribute to the index.html
          selectedOption.setAttribute('value', event.target.getAttribute('value'));
          // It closes the box you clicked on by removing the collapsible--expanded class.
          collapsible.classList.remove('collapsible--expanded');
        });
      });

      // It's finding the selections for the location type and location dropdowns.
      const loction_type_selection = document.getElementById('selectedOption0');
      const selectedOption1 = document.getElementById('selectedOption1');

      // It tells the computer to look for changes in the words.
      const observer = new MutationObserver(function (mutationsList) {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.target === loction_type_selection) {
            // When the words change, it does some more things and uses another function to complete a task.
            selectedOption1.textContent = '';
            populateDynamicList();
          }
        }
      });

      // It tells the computer what kind of changes to look for.
      const observerConfig = { childList: true };

      // It's like saying, "Hey computer, watch these words for me."
      observer.observe(loction_type_selection, observerConfig);
    }
  });
}

  
// This function helps populate the dropdown list on the web page.
async function populateDynamicList() {
    try {
      // It fetches the station data from the internet if don't have it yet.
      await fetchStationData();
      
      // It finds the value attribute of the selected option of the location type dropdown
      const selectedOptionValue = document.getElementById('selectedOption0').getAttribute('value');

      // It makes a list of unique selections and puts them on the web page.
      const uniqueValues = [...new Set(jsonData.map(item => item[selectedOptionValue]))];
      uniqueValues.sort((a, b) => {
        // Check if both 'a' and 'b' are numbers
        if (!isNaN(a) && !isNaN(b)) {
          return a - b; // Sort numbers in ascending order
        }
      
        // Sort strings in alphabetical order
        return String(a).localeCompare(String(b));
      });
      
      console.log(uniqueValues);
      // It finds the place in index.html to place the list
      const dynamicSelectionList = document.querySelector('.dynamic_selection');
      
      // It clears any old things from the list.
      dynamicSelectionList.innerHTML = '';
      
      // It puts the unique things in the list.
      uniqueValues.forEach(value => {
        const listItem = document.createElement('li');
        listItem.textContent = value;
        listItem.classList.add('collapsible__list');
        dynamicSelectionList.appendChild(listItem);
      });
      
    } catch (error) {
      // If something goes wrong, it tells the computer there's a problem.
      console.error('Error populating dynamic list:', error);
    }
}

// Export the fetchAndCacheGeoJSONData function
export { populateDynamicList };
export { handleCollapsibleSelection };
export { capitalizeWord };










