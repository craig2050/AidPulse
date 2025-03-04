const ctx1 = document.getElementById('fireSeverityChart').getContext('2d');
const ctx2 = document.getElementById('responseTimeChart').getContext('2d');
const ctx3 = document.getElementById('casualtiesScatterChart').getContext('2d');
const ctx4 = document.getElementById('evacuationPieChart').getContext('2d');
const ctx5 = document.getElementById('necessitiesStackedChart').getContext('2d');

fetch('fire_incidents_with_resources.json')
  .then(response => response.json())
  .then(data => {
    const severityCounts = { Low: 0, Moderate: 0, High: 0, Critical: 0 };
    const responseTimes = [];
    const casualtiesData = [];
    const evacuationNeeds = { 'None': 0, 'Temporary Shelter': 0, 'Long-Term Housing': 0 };
    const basicNecessities = { Water: 0, Food: 0, Clothing: 0, Medication: 0 };

    data.forEach(incident => {
      severityCounts[incident.severity]++;
      responseTimes.push(incident.response_time_minutes);
      casualtiesData.push({ x: incident.severity, y: incident.casualties });
      evacuationNeeds[incident.victim_resources.evacuation_support]++;
      incident.victim_resources.basic_necessities.forEach(necessity => {
        basicNecessities[necessity]++;
      });
    });

    // Fire Severity Breakdown (Bar Chart)
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: Object.keys(severityCounts),
        datasets: [{
          label: 'Fire Incidents by Severity',
          data: Object.values(severityCounts),
          backgroundColor: ['green', 'yellow', 'orange', 'red']
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    // Response Time Distribution (Histogram)
    new Chart(ctx2, {
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

    // Casualties vs Severity (Scatter Plot)
    new Chart(ctx3, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Casualties by Severity',
          data: casualtiesData,
          backgroundColor: 'red'
        }]
      },
      options: { responsive: true, scales: { x: { type: 'category', labels: Object.keys(severityCounts) }, y: { beginAtZero: true } } }
    });

    // Evacuation Support (Pie Chart)
    new Chart(ctx4, {
      type: 'pie',
      data: {
        labels: Object.keys(evacuationNeeds),
        datasets: [{
          data: Object.values(evacuationNeeds),
          backgroundColor: ['gray', 'blue', 'purple']
        }]
      },
      options: { responsive: true }
    });

    // Basic Necessities Distribution (Stacked Bar Chart)
    new Chart(ctx5, {
      type: 'bar',
      data: {
        labels: Object.keys(basicNecessities),
        datasets: [{
          label: 'Basic Necessities Distribution',
          data: Object.values(basicNecessities),
          backgroundColor: ['brown', 'orange', 'blue', 'green']
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } }, plugins: { legend: { position: 'top' } } }
    });
  });
