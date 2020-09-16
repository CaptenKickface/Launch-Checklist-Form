// Write your JavaScript code here!

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
      event.preventDefault();

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
      
      const v = "value"
      const pilotV = pilotInput[v];
      const copilotV = copilotInput[v];
      const fuelV = Number(fuelInput[v]);
      const cargoV = Number(cargoInput[v]);
      const typeErrorMsg = "Make sure to enter valid information for each field!";
      const emptyFieldsErrMsg = "All fields are required!";

      let pilotNamesValid = true;
      let fuelAndCargoValid = true;

      if (typeof pilotV !== "string" || typeof copilotV !== "string"){
         pilotNamesValid = false;
         alert(typeErrorMsg)
      } else if (pilotV === "" || copilotV === ""){
         pilotNamesValid = false;
         alert(emptyFieldsErrMsg);
      }

      if (typeof fuelInput[v] !== "number" || typeof cargoInput[v] !== "number" ) {
         fuelAndCargoValid = false;
         alert(typeErrorMsg)
      } else if (fuelV === "" || cargoV === ""){
         fuelAndCargoValid = false;
         alert(emptyFieldsErrMsg);
      }

      if (fuelV < 10000) {
         fuelAndCargoValid = false;
         fuelChange.innerHTML = `Fuel level is too low for launch.`
      } else {
         fuelChange.innerHTML = 'Fuel level is good to go';
      }

      if (cargoV > 10000){
         fuelAndCargoValid = false;
         cargoChange.innerHTML = `Cargo mass too high for launch.`
      } else {
         cargoChange.innerHTML = 'Cargo mass is a-okay!';
      }

      if (pilotNamesValid){
         pilotChange.innerHTML = `Pilot ${pilotInput.value} is ready for launch.`
         copilotChange.innerHTML = `Copilot ${copilotInput.value} is ready for launch.`
      }

      if (pilotNamesValid && fuelAndCargoValid){
         shuttleAlert.innerHTML = 'Shuttle ready for launch!'
         shuttleAlert.style.color = 'green'
      } else {
         myElement.style.visibility = "visible"
         shuttleAlert.innerHTML = 'Shuttle not ready for launch!'
         shuttleAlert.style.color = 'red'
      }

   });
});

