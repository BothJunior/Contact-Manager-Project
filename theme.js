const darkIcon = document.querySelector('.bxs-moon');
const lightIcon = document.querySelector('.bx-sun');
const container = document.querySelector('.container');

// Toggle between light and dark mode
function toggleMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'inline';
    container.style.backgroundColor = '#333';
    localStorage.setItem('themeMode', 'dark');
  } else {
    darkIcon.style.display = 'inline';
    lightIcon.style.display = 'none';
    container.style.backgroundColor = 'white';
    localStorage.setItem('themeMode', 'light');
  }
}

// Set theme on page load
function setTheme() {
  const savedTheme = localStorage.getItem('themeMode');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'inline';
    container.style.backgroundColor = '#333';
    liContent.forEach((li) => {
      li.style.color = 'white';
    });
  } else {
    document.body.classList.remove('dark-mode');
    darkIcon.style.display = 'inline';
    lightIcon.style.display = 'none';
    container.style.backgroundColor = 'white';
    liContent.forEach((li) => {
      li.style.color = 'black';
    });
  }
}

// Event listener for theme toggle button
document.getElementById('toggle-mode').addEventListener('click', toggleMode);

// Apply saved theme on page load
setTheme();