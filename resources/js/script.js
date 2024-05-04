const workHistorySection = document.getElementById('work-history');

// Fetch JSON data
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

      // Truncate description for preview (adjust max-height and number of lines as needed)
      const maxLines = 3;  // Number of lines to show in preview
      const descriptionPreview = work.description.split(/\r?\n|\r/).slice(0, maxLines).join('\n');

      workCard.innerHTML = `
        <div class="workhist-logo">${logoHtml}</div>
        <h3>${work.position} - ${work.company}</h3>
        <span><h4>${startYear} to ${endYear}</h4></span>
        <p class="location">Location: ${work.location}</p>
        <p class="description-preview">${descriptionPreview}...</p>
        <a href="#" class="description-toggle">Read More</a>
        <p class="description">${work.description}</p>
      `;

      // Initial state: Hide full description and show preview
      const fullDescription = workCard.querySelector('.description');
      fullDescription.style.display = 'none';

      // Toggle link click event handler
      const toggleLink = workCard.querySelector('.description-toggle');
      toggleLink.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent default link behavior (navigation)

        // Toggle visibility based on current state
        fullDescription.style.display = fullDescription.style.display === 'none' ? 'block' : 'none';
        descriptionPreview.style.display = fullDescription.style.display === 'block' ? 'none' : 'block';

        // Update link text based on visibility
        toggleLink.textContent = fullDescription.style.display === 'none' ? 'Show More' : 'Show Less';
      });

      workHistorySection.appendChild(workCard);
    });
  })
  .catch(error => console.error(error));
