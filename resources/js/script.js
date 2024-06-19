const workHistorySection = document.getElementById('work-history');

// Fetch JSON data work-history
fetch('./resources/data/work-history.json')
  .then(response => response.json())
  .then(data => {
    // Sort data in reverse chronological order
    data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    // Loop through data and create cards
    data.forEach(work => {
      const workCard = document.createElement('div');
      workCard.classList.add('work-card');

      let logoHtml = ''; // Initialize empty string for logo HTML

      // Check if work.logo exists and create image element if it does
      if (work.logo) {
        // Use backticks for template literals to handle dynamic paths
        logoHtml = `<img src="${work.logo}" alt="${work.company} Logo" class="workhist-img">`;
      }

      // Extract year from startDate and endDate (handle cases with missing endDate)
      const startYear = new Date(work.startDate).getFullYear();
      const endYear = work.endDate ? new Date(work.endDate).getFullYear() : 'Present';

      // Truncate description for preview (adjust maxHeight as needed)
      const maxHeight = 130; // Adjust based on font size and desired preview length
      const descriptionPreview = work.description.substring(0, work.description.split(/\s+/).slice(0, Math.ceil(maxHeight / 10)).join(' ').length) + '...';
      const description = work.description
    
      workCard.innerHTML = `
        <div class="workhist-banner">
          <div class="workhist-logo">${logoHtml}</div>
          <div class="workhist-loc-time">
            <p class="location">Location: ${work.location}</p>
            <span><h4 class="workhist-time">${startYear} to ${endYear}</h4></span>
          </div>  
        </div>
        
        <h3 class="workhist-position">${work.position} - ${work.company}</h3>
        <div class="description-container">
          <p class="description">${description}</p>
          <ul class="accomplishments"></ul>
        </div>
        <div class="toggle-container">
          <a href="#" class="description-toggle">Show More</a>
        </div>
      `;

      const accomplishmentsList = workCard.querySelector('.accomplishments'); // Get the accomplishments list element

      // Check if accomplishments array exists and has elements
      if (work.accomplishments && work.accomplishments.length > 0) {
        work.accomplishments.forEach(accomplishment => {
          const accomplishmentItem = document.createElement('li');
          accomplishmentItem.textContent = accomplishment;
          accomplishmentsList.appendChild(accomplishmentItem);
        });
      } else {
        accomplishmentsList.classList.add('hidden'); // if accomplishments is empty then this hides the ul
      }

        // Toggle link click event handler
        const toggleLink = workCard.querySelector('.description-toggle');
       
        toggleLink.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default link behavior (navigation)
          const descriptionContainer = workCard.querySelector('.description-container');
        
          if  (toggleLink.textContent === "Show More") {
            descriptionContainer.style.maxHeight = 'none'; // Remove max-height restriction
            toggleLink.textContent = 'Show Less';
          } else {
            descriptionContainer.style.maxHeight = '2.7em'; // Reset max-height
            toggleLink.textContent = 'Show More';
          }
        });
      
      workHistorySection.appendChild(workCard);
    });
  })

  .catch(error => console.error(error));

  // background creation and animation
  const hexagonGrid = document.getElementById('hexagonGrid');
  let chgHexagonSize = 25;
  let hexagonSize = chgHexagonSize; //15; // Adjust this value to control the size of the hexagons

// Function to generate the hexagonal grid pattern
function generateBackgroundPattern() { 
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  const hexagonRows = Math.floor(viewportHeight / hexagonSize);
  // Adjust hexagon columns based on the calculated hexagon size and viewport width
  const hexagonCols = Math.floor(viewportWidth / (hexagonSize * 1.5));
 // const hexagonRows = 75; // Adjust this value based on your layout
 // const hexagonCols = 100; // Adjust this value based on your layout

  for (let row = 0; row < hexagonRows; row++) {
    for (let col = 0; col < hexagonCols; col++) {
      const x = col * hexagonSize * 1.5;
      const y = row * hexagonSize * Math.sqrt(3) + ((col % 2) * hexagonSize * Math.sqrt(3) / 2);
      drawHexagon(hexagonGrid, x, y, hexagonSize);
    }
  }
}

// Function to draw a single hexagon
function drawHexagon(svg, x, y, size) {
  const points = calculateHexagonPoints(x, y, size);
  const hexagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  hexagon.setAttribute('points', points);
  hexagon.style.fill = 'white';
  hexagon.style.stroke = 'lightgray';
  hexagon.style.strokeWidth = '5';
  svg.appendChild(hexagon);
}

// Function to calculate the points of a hexagon
function calculateHexagonPoints(x, y, size) {
  let points = '';
  for (let side = 0; side < 7; side++) {
    const px = x + size * Math.cos(side * 2 * Math.PI / 6);
    const py = y + size * Math.sin(side * 2 * Math.PI / 6);
    points += `${px},${py} `;
  }
  return points.trim();
}

// Initial setup
generateBackgroundPattern();

document.body.addEventListener('mousemove', function(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  for (const hexagon of hexagonGrid.children) {
    const rect = hexagon.getBoundingClientRect();
    const hexagonCenterX = rect.left + rect.width / 2;
    const hexagonCenterY = rect.top + rect.height / 2;
    const distance = Math.sqrt((mouseX - hexagonCenterX) ** 2 + (mouseY - hexagonCenterY) ** 2);
    if (distance < 70) { // Adjust this value to control when the glow effect is applied
      hexagon.style.stroke = 'darkgray';
      hexagon.style.filter = 'drop-shadow(0 0 15px lightgray)'; // Add the glow effect
    } else {
      hexagon.style.stroke = 'lightgray';
      hexagon.style.filter = 'none'; // Remove the glow effect
    }
  }
});

document.body.addEventListener('mouseleave', function() {
  // Select all hexagons
  const hexagons = hexagonGrid.querySelectorAll('polygon');

  // Remove the glow effect from each hexagon
  hexagons.forEach(hexagon => {
    hexagon.style.stroke = 'lightgray';
    hexagon.style.filter = 'none'; // Remove the glow effect
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const primaryNav = document.querySelector('.primary-nav');
  const secondaryNavContainer = document.querySelector('.secondary-nav-container');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          secondaryNavContainer.classList.remove('all-off');
        } else {
          secondaryNavContainer.classList.add('all-off');
        }
      });
    },
    { threshold: 0 }
  );

  observer.observe(primaryNav);

  document.body.addEventListener('mousemove', (event) => {
    const rect = secondaryNavContainer.getBoundingClientRect();
    const isNearNav = (
      event.clientX >= rect.left - 10 &&
      event.clientX <= rect.right + 10 &&
      event.clientY >= rect.top - 10 &&
      event.clientY <= rect.bottom + 10
    );

    if (isNearNav && !secondaryNavContainer.classList.contains('show')) {
      secondaryNavContainer.classList.add('show');
    } else if (!isNearNav && secondaryNavContainer.classList.contains('show')) {
      secondaryNavContainer.classList.remove('show');
    }
  });
});

const hexagonSizeInput = document.getElementById('hexagonSizeInput');

hexagonSizeInput.addEventListener('change', function() {
  const newHexagonSize = parseInt(this.value);
  hexagonSize = newHexagonSize; // Update hexagonSize directly
  generateBackgroundPattern();
});

window.addEventListener('resize', generateBackgroundPattern); // This listener checks for the browser resize.  If the window changes size the background will re-generate.
