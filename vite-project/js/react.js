function filterDataByCommunityArea(table_content, data) {
  // Use the Array.prototype.filter() method to filter the data
  const new_data = data.filter(item => {
    // Log the value of item.community_area

    // Check the value of table_content.option0
    switch (table_content.option0) {
      case 'city':
        return item.city === table_content.option1;
      case 'neighborhood':
        return item.neighborhood === table_content.option1;
      case 'community_area':
        return item.community_area === table_content.option1;
      case 'ward':
        return item.ward === table_content.option1;
      // Add more cases for other options if needed
      default:
        // If option0 doesn't match any cases, return true (no filtering)
        return true;
    }
  });
  return new_data;
}