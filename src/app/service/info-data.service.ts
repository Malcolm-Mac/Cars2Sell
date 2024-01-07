import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'path';
import { vehicleObject, filterOptions, Vehicles, Banners, VehicleImageDetails } from '../interfaces/vehiclesInterface';
import { HttprequestService } from './httprequest.service';

@Injectable({
  providedIn: 'root'
})
export class InfoDataService {
  allVehiclesData: Vehicles[] = []
  returnArray: Vehicles[] = []
  PriceValues = [0, 50000, 100000, 150000, 200000, 300000, 400000, 500000, 750000, 1000000]
  KMValues = [0, 10000, 25000, 50000, 100000, 150000, 200000]
  FuelType = ["Petrol", "Diesel", "Electric"]
  filterByData: filterOptions[] = []
  sortBYvalue: string = "MostRelevant"
  makeData: string = ""
  modelData: string = ""
  PriceData: string = ""
  bodyType: number = 10
  filterOption = {
    make: "All Makes",
    model: "All Models",
    color: "Colour",
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    minYear: 'Min Year',
    maxYear: 'Max Year',
    minKM: 'Min KM',
    maxKM: 'Max KM',
    FuelType: 'Fuel Types',
    transmission: 'Transmission',
    bodyType: 'Body Types'

  }
  Sedan: string[] = ["s/d", "sedan"]
  SUV: string[] = ["suv", "sportsutilityvehicle", "sav", "x/o", "crossover", "r/v", "sportactivityvehicle"]
  HATCH: string[] = ["hatch", "h/b", "Hatchback", "hatch (5-dr)"]
  Bus: string[] = ["bus", "b/s"]
  Cabriolet: string[] = ["cabriolet", "convertible", "c/b"]
  Coupe: string[] = ["coupe", "c/p"]
  Campers: string[] = ["campers"]
  ExtendedCab: string[] = ["extendedcab", "extended cab", "supercab", "singlecab", "s/c", "single cab", "single cab pick-up", "c/c", "doublecab", "double cab", "double cab pick-up", "d/c"]
  Fastback: string[] = ["fastback", "sportback"]
  Minibus: string[] = ["minibus"]
  MultiPurposeVehicle: string[] = ["multipurposevehicle", "mpv"]
  PanelVan: string[] = ["panelvan", "panel van", "p/v"]
  STATIONWAGON: string[] = ["station wagon", "s/w"]
  bodyTypeFilter: any[] = [this.Sedan, this.SUV, this.HATCH, this.Bus, this.Cabriolet, this.Coupe, this.Campers, this.ExtendedCab, this.Fastback,
  this.Minibus, this.MultiPurposeVehicle, this.PanelVan, this.STATIONWAGON]

  cities: Array<string> = ["Gauteng", "Mpumalanga", "KwaZulu-Natal", "Limpopo", "Free State", "Eastern Cape", "Northern Cape", "North West", "Western Cape"]
  banners: Array<Banners> = [{
    ADVERTSPATH: "assets/images/e-dealer.gif",
    IMAGEANGLE: "",
    IMAGETYPE: "",
    URLS: "https://portal.retailcapital.co.za/token/v1/profile/7e1l2r3o3t3l-7c6A-3ea3er3or3al-0908gGo-bI29/",
    TITLE: ""
  },
  {
    ADVERTSPATH: "assets/images/e-dealer.gif",
    IMAGEANGLE: "",
    IMAGETYPE: "",
    URLS: "https://portal.retailcapital.co.za/token/v1/profile/7e1l2r3o3t3l-7c6A-3ea3er3or3al-0908gGo-bI29/",
    TITLE: ""
  },
  {
    ADVERTSPATH: "assets/images/SSM.gif",
    IMAGEANGLE: "",
    IMAGETYPE: "",
    URLS: "https://e-dealerportal.co.za/",
    TITLE: ""
  },
  {
    ADVERTSPATH: "assets/images/Zambezi.jpg",
    IMAGEANGLE: "",
    IMAGETYPE: "",
    URLS: "https://e-dealerportal.co.za/",
    TITLE: ""
  },
  {
    ADVERTSPATH: "assets/images/Banner.gif",
    IMAGEANGLE: "",
    IMAGETYPE: "",
    URLS: "https://e-dealerportal.co.za/",
    TITLE: ""
  },
  {
    ADVERTSPATH: "assets/images/italpac.gif",
    IMAGEANGLE: "",
    IMAGETYPE: "",
    URLS: "https://www.italpac.co.za/",
    TITLE: ""
  }
  ]
  vehicleID: string = ""
  bodyTypes: [] = []

