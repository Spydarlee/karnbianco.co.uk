//const { elements } = require("chart.js");

function syncIframeHeight() {
  this.style.height = this.contentWindow.document.documentElement.offsetHeight + "px";
}

function syncAllIframeHeights() {
  document.querySelectorAll(".height-synced-iframe").forEach(el => syncIframeHeight.bind(el)() );
}

function initGalleryMapMap(mapEl) {

  // Create a map to visualize gallery items spatially
  var map = L.map(mapEl, { fullscreenControl: true }).setView([51.505, -0.09], 1);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Display GPX route (if included)
  const mapFile = mapEl.getAttribute("data-route-file");
  if(mapFile) {
    new L.GPX(mapFile, {
      async: true,
      markers: {
          startIcon: null,
          endIcon: null,
          shadow: null
      },
      polyline_options: [{
        color: '#3f2a73ff',
      }]
    }).on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
    }).addTo(map);
  }

  // Create a custom marker icon
  var photoIcon = L.icon({
      iconUrl: '../../img/marker-icon.svg',
      shadowUrl: '../../img/marker-shadow.png',
      iconSize:     [40, 56], shadowSize:   [41, 41],
      iconAnchor:   [20, 56], shadowAnchor: [12, 40],
      popupAnchor:  [0, 0]
  });

  // Create markers for each gallery item with GPS data
  var features = [];
  document.querySelectorAll(".gallery-item").forEach(el => {
    let marker = L.marker([el.dataset.latitude, el.dataset.longitude], {icon: photoIcon}).addTo(map);
    features.push(marker);

    marker.bindPopup(
      `<a href='${el.href}' target='_blank'><img src='${el.dataset.thumbnail}'></img></a>`,
      {
        offset: L.point(0, -50),
        minWidth: 200,
        maxHeight: 250,
        closeOnClick: false
      }
    );
    marker.on('mouseover', function (e) { this.openPopup(); });
    marker.on('click', function (e) { this.openPopup(); });
  });

  // Fit map to markers (this will override fitting to route, if incuded)
  var group = new L.featureGroup(features);
  map.fitBounds(group.getBounds());
}

window.onload = function(){
  if (document.getElementsByClassName('gallery').length > 0) {
    new Masonry( '.gallery', {
      columnWidth: '.gallery-sizer',
      itemSelector: '.gallery-item',
      percentPosition: true,
      gutter: 5
    });
  }

  const mapEl = document.getElementById('gallery-map');
  if (mapEl) {
    initGalleryMapMap(mapEl);
  }

  // Wee hack to make sure iFrame content has loaded
  syncAllIframeHeights();
  setTimeout(syncAllIframeHeights, 2000);
}

window.onresize = (event) => {
  syncAllIframeHeights();
};
