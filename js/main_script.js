$(document).ready(function () {
  $(document).ready(function () {
    let category = "all";
    
    newQuestion();

    $("#reload-btn").on("click", function () {
      console.log("Reload clicked");
      newQuestion();
    });

    $("#btn-creatures").on("click", function () {
      category = "category/creatures";
      newQuestion();
    });
    $("#btn-equipment").on("click", function () {
      category = "category/equipment";
      newQuestion();
    });
    $("#btn-materials").on("click", function () {
      category = "category/materials";
      newQuestion();
    });
    $("#btn-monsters").on("click", function () {
      category = "category/monsters";
      newQuestion();
    });
    $("#btn-treasure").on("click", function () {
      category = "category/treasure";
      newQuestion();
    });
    $("#btn-all").on("click", function () {
      category = "all";
      newQuestion();
    });
    
    
    function newQuestion() {
      $('#entries').empty();
      $('.grid-cell').removeClass('transparent');
      $('#resultMessage').hide();

      $.get("https://botw-compendium.herokuapp.com/api/v3/compendium/" + category, function (data) {
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
  
        const correctCard = `
          <button type="button" class="col mx-3 py-3 btn btn-secondary entry correct-entry">
            <h5 class="text-capitalize">${correctEntry.name}</h5>
          </button>
        `;
          // <img src="${correctEntry.image}" class="card-img-top" alt="${correctEntry.name}" data-entry="correct">
          // <p class="card-text"><strong>Category:</strong> ${correctEntry.category}</p>
          // ${correctEntry.description ? `<p class="card-text">${correctEntry.description}</p>` : ''}
        
          
        // Display entries in the regular section
        randomEntries.forEach((entry, index) => {
          if (index !== correctEntryIndex) {
            const card = `
            <button type="button" class="col mx-3 py-3 btn btn-secondary entry">
            <h5 class="text-capitalize">${entry.name}</h5>
            </button>
            `;
            
            $('#entries').append(card);
          } else if (index == correctEntryIndex) {
            $('#entries').append(correctCard);
          }
        });

        $('#correct-name').text(correctEntry.name);
        $('#correct-description').text(correctEntry.description);
  
        // Add click event to entry images
        $('.entry').on("click", function() {
          let $this = $(this);
          $this.prop("disabled", true);
    
          if ($this.hasClass("correct-entry")) {
            console.log("Correct entry has been clicked");
            // Show the correct message
            $('#resultMessage').show();
            clear();
          } else {
            console.log("INcorrect entry has been clicked"); 
            test();
          }
        });
      });
    }
  });
  
  
  

  function shuffle() {
    
  }


  // GRID CELL MANAGEMENT

  function test () {
    // Get all grid-cells that are NOT yet transparent
    let visibleCells = $('.grid-cell').not('.transparent');
    
    // Check if there are any left
    if (visibleCells.length > 0) {
      // Pick a random index
      let randomIndex = Math.floor(Math.random() * visibleCells.length);
  
      // Make the randomly chosen cell transparent
      visibleCells.eq(randomIndex).addClass('transparent');
    }
  };
  
  function clear () {
    $('.grid-cell').addClass('transparent');
  };

});