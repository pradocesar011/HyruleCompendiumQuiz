$(document).ready(function () {
  $(document).ready(function () {
    $.get("https://botw-compendium.herokuapp.com/api/v3/compendium/all", function (data) {
      const allEntries = data.data;
      const randomEntries = [];

      // Get 3 random entries
      while (randomEntries.length < 3) {
        const rand = Math.floor(Math.random() * allEntries.length);
        if (!randomEntries.includes(allEntries[rand])) {
          randomEntries.push(allEntries[rand]);
        }
      }

      // Randomly select the "correctEntry" from the 3 entries
      const correctEntryIndex = Math.floor(Math.random() * 3);
      const correctEntry = randomEntries[correctEntryIndex];

      // Inject the "correctEntry" image into the <img id="answerEntry">
      $('#answerEntry').attr('src', correctEntry.image);

      // Store the correct image URL to check against later
      const correctImageUrl = correctEntry.image;

      // Display the "correctEntry" in the regular entries section as well
      const correctCard = `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <img src="${correctEntry.image}" class="card-img-top" alt="${correctEntry.name}" data-entry="correct">
            <div class="card-body">
              <h5 class="card-title text-capitalize">${correctEntry.name}</h5>
              <p class="card-text"><strong>Category:</strong> ${correctEntry.category}</p>
              ${correctEntry.description ? `<p class="card-text">${correctEntry.description}</p>` : ''}
            </div>
          </div>
        </div>
      `;
      $('#entries').append(correctCard);

      // Display the other entries in the regular section
      randomEntries.forEach((entry, index) => {
        if (index !== correctEntryIndex) {
          const card = `
            <div class="col-md-4">
              <div class="card h-100 shadow-sm">
                <img src="${entry.image}" class="card-img-top" alt="${entry.name}" data-entry="incorrect">
                <div class="card-body">
                  <h5 class="card-title text-capitalize">${entry.name}</h5>
                  <p class="card-text"><strong>Category:</strong> ${entry.category}</p>
                  ${entry.description ? `<p class="card-text">${entry.description}</p>` : ''}
                </div>
              </div>
            </div>
          `;
          $('#entries').append(card);
        }
      });

      // Add click event to entry images
      $('#entries img').click(function () {
        const clickedImage = $(this).attr('src');
        
        if (clickedImage === correctImageUrl) {
          // Show the correct message
          $('#resultMessage').show();
        } else {
          // Hide the correct message if the answer is wrong
          $('#resultMessage').hide();
        }
      });
    });
  });




  //hacer cajas invisibles
  $('#testBtn').on('click', function () {
    // Get all grid-cells that are NOT yet transparent
    let visibleCells = $('.grid-cell').not('.transparent');

    // Check if there are any left
    if (visibleCells.length > 0) {
      // Pick a random index
      let randomIndex = Math.floor(Math.random() * visibleCells.length);

      // Make the randomly chosen cell transparent
      visibleCells.eq(randomIndex).addClass('transparent');
    }
  });
  $('#testBtnClear').on('click', function () {
    $('.grid-cell').addClass('transparent');
  });
});