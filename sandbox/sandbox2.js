// 1. Functon to fetch JSON data
// 2. Functon to set defalt values in the collapsible__selection class
    // Create a function that will create the html list elements for the dynamic_selection class using the html value of selectedOption0
// Function that will allow a user to click the collapsible__header dropdown and make a selection by adding the collapsible--expanded class to the .collapsible__content. Have that selection become the new selectOption{index} value
// 3. Function that will fetchData for the each time the selectedOption1 element is changed

// Function to fetch JSON data
async function fetchData() {
    try {
      const response = await fetch('https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/stations');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}

// Function to set default values for span elements
function setDefaultValues() {
    document.getElementById('selectedOption0').textContent = 'ward';
    document.getElementById('selectedOption1').textContent = 'Chicago';
    document.getElementById('selectedOption2').textContent = 'Top 10';
}

setDefaultValues();

function createDynamicList() {
    const selectedOption0Value = document.getElementById('selectedOption0').textContent;
    const dynamicSelectionList = document.querySelector('.dynamic_selection');
  
    // Clear existing list items
    dynamicSelectionList.innerHTML = '';
  
    // Create new list items based on selectedOption0Value
    const listItem1 = document.createElement('li');
    listItem1.textContent = `Option A for ${selectedOption0Value}`;
  
    const listItem2 = document.createElement('li');
    listItem2.textContent = `Option B for ${selectedOption0Value}`;
  
    dynamicSelectionList.appendChild(listItem1);
    dynamicSelectionList.appendChild(listItem2);
    // Add more list items as needed based on your logic
  }

function handleCollapsibleSelection(index) {
    const collapsibleClick = document.querySelectorAll('.collapsible__selection')[index];
    const collapsible = document.querySelectorAll('.collapsible')[index];
    const selectedOption = document.getElementById(`selectedOption${index}`);
  
    // Add a click event listener to the collapsible header
    collapsibleClick.addEventListener('click', function () {
      // Toggle the 'collapsible--expanded' class to on
      collapsible.classList.toggle('collapsible--expanded');
  
      // Check if the content is expanded
      if (collapsible.classList.contains('collapsible--expanded')) {
        // Add a click event listener to each <li> inside the expanded content
        const collapsibleListItems = collapsible.querySelectorAll('.collapsible__list');
        collapsibleListItems.forEach((item) => {
          item.addEventListener('click', function (event) {
            // Update the selectedOption value based on the clicked item
            selectedOption.textContent = event.target.textContent;
  
            // Collapse the collapsible content by removing the 'collapsible--expanded' class
            collapsible.classList.remove('collapsible--expanded');
          });
        });
  
        // Get a reference to selectedOption0
        const selectedOption0 = document.getElementById('selectedOption0');

  
        // Initialize the MutationObserver to watch for changes in selectedOption0's textContent
        const observer = new MutationObserver(function (mutationsList) {
          for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.target === selectedOption0) {
              console.log('SelectedOption0 text content changed');
              // Call the updateDropdownList function when selectedOption0's content changes
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
      // Fetch JSON data
      const jsonData = await fetchData();
      
      // Get the selected option text
      const selectedOptionText = document.getElementById('selectedOption0').textContent.trim();
      console.log(selectedOptionText)
      // Filter the JSON data for unique values of the selected option
      const uniqueValues = [...new Set(jsonData.map(item => item[selectedOptionText]))];
      
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
  
// Call the function to populate the list when needed
populateDynamicList();
  

// Define the number of collapsibles you want to handle
const numCollapsibles = 3; // Adjust this as needed

// Loop through the indices and call handleCollapsibleSelection for each
for (let index = 0; index < numCollapsibles; index++) {
  handleCollapsibleSelection(index);
}
  