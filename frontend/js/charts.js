async function loadStats() {
    const response = await fetch('https://your-render-app.onrender.com/api/sessions', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const sessions = await response.json();
    const ctx = document.getElementById('sessionChart').getContext('2d');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: sessions.map(s => new Date(s.date).toLocaleDateString()),
        datasets: [{
          label: 'Minutes Worked',
          data: sessions.map(s => s.duration / 60),
          borderColor: 'rgb(75, 192, 192)'
        }]
      }
    });
  }
  
  loadStats();