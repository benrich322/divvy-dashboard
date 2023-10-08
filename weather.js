// Fetch JSON data from the provided URL
fetch('https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/divvy_rides_by_month')
  .then(response => response.json())
  .then(data => {
    // Call the function with fetched JSON data
    createLineChart(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
});

// Call the function with the provided JSON data
function createLineChart(data) {
    // Define an array of short month names
    const shortMonthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

    const months = data.map(entry => shortMonthNames[parseInt(entry.month) - 1]);
    const totalRides = data.map(entry => entry.total_rides);

    // Create a line chart
    // Get the computed height from the CSS class
    const ctx = document.getElementById('line__chart').getContext('2d');
    const ridesChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Rides by Month',
            data: totalRides,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
        }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Rides',
                },
            },
        },
    },
    });
}

// Fetch JSON data from the provided URL
fetch('https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/divvy_rides_by_season')
  .then(response => response.json())
  .then(data => {
    // Call the function with fetched JSON data
    createPieChart(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
});

// Call the function with the provided JSON data
function createPieChart(data) {
    // Extract seasons and total rides from the JSON data
    const labels = data.map(entry => entry._id.season);
    const counts = data.map(entry => entry.total_rides);
  
    const ctx = document.getElementById('pie__Chart').getContext('2d');
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: ['red', 'green', 'blue', 'orange', 'purple'], // Define colors
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Rides by Type',
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = counts.reduce((acc, curr) => acc + curr, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${percentage}%`;
                    },
                  },
                },
              },      
            },
      });
  }


// Fetch JSON data from the provided URLs
const fetchDataset1 = fetch('https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/avg_rides_by_month')
  .then(response => response.json());

function createChart(dataset1) {
  function createUtils() {
    return {
      CHART_COLORS: {
        red: 'rgba(255, 0, 0, 1)',
        blue: 'rgba(0, 0, 255, 1)'
      },
      transparentize: (color, opacity) => {
        const rgbaColor = color.replace('1)', `${opacity})`);
        return rgbaColor;
      }
    };
  }

  const utils = createUtils();

  // Extract data for "Significant Precipitation" and "Insignificant Precipitation" /
  const significantPrecipitationData = dataset1
    .filter(entry => entry.data.some(dataEntry => dataEntry.significant_precipitation === 'True'))
    .map(entry => entry.data.find(dataEntry => dataEntry.significant_precipitation === 'True').avg_rides);

  const insignificantPrecipitationData = dataset1
    .filter(entry => entry.data.some(dataEntry => dataEntry.significant_precipitation === 'False'))
    .map(entry => entry.data.find(dataEntry => dataEntry.significant_precipitation === 'False').avg_rides);

  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const ctx = document.getElementById('weather__Chart').getContext('2d');
  const weatherChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Significant Precipitation',
          data: significantPrecipitationData,
          borderColor: utils.CHART_COLORS.red,
          backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5)
        },
        {
          label: 'Insignificant Precipitation',
          data: insignificantPrecipitationData,
          borderColor: utils.CHART_COLORS.blue,
          backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5)
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'category',  // Use 'category' type for the x-axis
          labels: labels,    // Provide the labels explicitly
          title: {
            display: true,
            text: 'Month'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Average Rides per Day'
          }
        }
      }
    }
  });
}

// Call the function when the data is fetched
fetchDataset1.then(createChart);
