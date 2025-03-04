const ctx1 = document.getElementById('resourceRequestChart').getContext('2d');
const ctx2 = document.getElementById('geoMappingChart').getContext('2d');
const ctx3 = document.getElementById('countyRequestsChart').getContext('2d');
const ctx4 = document.getElementById('responseTimeChart').getContext('2d');
const ctx5 = document.getElementById('resourceCategoryChart').getContext('2d');

fetch('synthetic_fire_resource_data.json')
  .then(response => response.json())
  .then(data => {
    const resourceRequests = {};
    const countyRequests = {};
    const responseTimes = [];
    const geoData = [];
    const categoryRequests = { Health: 0, Food: 0, Shelter: 0, Clothing: 0, Water: 0, 'Psychological Support': 0 };

    data.forEach(incident => {
      Object.keys(incident.resource_requests).forEach(category => {
        categoryRequests[category] += incident.resource_requests[category];
      });
      
      if (!countyRequests[incident.county]) {
        countyRequests[incident.county] = 0;
      }
      countyRequests[incident.county] += Object.values(incident.resource_requests).reduce((a, b) => a + b, 0);
      
      responseTimes.push(incident.response_time_minutes);
      geoData.push({ x: incident.longitude, y: incident.latitude, size: Object.values(incident.resource_requests).reduce((a, b) => a + b, 0) });
    });

    // Resource Request Chart (Bar)
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: Object.keys(categoryRequests),
        datasets: [{
          label: 'Resource Requests',
          data: Object.values(categoryRequests),
          backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'cyan']
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    // Geographic Mapping (Bubble Chart)
    new Chart(ctx2, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Incident Locations',
          data: geoData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }]
      },
      options: { responsive: true }
    });

    // County-wise Requests (Pie Chart)
    new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: Object.keys(countyRequests),
        datasets: [{
          data: Object.values(countyRequests),
          backgroundColor: ['red', 'blue', 'green', 'orange', 'purple']
        }]
      },
      options: { responsive: true }
    });

    // Response Time Distribution (Line Chart)
    new Chart(ctx4, {
      type: 'line',
      data: {
        labels: responseTimes.sort((a, b) => a - b),
        datasets: [{
          label: 'Response Time (Minutes)',
          data: responseTimes,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    // Resource Requirement by Category (Stacked Bar Chart)
    new Chart(ctx5, {
      type: 'bar',
      data: {
        labels: Object.keys(categoryRequests),
        datasets: [{
          label: 'Resources by Category',
          data: Object.values(categoryRequests),
          backgroundColor: ['brown', 'orange', 'blue', 'green', 'purple', 'cyan']
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  });
