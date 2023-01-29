import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() data!: string;
  @Input() long!: string;
  @Input() lat!: string;
  icon!: L.Icon;
  map!: L.Map;

  initMap(): void {
    this.map = L.map('map').setView([Number(this.lat), Number(this.long)], 11);
      
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      maxZoom: 18,
      attribution: "<a href='https://www.openstreetmap.org/about' target='_blank'>OSM</a> | <a href='https://www.mapbox.com/' target='_blank'>MB</a>",
      id: 'mapbox/dark-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYWxiaWU2NTQ0IiwiYSI6ImNsZGZzcGc0cTA4ajUzbnJ5cTB1aWhuN2oifQ.mQansSlTFOqzUlMHzM8GAg'
    }).addTo(this.map);

    this.icon = L.icon({
      iconUrl: 'https://content.kpnc.io/img/kpnc/weather/Pin.png',
      shadowUrl: 'https://content.kpnc.io/img/kpnc/weather/Pin.png',
      iconSize:     [64, 64],
      shadowSize:   [64, 64],
      iconAnchor:   [32, 60],
      shadowAnchor: [32, 60],
      popupAnchor:  [0, -60]
  });

    L.marker([Number(this.lat), Number(this.long)], {icon: this.icon}).bindPopup(`Current Data Point (${this.data})`).addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}