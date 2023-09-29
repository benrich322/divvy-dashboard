let jsonData = null;

async function fetchDataIfNeeded() {
  if (!jsonData) {
    const response = await fetch('https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/stations');
    jsonData = await response.json();

    // Loop through each object in the JSON data array
    jsonData.forEach(station => {
      // Capitalize the 'city' property
      if (station.city) {
        station.city = capitalizeWord(station.city);
      }

      // Capitalize the 'community_area' property
      if (station.community_area) {
        station.community_area = capitalizeWord(station.community_area);
      }
    });
  }
}

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


// Function to set default values for span elements
async function setDefaultValues() {
  document.getElementById('selectedOption0').textContent = 'City';
  document.getElementById('selectedOption1').textContent = 'Chicago';
  document.getElementById('selectedOption2').textContent = 'All';

  await fetchDataIfNeeded(); // Wait for data to be fetched
  const selectedOptions = getSelectedOptionsText();
  //const matchingStations = findMatchingStations(selectedOptions, jsonData);
}

function handleCollapsibleSelection(index) {
    const collapsibleClick = document.querySelectorAll('.collapsible__selection')[index];
    const collapsible = document.querySelectorAll('.collapsible')[index];
    const selectedOption = document.getElementById(`selectedOption${index}`);
    console.log('check',selectedOption)
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
            console.log(selectedOption)
            selectedOption.textContent = event.target.textContent;
            // New code
            clearMarkers(map);
            fetchDataIfNeeded();
            const selectedOptions = getSelectedOptionsText();
            const matchingStations = findMatchingStationsnew(selectedOptions, jsonData);
            console.log('selectedOptions',selectedOptions)
            createMarkers(matchingStations, map);
            displayCommunityAreaBorder(selectedOptions, map);
            //

            // Set the value attribute of loction_type_selection based on the clicked item's value attribute
            selectedOption.setAttribute('value', event.target.getAttribute('value'));
            console.log(loction_type_selection)
            // Collapse the collapsible content by removing the 'collapsible--expanded' class
            collapsible.classList.remove('collapsible--expanded');
          });
        });
  
        // Get a reference to loction_type_selection
        const loction_type_selection = document.getElementById('selectedOption0');
        const selectedOption1 = document.getElementById('selectedOption1');

        // Initialize the MutationObserver to watch for changes in loction_type_selection's textContent
        const observer = new MutationObserver(function (mutationsList) {
          for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.target === loction_type_selection) {
              selectedOption1.textContent = '';
              // Call the populateDynamicList function when loction_type_selection class text content changes
              populateDynamicList();
            }
          }
        });
  
        // Configure the observer to watch for changes in the child nodes (content) of loction_type_selection
        const observerConfig = { childList: true };
  
        // Start observing loction_type_selection
        observer.observe(loction_type_selection, observerConfig);
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
      console.log(selectedOptionValue)
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
  















