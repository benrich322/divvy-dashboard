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
    console.log(data);
    // Define an array of short month names
    const shortMonthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

    const months = data.map(entry => shortMonthNames[parseInt(entry.month) - 1]);
    const totalRides = data.map(entry => entry.total_rides);

    // Create a line chart
    // Get the canvas element
    const ctx = document.getElementById('rides__Chart').getContext('2d');
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
    console.log(data);
    // Extract seasons and total rides from the JSON data
    const labels = data.map(entry => entry._id.season);
        console.log(labels);
    const counts = data.map(entry => entry.total_rides);
        console.log(counts);
  
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
const fetchDataset1 = fetch('https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/divvy_rides_and_weather')
  .then(response => response.json());

function createChart(dataset1) {

    function createUtils() {
        return {
          CHART_COLORS: {
            red: 'rgba(255, 0, 0, 1)',
            green: 'rgba(0, 255, 0, 1)',
            blue: 'rgba(0, 0, 255, 1)',
            // Define other colors as needed
          },
          transparentize: (color, opacity) => {
            const rgbaColor = color.replace('1)', `${opacity})`);
            return rgbaColor;
          }
        };
      }
      
    const utils = createUtils();

    // Define an array of short month names
    const shortMonthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
    const months = dataset1.map(entry => shortMonthNames[parseInt(entry.month) - 1]);
    const data = {
        labels: months,
        datasets: [
          {
            label: 'Significant Precipitation (>=0.1 in)',
            data: dataset1.map(entry => entry.average_rides_per_day),
            borderColor: utils.CHART_COLORS.red,  // Corrected
            backgroundColor: utils.transparentize(utils.CHART_COLORS.red, 0.5),  // Corrected
          },
          {
            label: 'Insignificant Precipitation (<0.1 in)',
            data: dataset2.map(entry => entry.average_rides_per_day),
            borderColor: utils.CHART_COLORS.blue,  // Corrected
            backgroundColor: utils.transparentize(utils.CHART_COLORS.blue, 0.5),  // Corrected
          }
        ]
      };
  
    const ctx = document.getElementById('weatherChart').getContext('2d');
    const weatherChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
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

const borderColor1 = utils.CHART_COLORS.red;
const transparentColor1 = utils.transparentize(utils.CHART_COLORS.red, 0.5);