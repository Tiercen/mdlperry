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

      workCard.innerHTML = `
        <div class="workhist-logo">${logoHtml}</div><h3>${work.position} - ${work.company}</h3>
        <span><h4>${startYear} to ${endYear}</h4></span>
        <p class="location">Location: ${work.location}</p>
        <p class="description">${work.description}</p>  `;

      workHistorySection.appendChild(workCard);
    });
  })
  .catch(error => console.error(error));

