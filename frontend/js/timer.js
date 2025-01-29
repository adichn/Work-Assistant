let currentTimer = null;
let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  tasks.push({ text: taskInput.value, completed: false, subtasks: [] });
  taskInput.value = '';
  renderTasks();
}

function startTimer() {
  const workHours = parseInt(document.getElementById('workHours').value) || 0;
  const workMinutes = parseInt(document.getElementById('workMinutes').value) || 0;
  const totalWorkTime = (workHours * 60 + workMinutes) * 60 * 1000;
  
  const breakMinutes = parseInt(document.getElementById('breakMinutes').value) || 5;
  const breakTime = breakMinutes * 60 * 1000;

  let timeLeft = totalWorkTime;
  const timerDisplay = document.getElementById('timerDisplay');
  
  currentTimer = setInterval(() => {
    timeLeft -= 1000;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    timerDisplay.textContent = `${hours}h ${minutes}m remaining`;
    
    if (timeLeft <= 0) {
      clearInterval(currentTimer);
      saveSession();
      window.location.href = 'session-summary.html';
    }
  }, 1000);
}

async function saveSession() {
  await fetch('https://your-render-app.onrender.com/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      duration: totalWorkTime,
      tasksCompleted: tasks.filter(t => t.completed).length,
      date: new Date()
    })
  });
}