import { Component, Input } from '@angular/core';


export interface ISatellite {
  access: boolean;
  agency: string;
  series: string;
  designator: string;
  sector: string;
  resolution: string;
}

@Component({
  selector: 'app-imager',
  templateUrl: './imager.component.html',
  styleUrls: ['./imager.component.scss']
})
export class ImagerComponent {
  @Input() satellite!: ISatellite;
  @Input() product!: string[];
  @Input() title!: string;
  @Input() sub!: string;

  imager(): void {
    
  }

  opener(url: string): void {
    window.open(url, '_blank');
  }
}
