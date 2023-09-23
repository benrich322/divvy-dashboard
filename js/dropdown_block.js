const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach((item, index) => { // Loop through each collapsible item
  console.log('collapsibles',item, index)

  const selection = item.querySelector(".collapsible__selection"); // Find the selection element
  console.log('selection',selection)

  const content = item.querySelector(".collapsible__content"); // Find the collapsible content
  console.log('content',content)
  
  const selectedOption = item.querySelector(`#selectedOption${index}`); // Find the selected option element using the index
  console.log('selectedOption',selectedOption)
  // Select all collapsible list items within this collapsible
  const listItems = item.querySelectorAll(".collapsible__list");
  console.log('listItems',listItems)

  // Add click event listeners to list items
  listItems.forEach((listItem) => {
    listItem.addEventListener("click", function () {
      // Update the selectedOption text dynamically with the clicked item's text
      selectedOption.textContent = listItem.textContent;
      // Close the collapsible content and set its z-index to 0
      item.classList.remove("collapsible--expanded");
      content.style.zIndex = 0;
    });
  });

  selection.addEventListener("click", function () {
    // Toggle the expanded class for the clicked collapsible
    item.classList.toggle("collapsible--expanded");
    console.log('item',item)
    // Close all other collapsibles and set their content's z-index to 0
    collapsibles.forEach((other) => {
      console.log('other',other)
      if (other !== item) {
        other.classList.remove("collapsible--expanded");
        other.querySelector(".collapsible__content").style.zIndex = 0;
      }
    });

    // Set the z-index of the clicked collapsible's content based on its expanded state
    if (item.classList.contains("collapsible--expanded")) {
      content.style.zIndex = 1; // Bring to front when expanded
    } else {
      content.style.zIndex = 0; // Send to back when not expanded
    }
  });
});















