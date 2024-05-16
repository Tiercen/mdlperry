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

  const lifeEventsSection = document.getElementById('life-events');

  // Fetch JSON data life-events
  fetch('./resources/data/life-events.json')
    .then(response => response.json())
    .then(data => {
      // Sort data in chronological order
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      // Loop through data and create list items
      data.forEach(life => {
          const lifeItem = document.createElement('li');
          lifeItem.classList.add('life-item');

          let lifeImg = ''; // Initialize empty string for life event image

        // Check if life.logo exists and create image element if it does
        if (life.img) {
          // Use backticks for template literals to handle dynamic paths
          logoHtml = `<img src="${life.img}" alt="${life.event}">`;
        }


        lifeItem.innerHTML = `
        <div><time>${life.year}</time>
        <h5 class="life-item-title">${life.event}</h5>
        <p class="life-item-txt">${life.description}</p>
        <div>${life.event}</div>
        </div>
        
      `;

      lifeEventsSection.appendChild(lifeItem);

      })

    })



  .catch(error => console.error(error));