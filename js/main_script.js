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
        <div class="col-md-4 entry correct-entry">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title text-capitalize">${correctEntry.name}</h5>
            </div>
          </div>
        </div>
        `;
        // <img src="${correctEntry.image}" class="card-img-top" alt="${correctEntry.name}" data-entry="correct">
        // <p class="card-text"><strong>Category:</strong> ${correctEntry.category}</p>
        // ${correctEntry.description ? `<p class="card-text">${correctEntry.description}</p>` : ''}
      
      $('#entries').append(correctCard);
          
      // Display the other entries in the regular section
      randomEntries.forEach((entry, index) => {
        if (index !== correctEntryIndex) {
          const card = `
            <div class="col-md-4 entry">
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title text-capitalize">${entry.name}</h5>
                </div>
              </div>
            </div>
            `;
                
          $('#entries').append(card);
        }

        // <img src="${entry.image}" class="card-img-top" alt="${entry.name}" data-entry="incorrect">
        // <p class="card-text"><strong>Category:</strong> ${entry.category}</p>
        // ${entry.description ? `<p class="card-text">${entry.description}</p>` : ''}
      });



      // Add click event to entry images
      $('.entry').on("click", function() {
        let $this = $(this);

        console.log($this + " has been clicked");
        

        if ($this.hasClass("correct-entry")) {
          // Show the correct message
          $('#resultMessage').show();
          console.log("Correct entry has been clicked");
        } else {
          console.log("INcorrect entry has been clicked"); 
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