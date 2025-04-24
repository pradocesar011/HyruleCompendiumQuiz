async function getHighlightedObject() {
    try {
      const idsResponse = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
      const idsData = await idsResponse.json();
      const allIds = idsData.objectIDs;

      let objectData = null;

      while (!objectData || objectData.isHighlight !== true || !objectData.primaryImageSmall) {
        const randomId = allIds[Math.floor(Math.random() * allIds.length)];
        const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`);
        objectData = await objectResponse.json();
      }

      // Display the data
      document.getElementById("artTitle").innerText = objectData.title || "Untitled";
      document.getElementById("artistName").innerText = objectData.artistDisplayName || "Unknown Artist";
      document.getElementById("artImage").src = objectData.primaryImageSmall;

    } catch (error) {
      console.error("Error fetching highlighted object:", error);
      document.getElementById("artTitle").innerText = "Failed to load artwork";
    }
  }

  window.onload = getHighlightedObject;

// fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/"+id)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       document.getElementById("artTitle").innerText = data.title;
//       document.getElementById("artistName").innerText = data.artistDisplayName;
//       document.getElementById("artImage").src = data.primaryImageSmall;
//     });