  constructor(private http: HttprequestService) { }

  getAllcities() {
    return this.cities;
  }

  setFilterDateFromHomePage(make: string, model: string, price: string) {
    this.makeData = make
    this.modelData = model
    this.PriceData = price
  }
  getFilterDateFromHomePage() {
    let filters: string[] = [this.makeData, this.modelData, this.PriceData]
    return filters;
  }
  getAllVehicle() {
    return this.allVehiclesData
  }

  setAllVehicle(vehicles: Vehicles[]) {
    this.allVehiclesData = vehicles
    this.returnArray = this.allVehiclesData
  }

  setAllVehicleDetails() {

    this.http.getVehicleListing().subscribe(reponse => {
      this.allVehiclesData = reponse.aaData
      this.returnArray = this.allVehiclesData

    })
  }
  getAllMakes() {
    let makes = this.allVehiclesData.map(item => {
      return item.MAKE.toUpperCase();
    }).sort((first, second) => first.localeCompare(second))
    return makes = makes.filter((item, index) => makes.indexOf(item) == index)

  }

  getAllModel() {
    let model = this.allVehiclesData.map(item => {
      return item.MODELRANGE.toUpperCase()
    }).sort((first, second) => first.localeCompare(second))
    return model.filter((item, index) => model.indexOf(item) == index)
  }

  getColor() {
    let color = this.allVehiclesData.filter(item => item.EXTERIORCOLOR != "").map(item => {

      return item.EXTERIORCOLOR[0].toUpperCase() + item.EXTERIORCOLOR.substring(1).toLowerCase();

    }).sort((first, second) => first.localeCompare(second))
    return color.filter((item, index) => color.indexOf(item) == index)
  }
  getMaxPrice() {
    return this.PriceValues.slice(1);
  }
  getMinPrice() {
    return this.PriceValues
  }
  clearSearch() {
    this.filterByData = []
    this.returnArray = this.allVehiclesData
  }
  filterBy(option: string, data: string) {

    this.returnArray = this.allVehiclesData;
    let filteringData = this.allVehiclesData;
    const filterByObject: filterOptions = {
      name: option,
      value: data
    }
    if (option == "make") {
      this.filterByData = this.filterByData.filter(item => item.name != "model")
    }
    if (Object.values(this.filterOption).includes(data)) {
      this.filterByData = this.filterByData.filter(item => item.name != option)

    }
    else {
      if (this.filterByData.some(item => item.name == option)) {
        this.filterByData = this.filterByData.filter(item => item.name != option)
        this.filterByData.push(filterByObject)
      }
      else {
        this.filterByData.push(filterByObject)
      }
    }


    for (let index = 0; index < this.filterByData.length; index++) {
      switch (this.filterByData[index].name) {
        case "make":
          this.returnArray = this.returnArray.filter((item) => item.MAKE.toLowerCase().includes(this.filterByData[index].value.toLowerCase()))
          break;
        case "model":
          this.returnArray = this.returnArray.filter((item) => item.MODELRANGE.toLowerCase().includes(this.filterByData[index].value.toLowerCase()))
          break;
        case "color":
          this.returnArray = this.returnArray.filter((item) => item.EXTERIORCOLOR.toLowerCase().includes(this.filterByData[index].value.toLowerCase()))
          break;
        case "color":
          this.returnArray = this.returnArray.filter((item) => item.EXTERIORCOLOR.includes(this.filterByData[index].value))
          break;
        case "minPrice":
          this.returnArray = this.returnArray.filter((item) => parseFloat(item.PRICE) >= parseFloat(this.filterByData[index].value))
          break;
        case "maxPrice":
          this.returnArray = this.returnArray.filter((item) => parseFloat(item.PRICE) <= parseFloat(this.filterByData[index].value))
          break;
        case "maxYear":
          this.returnArray = this.returnArray.filter((item) => parseFloat(item.YEAR) <= parseFloat(this.filterByData[index].value))
          break;
        case "minYear":
          this.returnArray = this.returnArray.filter((item) => parseFloat(item.YEAR) >= parseFloat(this.filterByData[index].value))
          break;
        case "maxKM":
          this.returnArray = this.returnArray.filter((item) => parseFloat(item.MILEAGE) < parseFloat(this.filterByData[index].value))
          break;
        case "minKM":
          this.returnArray = this.returnArray.filter((item) => parseFloat(item.MILEAGE) > parseFloat(this.filterByData[index].value))
          break;
        case "fuel":
          this.returnArray = this.returnArray.filter((item) => item.FUELTYPE.includes(this.filterByData[index].value))
          break;
        case "transmission":
          this.returnArray = this.returnArray.filter((item) => item.TRANSMISSION.includes(this.filterByData[index].value))
          break;
        case "bodytype":
          this.returnArray = this.returnArray.filter((item) => this.bodyTypeFilter[parseInt(this.filterByData[index].value)].includes(item.BODY.toLowerCase()))
          break;
      }

    }

    return this.sortBy(this.sortBYvalue);

  }

  
  sortModelByMake(make: string) {
    let filterByMake = this.allVehiclesData.filter(item => item.MAKE.toLowerCase() == make.toLowerCase())
    let model = filterByMake.map(item => {
      return item.MODELRANGE.toUpperCase()
    }).sort((first, second) => first.localeCompare(second))
    return model.filter((item, index) => model.indexOf(item) == index)
  }

