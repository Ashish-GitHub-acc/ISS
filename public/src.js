const issMarker = document.getElementById("marker");
const mapDiv = document.getElementById("map");
const container = document.getElementById("astro");
const location_info = document.getElementById("info");
let map;

async function getToken() {
  const token_response = await fetch("/accessToken");
  const token = await token_response.json();
  mapboxgl.accessToken = token.token;
  map = new mapboxgl.Map({
    container: "map",
    center: [94, 19],
    pitch: 15,
    style: "mapbox://styles/mapbox/streets-v11",
    zoom: 5,
    minZoom: 2,
  });
  map.addControl(new mapboxgl.NavigationControl());
  map.scrollZoom.disable();
  requestAnimationFrame(track);
}

async function track() {
  try {
    const iss = await fetch("/getISS/getLocation");
    const data = await iss.json();
    // console.log(data);
    const latitude = data.latitude.toFixed(2);
    const longitude = data.longitude.toFixed(2);
    const altitude = data.altitude.toFixed(2);
    const velocity = data.velocity.toFixed(2);

    location_info.innerHTML = `<div id="loc">Current Location</div><div id="lla">Latitude:  ${latitude}&deg;</div><div id="lla"> Longitude:  ${longitude}&deg;</div><div id="lla">Altitude:  ${altitude} Km</div><div id="lla">Velocity:  ${velocity} Km/hr</div>`;

    map.flyTo({
      center: [longitude, latitude],
    });
    requestAnimationFrame(track);
  } catch (err) {
    console.error(err);
  }
  // map.on("click", () => {
  //   location_info.style.display = "none";
  // });
}

async function getAstros() {
  try {
    const data = await fetch("/getISS/getAstros");
    const astros = await data.json();
    console.log(astros);
    let html = "";
    astros.forEach((astro, i) => {
      html += `<div class="name" id="nm${i++}">${astro.name}</div>`;
    });
    container.innerHTML = html;
  } catch (err) {
    console.error(typeof err);
  }
}

// issMarker.onclick = () => {
//   location_info.style.display = "block";
// };

getToken();
getAstros();
// requestAnimationFrame(track);
// window.onresize = () => document.location.reload();
