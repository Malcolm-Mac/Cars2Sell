import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { topNavigation, Vehicles, filterOptions, Banners, vehicleObject, topMAKES } from '../interfaces/vehiclesInterface'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InfoDataService } from '../service/info-data.service'
import { HttprequestService } from '../service/httprequest.service'
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true }) videoplayer: ElementRef;
  filterOption = {
    make: "All Makes",
    model: "All Models",
    maxPrice: "Max Price"
  }
  selectedmake:string="";
  sortable:any = []
  topbrand:topMAKES[]=[]
  start: number = 0
  end: number = 4
  vehicleData: Vehicles[] = []
  featured: Vehicles[] = []
  topBrand: Vehicles[] = []
  topBrandView: Vehicles[] = []
  banner: Banners[] = []
  topBrandSelected: string = "TOYOTA"
  filterDataArray: filterOptions[] = []
  toyota: boolean = true
  volkswagen: boolean = false
  makes: string[] = []
  models: string[] = []
  maxPrice: number[] = []
  ford: boolean = false
  bmw: boolean = false
  constructor(private vehicleDataService: InfoDataService, private http: HttprequestService,
    private route: ActivatedRoute,
    private router: Router) {
    document.addEventListener('click', this.offClickHandler.bind(this));
    document.addEventListener('click', this.videoPlay.bind(this));
  }

  /* ngAfterViewInit()
  {
    this.videoplayer.nativeElement.play();
  } */
  videoPlay() {
    this.videoplayer.nativeElement.play();
  }

  ngOnInit(): void {

    $(".loader_div").css("display", "none")
    this.banner = this.vehicleDataService.getBanners()
    this.vehicleData = this.vehicleDataService.getAllVehicle()
    if (this.vehicleData.length <= 0) {

      this.getAllStartUpFunction(this.vehicleDataService.startToCallFeed())
    }
    else {
      this.setDataToUser()

    }

  }

  getAllStartUpFunction(option: number) {
    switch (option) {
      case 1:
        this.http.getVehicleListings("EdealerWebsiteFeed.xml").subscribe(reponse => {
          this.convertXMLToObject(2, reponse, "EdealerWebsiteFeed.xml")
        }
          , errr => {
            this.getAllStartUpFunction(2)
            this.http.sendErrorMessage("Something wrong with api EdealerWebsiteFeed")
          })
        break;
      case 2:
        this.http.getVehicleListings("EdealerWebsiteFeed3.xml").subscribe(reponse => {
          this.convertXMLToObject(3, reponse, "EdealerWebsiteFeed3.xml")
        }
          , errr => {
            this.getAllStartUpFunction(3)
            this.http.sendErrorMessage("Something wrong with api EdealerWebsiteFeed3")
          })
        break;
      case 3:
        this.http.getVehicleListings("EdealerWebsiteFeed2.xml").subscribe(reponse => {
          this.convertXMLToObject(4, reponse, "EdealerWebsiteFeed2.xml")
        }, errr => {
          this.getAllStartUpFunction(4)
          this.http.sendErrorMessage("Something wrong with EdealerWebsiteFeed2")
        })
        break;
      case 4:
        this.http.getVehicleListings("EdealerWebsiteFeed1.xml").subscribe(reponse => {
          this.convertXMLToObject(5, reponse, "EdealerWebsiteFeed1.xml")
        }, errr => {
          this.getAllStartUpFunction(5)
          this.http.sendErrorMessage("Something wrong with EdealerWebsiteFeed1")
        })
        break;
      case 5:
        this.http.getVehicleListing().subscribe(reponse => {
          this.vehicleData = reponse.aaData.sort(() => Math.random() - 0.5)
          this.vehicleDataService.setAllVehicle(this.vehicleData)
          this.setDataToUser()
        },
          errr => {
            this.getAllStartUpFunction(1)
            this.http.sendErrorMessage("Something wrong with api")
          })
        break;
    }
  }

  convertXMLToObject(option: number, reponse: any, xmlName: string) {
    var parseString = require('xml2js').processors.stripPrefix;
    const p: xml2js.Parser = new xml2js.Parser({ explicitArray: false });
    p.parseString(reponse, (err: any, result: any) => {
      if (err) {
        this.getAllStartUpFunction(option)
        this.http.sendErrorMessage(`Something wrong when converting ${xmlName}, error ${err}`)
      }
      else {
        let vehicleData: Vehicles[] = result.WCFVehicleDetails.aaData.VehicleDetails;
        this.vehicleDataService.setAllVehicle(vehicleData)
        this.setDataToUser()
      }
    })
  }



  offClickHandler(event: any) {

    if (!$("#makeDiv:hover").length && !$("#makeDi:hover").length) {
      $("#makeDiv").hide()
    }

    if (!$("#modelDiv:hover").length && !$("#modelDi:hover").length) {
      $("#modelDiv").hide()
    }
    if (!$("#maxPriceDiv:hover").length && !$("#maxPriceDi:hover").length) {
      $("#maxPriceDiv").hide()
    }
  }
  setDataToUser() {
    this.featured = this.vehicleDataService.getFiaturedListing();
    console.log("getFiaturedListing")
    console.log(this.featured)
   // this.topBrand = this.vehicleDataService.getTopBrands()
    //this.filterTopBrand("Toyota")
    this.makes = this.vehicleDataService.getAllMakes()
    this.models = this.vehicleDataService.getAllModel();
    console.log(this.models)
    this.maxPrice = this.vehicleDataService.getMaxPrice()

    console.log(this.vehicleDataService.groupByKey("MAKE"))
    var ff =this.vehicleDataService.groupByKey("MAKE");
    this.TopBrands(ff);
  }
  TopBrands(ff:any){
   
    //for (var vehicle in ff) {
   //     this.sortable.push([vehicle, ff[vehicle]]);
    //}
    
    //this.sortable.sort(function(a:any, b:any) {
    //    return   b[1]-a[1];
    //});
    this.sortable=Object.entries(ff).sort(([,a]:any,[,b]:any) => b-a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
   var h=[];
    for(var i=0;i<9;i++){
      var d={
        BRAND: Object.keys(this.sortable)[i],
        NUM: this.sortable[Object.keys(this.sortable)[i]],
      }
      this.topbrand.push(d);
      h.push(Object.keys(this.sortable)[i]);
    }
    this.topBrand = this.vehicleDataService.getTopBrands(h)
    this.filterTopBrand(h[0])
    console.log(this.topBrand)
  }
  isNumber(num: any) {
    if (typeof num == "undefined") {
      return 0
    }
    else {
      num = num.toString()
    }
    if (num.includes(",")) {
      num = num.substring(0, num.indexOf(","))
    }

    var result = "";
    var gap_size = 3;
    var numb = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return numb;
  }

  redirectToComponent(vehicleID: string) {
    this.vehicleDataService.setVehicleDetails(vehicleID)
    const angularRoute = window.location.host;
    const angularProtocol = window.location.protocol;
    window.open(`${angularProtocol}//${angularRoute}//Vehicle-details;vehicleID=${vehicleID}`, "_blank");
  }

  moveright() {
    if (this.end < 12) {
      this.start += 4
      this.end += 4
    }
    else {
      this.start = 0
      this.end = 4
    }
    if (window.navigator.userAgent.toLowerCase().includes("mobi")) {
      let top = document.getElementById('TopBrands');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
    }
  }
  moveleft() {
    if (this.start > 0) {
      this.start -= 4
      this.end -= 4
    }
    else {
      this.start = 8
      this.end = 12
    }
    if (window.navigator.userAgent.toLowerCase().includes("mobi")) {
      let top = document.getElementById('TopBrands');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
    }
  }

  filterTopBrand(make: string) {
    this.selectedmake=make;
    this.toyota = false;
    this.volkswagen = false
    this.ford = false
    this.bmw = false
    switch (make.toLowerCase()) {
      case "toyota":
        this.toyota = true;
        break
      case "volkswagen":
        this.volkswagen = true;
        break;
      case "ford":
        this.ford = true
        break;
      case "bmw":
        this.bmw = true
        break;
    }
    this.topBrandSelected = make
    this.topBrandView = this.topBrand.filter(item => item.MAKE.toLowerCase() == make.toLowerCase())
  }

  countBrand(band: string) {
    return this.topBrand.filter(item => item.MAKE.toUpperCase() == band.toUpperCase()).length
  }
  filterBrand(brand: string) {
    this.vehicleDataService.setMake(brand)
    this.router.navigate(['/listing', { make: brand }]);
  }

  filterBy(option: string, data: any) {
    if (this.filterDataArray.some(item => item.name == option)) {
      this.filterDataArray = this.filterDataArray.filter(item => item.name == option)
    }
    switch (option) {
      case "make":
        this.filterOption.make = data
        $("#makeDiv").css("display", "none")
        if (data == "All Makes") {
          this.models = this.vehicleDataService.getAllModel()
        }
        else {
          this.models = this.vehicleDataService.sortModelByMake(data)
        }
        this.filterOption.model = "All Models"

        break
      case "model":
        this.filterOption.model = data
        $("#modelDiv").css("display", "none")
        break
      case "maxPrice":
        this.filterOption.maxPrice = data
        $("#maxPriceDiv").css("display", "none")
        break
    }



  }

  showOption(option: string) {

    switch (option) {
      case "make":
        this.controlDropDown("makeDiv")
        break;
      case "model":
        this.controlDropDown("modelDiv")
        break;
      case "maxPrice":
        this.controlDropDown("maxPriceDiv")
        break;
    }
  }

  controlDropDown(div: string) {
    if ($("#" + div).attr("style") == "display: flex;") {
      $("#" + div).hide()
    }
    else {
      $("#" + div).css("display", "flex")
    }
  }

  searchBodyType(bodyType: number) {
    this.vehicleDataService.setBodyType(bodyType)
    this.router.navigate(['/listing', { bodyType: bodyType }])
  }

  filterByDealer(dealershipName: string) {

    this.router.navigate(['/listing-dealer', dealershipName]).then(() => {

    });

  }

  filterData() {

    this.vehicleDataService.setFilterDateFromHomePage(this.filterOption.make, this.filterOption.model, this.filterOption.maxPrice)
    this.router.navigate(['/listing', { make: this.filterOption.make, model: this.filterOption.model, maxPrice: this.filterOption.maxPrice }]);
  }



}
