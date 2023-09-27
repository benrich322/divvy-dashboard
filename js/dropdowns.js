let jsonData = null;

async function fetchDataIfNeeded() {
  if (!jsonData) {
    const response = await fetch('https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/stations');
    jsonData = await response.json();
  }
}

// Function to set default values for span elements
function setDefaultValues() {
    document.getElementById('selectedOption0').textContent = 'City';
    document.getElementById('selectedOption1').textContent = 'Chicago';
    document.getElementById('selectedOption2').textContent = 'Top 10';
}

function handleCollapsibleSelection(index) {
    const collapsibleClick = document.querySelectorAll('.collapsible__selection')[index];
    const collapsible = document.querySelectorAll('.collapsible')[index];
    const selectedOption = document.getElementById(`selectedOption${index}`);
  
    // Add a click event listener to the collapsible header
    collapsibleClick.addEventListener('click', function () {
      // Collapse all other collapsible elements first
      const allCollapsibles = document.querySelectorAll('.collapsible');
      allCollapsibles.forEach((element, i) => {
        if (i !== index) {
          element.classList.remove('collapsible--expanded');
        }
      });

      // Toggle the 'collapsible--expanded' class for the clicked collapsible
      collapsible.classList.toggle('collapsible--expanded');
  
      // Check if the content is expanded
      if (collapsible.classList.contains('collapsible--expanded')) {
        // Add a click event listener to each <li> inside the expanded content
        const collapsibleListItems = collapsible.querySelectorAll('.collapsible__list');
        collapsibleListItems.forEach((item) => {
          item.addEventListener('click', function (event) {
            // Update the selectedOption value based on the clicked item
            selectedOption.textContent = event.target.textContent;

            // Set the value attribute of selectedOption0 based on the clicked item's value attribute
            selectedOption0.setAttribute('value', event.target.getAttribute('value'));
  
            // Collapse the collapsible content by removing the 'collapsible--expanded' class
            collapsible.classList.remove('collapsible--expanded');
          });
        });
  
        // Get a reference to selectedOption0
        const selectedOption0 = document.getElementById('selectedOption0');
        const selectedOption1 = document.getElementById('selectedOption1');

        // Initialize the MutationObserver to watch for changes in selectedOption0's textContent
        const observer = new MutationObserver(function (mutationsList) {
          for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.target === selectedOption0) {
              selectedOption1.textContent = '';
              // Call the populateDynamicList function when selectedOption0 class text content changes
              populateDynamicList();
            }
          }
        });
  
        // Configure the observer to watch for changes in the child nodes (content) of selectedOption0
        const observerConfig = { childList: true };
  
        // Start observing selectedOption0
        observer.observe(selectedOption0, observerConfig);
      }
    });
}
  
// Function to populate the dynamic selection list
async function populateDynamicList() {
    try {
      // Fetch JSON data if not already fetched
      await fetchDataIfNeeded();
      
      // Get the selected option text
      const selectedOptionValue = document.getElementById('selectedOption0').getAttribute('value');

      // Filter the JSON data for unique values of the selected option
      const uniqueValues = [...new Set(jsonData.map(item => item[selectedOptionValue]))];
      
      // Get the dynamic selection <ul> element
      const dynamicSelectionList = document.querySelector('.dynamic_selection');
      
      // Clear existing list items
      dynamicSelectionList.innerHTML = '';
      
      // Populate the <ul> with unique values as list items
      uniqueValues.forEach(value => {
        const listItem = document.createElement('li');
        listItem.textContent = value;
        listItem.classList.add('collapsible__list');
        dynamicSelectionList.appendChild(listItem);
      });
      
    } catch (error) {
      console.error('Error populating dynamic list:', error);
    }
}

setDefaultValues();

// Call the function to populate the list when needed
populateDynamicList();
  

// Define the number of collapsibles you want to handle
const numCollapsibles = 3; // Adjust this as needed

// Loop through the indices and call handleCollapsibleSelection for each
for (let index = 0; index < numCollapsibles; index++) {
  handleCollapsibleSelection(index);
}