  generateArrayOfYears() {
    let yearss = this.allVehiclesData.map(item => { return item.YEAR }).sort((first, second) => parseInt(first) > parseInt(second) ? -1 : 0)
    return (yearss.filter((item, index) => yearss.indexOf(item) == index).map(Number))
  }

  getMinKM() {
    return this.KMValues;
  }

  getMaxKM() {
    return this.KMValues.slice(1);
  }
  getFuelType() {
    return this.FuelType;
  }
  sortBy(option: string) {
    this.sortBYvalue = option;
    if ("MostRelevant" == option) {
      return this.returnArray.sort(() => Math.random() - 0.5)
    }
    switch (option) {
      case "Date":
        this.returnArray = this.returnArray.sort((a, b) => new Date(a.DATEUPLOADED) > new Date(b.DATEUPLOADED) ? -1 : 0)
        break;
      case "PriceLow":
        this.returnArray = this.returnArray.sort((a, b) => parseFloat(a.PRICE) < parseFloat(b.PRICE) ? -1 : 0)
        break;
      case "PriceHigh":
        this.returnArray = this.returnArray.sort((a, b) => parseFloat(a.PRICE) > parseFloat(b.PRICE) ? -1 : 0)
        break;
      case "MileageLow":
        this.returnArray = this.returnArray.sort((a, b) => parseFloat(a.MILEAGE) < parseFloat(b.MILEAGE) ? -1 : 0)
        break;
      case "MileageHigh":
        this.returnArray = this.returnArray.sort((a, b) => parseFloat(a.MILEAGE) > parseFloat(b.MILEAGE) ? -1 : 0)
        break;
      case "YearLow":
        this.returnArray = this.returnArray.sort((a, b) => parseFloat(a.YEAR) < parseFloat(b.YEAR) ? -1 : 0)
        break;
      case "YearHigh":
        this.returnArray = this.returnArray.sort((a, b) => parseFloat(a.YEAR) > parseFloat(b.YEAR) ? -1 : 0)
        break;
    }
    return this.returnArray
  }
  setBodyType(bodyBody: number) {
    this.bodyType = bodyBody
  }
  setMake(make: string) {
    this.makeData = make
  }
  getBodyType() {
    return this.bodyType
  }
  getFiaturedListing() {
    return this.allVehiclesData.sort((a, b) => parseInt(a.VEHICLEID) > parseInt(b.VEHICLEID) ? -1 : 0).filter(item =>
      item.vehicleImage != "https://e-dealerportal.co.za/images/huge.jpg" && item.DEALERID != "22")
  }
  getTopBrands(topBrand:any) {
   
    return this.allVehiclesData.filter((item) => topBrand.includes(item.MAKE.toUpperCase())).sort(() => Math.random() - 0.5)
  }
  groupByKey( key:any) {
    return this.allVehiclesData

    .reduce((accum:any, {MAKE}) => {
      accum[MAKE] = (accum[MAKE] || 0) + 1;
      return accum;
    }, {})
      //.reduce((hash:any, obj:any) => {
       // if(obj[key] === undefined) return hash.length; 
       // return Object.assign(hash, { [obj[key]]:( hash[obj[key] ]|| [] ).concat(obj)})
      ///}, {})
 }
  groupBrandAndCount(arr: any) {
    var counts = this.allVehiclesData.reduce((p, c, a) => {
      var name = c.MAKE;
      if (!p.hasOwnProperty(name)) {
        p = 0;
      }
      return p;
    }, {});
  }
  setVehicleDetails(vehicle: any) {
    if (vehicle != null) {
      this.vehicleID = vehicle
    }
  }
  getVehicleDetails() {
    return this.vehicleID
  }
  getSimilarVehicle(vehicleID: string) {
    let vehicleDetails = this.allVehiclesData.filter(item => item.VEHICLEID == vehicleID)
    let similarIndex = 0;
    let vehiclePrice = parseFloat(vehicleDetails[0].PRICE + 50000)
    let similarVehicle: Array<Vehicles> = []
    // this.allVehiclesData.filter(item => item.BODY == vehicleDetails[0].BODY && item.PRICE <= (vehicleDetails[0].PRICE + 50000) && item.VEHICLEID != vehicleID)
    if (similarVehicle.length < 12) {
      for (let index = 0; index < this.bodyTypeFilter.length; index++) {
        if (this.bodyTypeFilter[index].includes(vehicleDetails[0].BODY.toLowerCase())) {
          similarIndex = index;
          index = this.bodyTypeFilter.length;
        }
      }

      similarVehicle = similarVehicle.concat(this.allVehiclesData.filter(item => parseFloat(item.PRICE) <= vehiclePrice &&
        this.bodyTypeFilter[similarIndex].includes(item.BODY.toLowerCase()) && item.VEHICLEID != vehicleID && !similarVehicle.includes(item)))
    }
    if (similarVehicle.length < 12) {

      similarVehicle = similarVehicle.concat(this.allVehiclesData.filter(item => parseFloat(item.PRICE) <= vehiclePrice &&
        item.VEHICLEID != vehicleID && !similarVehicle.includes(item)))
    }
    return similarVehicle;
  }

