const timeline_wrapper = document.querySelector('.timeline-wrapper');

    const lifeEventsSection = document.querySelector('.timeline');

    // Fetch JSON data life-events
    fetch('./resources/data/life-events.json')
      .then(response => response.json())
      .then(data => {
        // Sort data in chronological order
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        const startMarker = lifeEventsSection.querySelector('.fixed.start'); // Added to get the fixed start and end markers
    
        // Loop through data and create list items
        data.forEach(life => {
          const lifeItem = document.createElement('li');
            // Get the date object
          const date = new Date(life.date);
  
          // Reformat the date using toLocaleDateString()
          const formattedDate = date.toLocaleDateString('en-US', {
            // weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: '2-digit'
          });
            lifeItem.setAttribute('data-date', formattedDate);
  
            let lifeImg = ''; // Initialize empty string for life event image
  
          // Check if life.logo exists and create image element if it does
          if (life.img) {
            // Use backticks for template literals to handle dynamic paths
            lifeImg = `<img src="${life.img}" alt="${life.event}">`;
          }
  
          lifeItem.innerHTML = `
          <span class="title">${life.event}</span>
          <div class="data">
            <h3>${life.title}</h3>
            <small>${formattedDate}</small>
            <p>${life.description}</p>
            <span class="close">Click To Close</span>
          </div>
        `;
  
        lifeEventsSection.appendChild(lifeItem);

        lifeEventsSection.insertBefore(lifeItem, lifeEventsSection.querySelector('.fixed.end')); // Added to get the fixed start and end markers

        
        // Add event listener to the new elements
        const timeLineElement = lifeItem.querySelector('.data');
        timeLineElement.onclick = () => timeLineElement.classList.toggle('show');

        });

        // Add touch event listeners for opening/closing the details
        const timeLineElement = lifeItem.querySelector('.data');

        timeLineElement.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent touch scrolling
        timeLineElement.classList.toggle('show');
        });
  
      });

// Navigation of timeline

const timelineWrapper = document.querySelector('.timeline-wrapper');
const timeline = document.querySelector('.timeline');
let isDragging = false;
let currentX;
let initialX;
let xOffset = 0;

timelineWrapper.addEventListener('mousedown', dragStart);
timelineWrapper.addEventListener('mouseup', dragEnd);
timelineWrapper.addEventListener('mouseleave', dragEnd);
timelineWrapper.addEventListener('mousemove', drag);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  isDragging = true;
  timelineWrapper.classList.add('grabbing'); // Add the 'grabbing' class
}

function dragEnd(e) {
  initialX = currentX;
  isDragging = false;
  timelineWrapper.classList.remove('grabbing'); // Remove the 'grabbing' class
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    xOffset = currentX;
    setTranslate(currentX, 0, timeline);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

let touchStart = null;
let touchEnd = null;

timelineWrapper.addEventListener('touchstart', (e) => {
  touchStart = e.touches[0].clientX;
  timelineWrapper.style.scrollSnapType = 'none'; // Disable scroll snapping during touch interaction
});

timelineWrapper.addEventListener('touchmove', (e) => {
  if (touchStart !== null) {
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStart;
    timeline.style.transform = `translateX(${diffX}px)`;
  }
});

timelineWrapper.addEventListener('touchend', () => {
  touchStart = null;
  timelineWrapper.style.scrollSnapType = 'x mandatory'; // Re-enable scroll snapping
  timeline.style.transform = 'none';
});