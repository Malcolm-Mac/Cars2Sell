import { Component, OnInit } from '@angular/core';
import { InfoDataService } from '../service/info-data.service'
import { topNavigation, Vehicles, filterOptions, Banners } from '../interfaces/vehiclesInterface'
@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.css']
})
export class WhoWeAreComponent implements OnInit {
  banner: Banners[] = []
  constructor(private vehicleDataService:InfoDataService) { }

  ngOnInit(): void {
    this.banner = this.vehicleDataService.getBanners()
  }

}
