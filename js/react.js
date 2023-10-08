// Define the filterDataByCommunityArea function
function filterDataByCommunityArea(selectedOptions, reactdata) {
  // Check if data is null or undefined before filtering
  if (reactdata == null) {
      return [];
  }
  
  // Use the Array.prototype.filter() method to filter the data
  const new_data = data.filter(item => {
    // Log the value of item.community_area

    // Check the value of table_content.option0
    switch (selectedOptions.option0) {
      case 'city':
        return item.city === selectedOptions.option1;
      case 'neighborhood':
        return item.neighborhood === selectedOptions.option1;
      case 'community_area':
        return item.community_area === selectedOptions.option1;
      case 'ward':
        return item.ward === selectedOptions.option1;
      // Add more cases for other options if needed
      default:
        // If option0 doesn't match any cases, return true (no filtering)
        return true;
    }
  });

  // Return the filtered data
  return reactdata;
}

export {filterDataByCommunityArea};
