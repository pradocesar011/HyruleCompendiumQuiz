$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search); // Get category selected from index
  let category = urlParams.get('category');
  
  newQuestion();

  
  
  function newQuestion() {
    $('#entries').empty();
    $('.grid-cell').removeClass('transparent');

    $('#resultMessage').hide();
    
    $.get("https://botw-compendium.herokuapp.com/api/v3/compendium/" + category, function (data) {
      const allEntries = data.data;
      const randomEntries = [];
      
      // Get 3 random entries
      while (randomEntries.length < 4) {
        const rand = Math.floor(Math.random() * allEntries.length);
        if (!randomEntries.includes(allEntries[rand])) {
          randomEntries.push(allEntries[rand]);
        }
      };
      
      // Randomly select the "correctEntry" from the 3 entries
      const correctEntryIndex = Math.floor(Math.random() * 4);
      const correctEntry = randomEntries[correctEntryIndex];
      
      // Inject the "correctEntry" image into the <img id="answerEntry">
      $('#answerEntry').attr('src', correctEntry.image);

      // Store the correct image URL to check against later
      const correctImageUrl = correctEntry.image;
      
      const correctCard = `
      <div class="col-3 d-flex justify-content-center">
        <button type="button" class="btn py-4 px-4 border-box text-wrap bg-black border boder-secondary border-4 entry w-100 fixed-height correct-entry rounded-pill btn-1">
            <h5 class="text-capitalize">${correctEntry.name}</h5>
          </button>
      <div/>

      `;
        // <img src="${correctEntry.image}" class="card-img-top" alt="${correctEntry.name}" data-entry="correct">
        // <p class="card-text"><strong>Category:</strong> ${correctEntry.category}</p>
        // ${correctEntry.description ? `<p class="card-text">${correctEntry.description}</p>` : ''}
        
        
      // Display entries in the regular section
      randomEntries.forEach((entry, index) => {
        if (index !== correctEntryIndex) {
          const card = `
          <div class="col-3 d-flex justify-content-center">
            <button type="button" class="btn py-4 px-4 border-box text-wrap bg-black border boder-secondary border-4 entry w-100 fixed-height entry rounded-pill btn-1">
              <h5 class="text-capitalize">${entry.name}</h5>
            </button>
          <div/>

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
          // $('#resultMessage').show();
          $('#resultMessage').fadeIn(500);
          
          clear();
        } else {
          console.log("INcorrect entry has been clicked"); 
          test();
        }
      });
    });
  };



  
  // Reload game button
  $("#reload-btn").on("click", function () {
    console.log("Reload clicked");
    newQuestion();
  });

  // Category filter buttons
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
  //  $('.grid-cell').removeClass('transparent').fadeOut(500);
  $('.grid-cell').addClass('transparent');
}


});