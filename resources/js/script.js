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
        logoHtml = `<img src="${work.logo}" alt="${work.company} Logo">`;
      }

      // Extract year from startDate and endDate (handle cases with missing endDate)
      const startYear = new Date(work.startDate).getFullYear();
      const endYear = work.endDate ? new Date(work.endDate).getFullYear() : 'Present';

      // Truncate description for preview (adjust maxHeight as needed)
      const maxHeight = 130; // Adjust based on font size and desired preview length
      const descriptionPreview = work.description.substring(0, work.description.split(/\s+/).slice(0, Math.ceil(maxHeight / 10)).join(' ').length) + '...';
      const description = work.description

      workCard.innerHTML = `
        <div class="workhist-logo">${logoHtml}</div>
        <h3>${work.position} - ${work.company}</h3>
        <span><h4>${startYear} to ${endYear}</h4></span>
        <p class="location">Location: ${work.location}</p>
        <a href="#" class="description-toggle">Show More</a>
        <p class="description">${descriptionPreview}</p>
      `;

        // Toggle link click event handler
        const toggleLink = workCard.querySelector('.description-toggle');
        toggleLink.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default link behavior (navigation)

        if  (toggleLink.textContent === "Show More") {
          workCard.querySelector('.description').textContent = description;
          toggleLink.textContent = 'Show Less';
        } else {
          workCard.querySelector('.description').textContent = descriptionPreview;
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