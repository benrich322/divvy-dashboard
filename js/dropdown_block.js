const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach((item, index) => { // Add an index parameter
  const selection = item.querySelector(".collapsible__selection");
  const content = item.querySelector(".collapsible__content");
  const selectedOption = item.querySelector(`#selectedOption${index + 1}`); // Use index to select the correct element

  // Select all collapsible list items
  const listItems = item.querySelectorAll(".collapsible__list");

  // Add click event listeners to list items
  listItems.forEach((listItem) => {
    listItem.addEventListener("click", function () {
      // Update the selectedOption text dynamically
      selectedOption.textContent = listItem.textContent;

      // Close the collapsible content and set its z-index to 0
      item.classList.remove("collapsible--expanded");
      content.style.zIndex = 0;
    });
  });

  selection.addEventListener("click", function () {
    // Toggle the expanded class for the clicked collapsible
    item.classList.toggle("collapsible--expanded");

    // Close all other collapsibles and set their content's z-index to 0
    collapsibles.forEach((other) => {
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














