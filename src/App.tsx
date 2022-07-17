import React from 'react';
import './App.css';
import * as Leaflet from 'leaflet';
import 'leaflet.markercluster';
import clown from './clown.png';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

function App() {
  console.log(clown);
  const [container, setContainer] = React.useState<HTMLDivElement | null>()
  React.useEffect(() => {
    if(container) {
      const map = Leaflet.map(container, {
        center: [51.505, -0.09],
        zoom: 3,
        maxBounds: [[-180, -180], [180, 180]],
        maxBoundsViscosity: 1,
        bounceAtZoomLimits: false
      })
      Leaflet.tileLayer(
        // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
          {
          noWrap: true,
          maxZoom: 19,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
        .addTo(map);

      const clownIcon = Leaflet.icon({
        iconUrl: clown,
        iconSize: new Leaflet.Point(30, 30),
      })
      const createClusterCustomIcon = function (cluster: any) {
        return Leaflet.divIcon({
          html: `<span>
            <img src="${clown}" style="width: 80%"}>
            <div style="transform: translate(-25%, -25%)">${cluster.getChildCount()}</div>
          </span>`,
          className: "customMarker",
          iconSize: Leaflet.point(30, 30, true)
        });
      };

      const cluster = Leaflet.markerClusterGroup({iconCreateFunction: createClusterCustomIcon});
      cluster.addLayer(
        Leaflet.marker([51.5, -0.09], {icon: clownIcon}).bindPopup('hello')
      );
      cluster.addLayer(
        Leaflet.marker([51.5, -0.09], {icon: clownIcon}).bindPopup('jello')
      );
      map.addLayer(cluster);
    
    }
  }, [container]);
  return (
    <div className="App">
      <div ref={r => setContainer(r)} style={{ width: '100vw', height: '100vh'}}>
      </div>
    </div>
  );
}

export default App;
