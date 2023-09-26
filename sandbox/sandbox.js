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

// 


// Function to initialize dropdowns
function initializeCollapsibles() {
    // select all the collapsible elements
    const collapsibles = document.querySelectorAll(".collapsible");
  
    // for each collapsible element define variables
    collapsibles.forEach((item, index) => {
      
      const selection = item.querySelector(".collapsible__selection");  
      const content = item.querySelector(".collapsible__content");
      const selectedOption = item.querySelector(`#selectedOption${index}`);
      const listItems = item.querySelectorAll(".collapsible__list");
      const locationDropdown = item.querySelector(".collapsible__content");
        

      function_test(item, listItems, selectedOption);
  
      selection.addEventListener("click", function () {
        item.classList.toggle("collapsible--expanded");
        collapsibles.forEach((other) => {
          if (other !== item) {
            other.classList.remove("collapsible--expanded");
            other.querySelector(".collapsible__content").style.zIndex = 0;
          }
        });
  
        if (item.classList.contains("collapsible--expanded")) {
          content.style.zIndex = 1;
        } else {
          content.style.zIndex = 0;
        }
      });
  
    setupLocationTypeDropdown(item, locationDropdown);

    });
  }


function function_test(item, listItems, selectedOption) {

    listItems.forEach((listItem) => {
        listItem.addEventListener("click", function () {
          selectedOption.textContent = listItem.textContent;
          item.classList.remove("collapsible--expanded");
          content.style.zIndex = 0;
        });
      });
}

// Function to set up the event listener for the "Location Type" dropdown
function setupLocationTypeDropdown(item, locationDropdown) {
    const locationTypeDropdown = item.querySelector(".collapsible__content");

    locationTypeDropdown.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            const selectedLocationType = event.target.getAttribute("value");

            // Define the different dropdown where you want to populate the options
            const anotherDropdown = document.querySelector(".test2");
            console.log('anotherDropdown',anotherDropdown)

            // Fetch and filter the JSON data based on the selected "Location Type"
            fetchData().then((data) => {
                const filteredLocations = [
                    ...new Set(data.map((item) => item[selectedLocationType])),
                ];

                // Populate the "Location" dropdown with the filtered options
                anotherDropdown.innerHTML = ''; // Clear the previous options

                filteredLocations.forEach((location) => {
                    const listItem = document.createElement('li'); // Create a new list item
                    listItem.classList.add("collapsible__list"); // Add the necessary class
                    listItem.textContent = location; // Set the text content
                    listItem.setAttribute("value", location); // Set the value attribute
                    anotherDropdown.appendChild(listItem); // Append to the different dropdown
                    // Add click event listener to the new list item
                });
            function_test(item, listItem, selectedOption);
            });
        }
    });
}

// Event listener to wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    initializeCollapsibles(); // Initialize collapsibles
    // Add any additional code to handle other interactions here
});

  
  
  
  
