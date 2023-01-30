import { FetchService } from 'src/app/services/fetch.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface IForecast {
  location: {
    lat: string;
    long: string;
    city: string;
    region: string;
    country: string;
    zone: string;
    data: string;
  };
  weather: {
    icon: string;
    condition: string;
    temperature: string;
    feelslike: string;
    humidity: string;
    windspeed: string;
    winddirection: string;
    pressure: string;
    uvi: string;
  };
  airquality: {
    aqi: string;
    pm25: string;
    pm10: string;
    o3: string;
    co: string;
    no2: string;
    so2: string;
  };
  astronomy: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    phase: string;
    illumination: string;
  };
  satellite: {
    access: boolean;
    agency: string;
    series: string;
    designator: string;
    sector: string;
    resolution: string;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  response: IForecast | null = null;
  astronomy: boolean = false;
  satellite: boolean = false;
  loading: boolean = false;
  success: boolean = false;
  message: string = '';
  q: string = '';

  constructor(private router: Router, private ngZone: NgZone, private fetch: FetchService) {}

  ngOnInit(): void {
    this.retrieval(`https://app.kpnc.io/forecaster/api/`);
  }

  routerLink(route: any[]): void {
    this.ngZone.run(() => this.router.navigate(route)).then();
  }

  changed(control: any): void {
    this.q = control.value;
  }

  clicked(): void {
    if(this.q != '') {
      this.retrieval(`https://app.kpnc.io/forecaster/api/?nav=${this.q}`);
    } else {
      this.retrieval(`https://app.kpnc.io/forecaster/api/`);
    }
  }

  retrieval(url: string): void {
    let time = performance.now()
    this.satellite = false;

    this.response = null;

    this.loading = true;
    this.message = '';

    this.fetch.request(url).subscribe((response: IForecast) => {
        this.response = response;

        this.loading = false;
        this.success = true;
        this.message = `Data retrieved successfully (${Math.round(performance.now() - time)}ms)...`
    }, _ => {
      this.loading = false;
      this.success = false;
      this.message = 'Error: Unknown error, try again...'
    });
  }
}