  getBanners() {
    return this.banners;
  }
  getDealerVehicles(dealer: string) {
    return this.allVehiclesData.filter(item => item.DEALERNAME.toLowerCase() == dealer.toLowerCase())
  }

  getSimilarCar(vehicleID: string) {

    this.bodyTypeFilter
  }
  getVehicleDetailsPage(vehicleID: string): Vehicles {
    let TempvehicleDetails = this.allVehiclesData.filter(item => item.VEHICLEID == vehicleID)[0]
    let VehicleEmailDetai: VehicleImageDetails = {
      IMAGEANGLE: "Side view of the vehicle – right hand side",
      IMAGEPATH: TempvehicleDetails.vehicleImage,
      IMAGETYPE: "png",
      VEHICLEIMAGE: ""
    }
    let VehicleEmailDetaiarray: Array<VehicleImageDetails> = []
    VehicleEmailDetaiarray.push(VehicleEmailDetai)
    let VehicleDetai: Vehicles = {
      ACC100_FIN: "",
      ASPIRATION: "",
      BODY: TempvehicleDetails.BODY,
      CITY: TempvehicleDetails.CITY,
      COLOUR: TempvehicleDetails.COLOUR,
      COMMENTS: TempvehicleDetails.COMMENTS,
      CONDITION: TempvehicleDetails.CONDITION,
      DATEUPLOADED: TempvehicleDetails.DATEUPLOADED,
      DEALEREMAIL: TempvehicleDetails.DEALEREMAIL,
      DEALERID: TempvehicleDetails.DEALEREMAIL,
      DEALERNAME: TempvehicleDetails.DEALERNAME,
      DEALERSHIPID: TempvehicleDetails.DEALERSHIPID,
      DESCRIPTION: TempvehicleDetails.DESCRIPTION,
      DOORS: TempvehicleDetails.DOORS,
      DRIVE: TempvehicleDetails.DRIVE,
      DRIVETYPE: TempvehicleDetails.DRIVETYPE,
      ENDSECONDS: TempvehicleDetails.ENDSECONDS,
      ENDTIME: TempvehicleDetails.ENDTIME,
      ENGINE: TempvehicleDetails.ENGINE,
      ENGINECAPACITY: TempvehicleDetails.ENGINECAPACITY,
      ENGINEPOWER: TempvehicleDetails.ENGINEPOWER,
      EXTERIORCOLOR: TempvehicleDetails.EXTERIORCOLOR,
      EXTRAS: TempvehicleDetails.EXTRAS,
      FUELCAPACITY: TempvehicleDetails.FUELCAPACITY,
      FUELTYPE: TempvehicleDetails.FUELTYPE,
      FirstOwner: TempvehicleDetails.FirstOwner,
      INTERIORCOLOR: TempvehicleDetails.INTERIORCOLOR,
      LOGO: TempvehicleDetails.LOGO,
      MAKE: TempvehicleDetails.MAKE,
      MILEAGE: TempvehicleDetails.MILEAGE,
      MINUTE: TempvehicleDetails.MINUTE,
      MODEL: TempvehicleDetails.MODEL,
      PHONENUMBER: TempvehicleDetails.PHONENUMBER,
      POWERe: TempvehicleDetails.POWERe,
      PRICE: TempvehicleDetails.PRICE,
      PageNr: TempvehicleDetails.PageNr,
      RESERVE: TempvehicleDetails.RESERVE,
      MODELRANGE: TempvehicleDetails.MODELRANGE,
      ReservePrice: TempvehicleDetails.ReservePrice,
      SEATS: TempvehicleDetails.SEATS,
      SECONDS: TempvehicleDetails.SECONDS,
      SERVICEHISTORY: TempvehicleDetails.SERVICEHISTORY,
      STARTTIME: TempvehicleDetails.STARTTIME,
      STREET1: TempvehicleDetails.STREET1,
      STREET2: TempvehicleDetails.STREET2,
      TELEPHONENUMBER: TempvehicleDetails.TELEPHONENUMBER,
      TORQUE: TempvehicleDetails.TORQUE,
      TOTALROWS: TempvehicleDetails.TOTALROWS,
      TRANSMISSION: TempvehicleDetails.TRANSMISSION,
      VEHICLEID: TempvehicleDetails.VEHICLEID,
      YEAR: TempvehicleDetails.YEAR,
      pageSize: TempvehicleDetails.pageSize,
      rowNumber: TempvehicleDetails.rowNumber,
      statusstart: TempvehicleDetails.statusstart,
      vehicleImageList: VehicleEmailDetaiarray,
      vehicleImage: "",
      winner: "",
      VehicleAccessoriesList: TempvehicleDetails.VehicleAccessoriesList,
      WIDTH: "",
      HEIGHT:"",
      LENGTH:"",
      CO2:"",
      REARTYPESIZE:"",
      FRONTTYPESIZE:"",
      FUELTANKSIZE:"",
      CUBICCAPACITY:"",
      NOGEARS:"",
      AXLECONFIGURATION:"",
      DISCDATE:"",
      INTRODATE:""
    }
    console.log(VehicleDetai)
    return VehicleDetai
  }

  startToCallFeed() {
    return 1
  }
}
