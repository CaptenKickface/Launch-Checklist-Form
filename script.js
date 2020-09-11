// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {               
               response.json().then( function(json) {
                  let jsonData = document.getElementById("missionTarget");
                  jsonData.innerHTML =`
                  <h2>Mission Destination</h2>
                  <ul>
                     <li>Name:${json[0].name}</li>
                     <li>Diameter:${json[0].diameter}</li>
                     <li>Star:${json[0].star}</li>
                     <li>Distance From Earth:${json[0].distance}</li>
                     <li>Number of Moons:${json[0].moons}</li>
                  </ul>
                  <img src = "${json[0].image}" alt='This should be a planet'>
                  `
               })
            });
   form.addEventListener("submit", function(event) {
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelInput = document.querySelector("input[name=fuelLevel]");
      let cargoInput = document.querySelector("input[name=cargoMass]");
      let myElement = document.querySelector("#faultyitems");      
      let pilotChange = document.getElementById("pilotStatus");
      let copilotChange = document.getElementById("copilotStatus");
      let fuelChange = document.getElementById("fuelStatus");
      let cargoChange = document.getElementById("cargoStatus");
      let shuttleAlert = document.getElementById("launchStatus");
      
      if (pilotInput.value === "" || copilotInput.value === "" || fuelInput.value === "" || cargoInput.value === "") {
         alert("All fields are required!");
         // stop the form submission
         event.preventDefault();
       } else if (isNaN(pilotInput.value) === false || isNaN(copilotInput.value) === false || isNaN(fuelInput.value) === true || isNaN(cargoInput.value) === true)  {
            alert("Make sure to enter valid information for each field!")
            event.preventDefault();
       }else if (fuelInput.value < 10000 || cargoInput.value > 10000){
               myElement.style.visibility = "visible"
               shuttleAlert.innerHTML = 'Shuttle not ready for launch'
               shuttleAlert.style.color = 'red'
               event.preventDefault();
               if (fuelInput.value < 10000) {
                  fuelChange.innerHTML = `Fuel level is too low for launch.`
               }
               if (cargoInput.value > 10000) {
                  cargoChange.innerHTML = `Cargo mass too high for launch.`
               // }
            // }
      }

      pilotChange.innerHTML = `Pilot ${pilotInput.value} is ready for launch.`
      copilotChange.innerHTML = `Copilot ${copilotInput.value} is ready for launch.`

      
      // if (fuelInput.value < 10000 || cargoInput.value > 10000){
      //    myElement.style.visibility = "visible"                
      //    event.preventDefault();
      //    if (fuelInput.value < 10000) {
      //       fuelChange.innerHTML = `Fuel level is too low for launch.`
      //    }
      //    if (cargoInput.value > 10000) {
      //       cargoChange.innerHTML = `Cargo mass too high for launch.`
      //    }
      }
   });
});
// document.querySelector("pilotStatus").value = `Pilot ${pilotName.value} is ready for launch.`;
// document.querySelector("copilotStatus") = `Copilot ${copilotName.value} is ready for launch.`
// document.querySelector("fuelStatus") = ``
// document.querySelector("cargoStatus") = ``
