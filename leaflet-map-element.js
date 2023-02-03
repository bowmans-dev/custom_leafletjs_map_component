class LeafletMapElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""/>
      <style>

        body {
          align-items: center;
        } 

        #map {
          height: 450px;
          width: 80%;
        }
        
        .h1-container {
          color: #fff;
          background-color: #000;
          bottom: 0;
          right: 0;
          margin: 0;
          position: absolute;
          line-height: 9.5;
          width: 20%;
          background: linear-gradient(transparent, #000);
          
          overflow-y: scroll;
          overflow-x: hidden;
        }
        h1 {
          margin-bottom: 80%;
        }

        ul {
          list-style-type: none;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          padding: 0;
        }

        p {
          align-self: center;
          text-align: center;
          height: 100%;
        }

        @media screen and (max-width: 840px) {
          #map {
            height: 450px;
            width: 70%;
          }
          .h1-container{
            font-size: 0.75rem;
            width: 31%;
          }

          ul {
            font-size: 0.75rem;
            display: flex;
            flex-direction: column;
          }
          li {
            font-size: 0.5rem;
          }
        }

      </style>
      
      <br>
      <ul>
        <li>🔴 under 10km,</li>
        <li>🔶 under 100km,</li>
        <p>Added New:</p>
        <li>📗 over 100km,</li>
        <li>🔷 over 200km,</li>
      </ul>
      <div id="map"></div>
      <div class="h1-container">
        <h1></h1>
        <em></em>
      </div>

      <br>
      <ul>
        <li>💠 over 1000 km,</li> 
        <li>💠💠 over 2000 km,</li>  
        <li>💠💠💠 over 3000 km,</li> 
        <li>💠💠💠💠 over 4000 km</li> 
        <li>💠💠💠💠💠 over 5000 km</li>
      </ul>
      <br>
      <h1></h1>
    `;
  }

  connectedCallback() {
    this.map = L.map(this.shadowRoot.querySelector('#map')).setView([50.792073, -1.063223], 13);
    this.map.zoomControl.setPosition('bottomright');
    // this.map.scrollWheelZoom.disable();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    

    // create a custom marker icon for different distances from the default location 
    var myIcon = L.icon({
      iconUrl: './loc.png',
      iconSize: [24, 24],
      shadowUrl: './loc.png',
      shadowSize: [24, 24],
    });

    var myIcon2 = L.icon({
      iconUrl: './loc2.png',
      iconSize: [24, 24],
      shadowUrl: './loc2.png',
      shadowSize: [24, 24],
    });
    
    var myIcon3 = L.icon({
      iconUrl: './loc3.png',
      iconSize: [24, 24],
      shadowUrl: './loc3.png',
      shadowSize: [24, 24],
    });
    
    var myIcon4 = L.icon({
      iconUrl: './loc4.png',
      iconSize: [24, 24],
      shadowUrl: './loc4.png',
      shadowSize: [24, 24],
    });
    
    var myIcon5 = L.icon({
      iconUrl: './loc5.png',
      iconSize: [24, 24],
      shadowUrl: './loc5.png',
      shadowSize: [24, 24],
    });
    
    var myIcon6 = L.icon({
      iconUrl: './loc6.png',
      iconSize: [24, 24],
      shadowUrl: './loc6.png',
      shadowSize: [24, 24],
    });
    
   // THE DEFAULT MARKER LOCATION: 50.781429, -1.066585
    L.marker([50.781429, -1.066585], { icon: myIcon4 , tabIndex: 0}).addTo(this.map).bindPopup('This is the default location ༆ 50.781429, -1.066585');
    
    // when the marker is created / clicked or dragged to a new location
    this.map.on('click', (e) => {

      let newMarker = L.marker(e.latlng, { draggable: true, icon: myIcon2, tabIndex: 0, title: 'Click and drag to move marker', alt: 'Click and drag to move marker', jumpOnDrag: true, riseOnHover: true, keyboard: true });
      newMarker.addTo(this.map);
      newMarker.bindPopup(`You clicked the map at ${e.latlng.toString()}`);

      let distance = newMarker.getLatLng().distanceTo([50.781429, -1.066585]) / 1000;

    
      if (distance <= 10) {
        console.log('🔴');

        this.shadowRoot.querySelector('p').innerHTML = `🔴 ${Math.round(distance)}km` + `<br>`;
        this.shadowRoot.querySelector('h1').innerHTML += ` 🔴 ${Math.round(distance)}km` + `<br>`;
        newMarker.setIcon(myIcon);

      } else if (distance <= 100) {
        console.log('🔶');

        this.shadowRoot.querySelector('p').innerHTML = `🔶 ${Math.round(distance)}km` + `<br>`;
        //append the distance to the h1 element
        this.shadowRoot.querySelector('h1').innerHTML += `🔶 ${Math.round(distance)}km` + `<br>`;
        newMarker.setIcon(myIcon2);

      } else if (distance <= 200) {
        console.log('📗');

        this.shadowRoot.querySelector('p').innerHTML = `📗 ${Math.round(distance)}km` + `<br>`;
        //append the distance to the h1 element
        this.shadowRoot.querySelector('h1').innerHTML += `📗 ${Math.round(distance)}km` + `<br>`;
        newMarker.setIcon(myIcon3);
      
      } else if (distance <= 1000) {
        console.log('🔷');

        this.shadowRoot.querySelector('p').innerHTML = `🔷 ${Math.round(distance)}km` + `<br>`;

        this.shadowRoot.querySelector('h1').innerHTML += `🔷 ${Math.round(distance)}km` + `<br>`;
        newMarker.setIcon(myIcon4);

      } else if (distance <= 2000) {
        console.log('💠');
        this.shadowRoot.querySelector('p').innerHTML = `💠 ${Math.round(distance)}km` + `<br>`;

        this.shadowRoot.querySelector('em').innerHTML = `💠 ${Math.round(distance)}km` + `<br>`;
        newMarker.setIcon(myIcon6);
      } else if (distance <= 3000) {
        console.log('💠💠');
        this.shadowRoot.querySelector('p').innerHTML = `💠💠 ${Math.round(distance)}km` + `<br>`;

        this.shadowRoot.querySelector('em').innerHTML = `💠💠 ${Math.round(distance)}km` + `<br>`;
        newMarker.setIcon(myIcon5);
      } else if (distance <= 4000) {
        console.log('💠💠💠');
        this.shadowRoot.querySelector('p').innerHTML = `💠💠💠 ${Math.round(distance)}km` + `<br>`;

        this.shadowRoot.querySelector('em').innerHTML = `💠💠💠 ${Math.round(distance)}km` + `<br>`;
        newMarker.setIcon(myIcon3);
      } else if (distance <=5000) {
        console.log('💠💠💠💠');
        this.shadowRoot.querySelector('p').innerHTML = `💠💠💠💠 ${Math.round(distance)}km` + `<br>`;
        this.shadowRoot.querySelector('em').innerHTML = `💠💠💠💠 ${Math.round(distance)}km` + `<br>`;
        newMarker.setIcon(myIcon2);
      } else {
        console.log('💠💠💠💠💠');
        this.shadowRoot.querySelector('p').innerHTML = `💠💠💠💠💠 ${Math.round(distance)}km` + `<br>`;
        this.shadowRoot.querySelector('em').innerHTML = `💠💠💠💠💠 ${Math.round(distance)}km` + `<br>`;
        newMarker.setIcon(myIcon6);
      }

        
      newMarker.on('dragend', () => {
        newMarker.closePopup();    
        // display the distance between the default marker and the new marker    
        newMarker.bindPopup(` ${newMarker.getLatLng().toString()}` + `<br><br>` + `You dragged the marker ` + `<br>` + ` to a distance of ${distance.toFixed(1)} kilometers from the default marker`);
        newMarker.openPopup();
        //hide the previous click distance in p tag after dragging the marker to new location
        this.shadowRoot.querySelector('p').innerHTML = ``;
        distance = newMarker.getLatLng().distanceTo([50.781429, -1.066585]) / 1000;
        console.log(distance);
        //append the distance to the h1 element
        this.shadowRoot.querySelector('h1').innerHTML += ` ${Math.round(distance)}km` + `<br>`;
      });
    });
  }
}

customElements.define('leaflet-map', LeafletMapElement);