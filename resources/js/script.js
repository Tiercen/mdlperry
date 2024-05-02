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

      workCard.innerHTML = `
        <h3>${work.position} - ${work.company}</h3>
        <span>${work.startDate} - ${work.endDate ? work.endDate : 'Present'}</span>
        <p>${work.description}</p>
      `;

      workHistorySection.appendChild(workCard);
    });
  })
  .catch(error => console.error(error));
