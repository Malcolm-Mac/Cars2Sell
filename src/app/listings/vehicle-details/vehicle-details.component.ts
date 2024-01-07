import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttprequestService } from '../../service/httprequest.service'
import { InfoDataService } from '../../service/info-data.service'
import { Vehicles, vehicleObject, Banners } from '../../interfaces/vehiclesInterface'
import { ValidationService } from '../../service/validation.service'
import * as xml2js from 'xml2js';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { ViewChild } from '@angular/core'
import { parseNumbers } from 'xml2js/lib/processors';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicleDetailArray: Vehicles[] = [];
  SimilarCars: Vehicles[] = [];
  vehicleDetail = {} as Vehicles;
  vehicleDetails = {} as Vehicles;
  numberOfSlide: number[] = []
  PMTT: number = 0
  Name: string = ""
  City: string[] = []
  Location: string = "Location"
  totalInterest: number = 0
  totalPayment: number = 0
  vehicleID: string = ""
  Surname: string = ""
  Number: string = ""
  Mail: string = ""
  Message: string = ""
  Finance: boolean = false
  Insurance: boolean = false
  TestDrive: boolean = false
  TermsCondiotions: boolean = false
  showNameError: boolean = false
  showSurnameError: boolean = false
  showContactError: boolean = false
  showEmailError: boolean = false
  showLocationError: boolean = false
  showMessageError: boolean = false
  showTermsCondiotionsError: boolean = false;
  numberPhone: string = "012 - Reveal Number"
  returnHrefNumber: boolean = false
  Car_Price: number = 0;
  Interest_Rate: number = 9;
  Months: number = 60;
  Deposit: number = 0;
  Depositpercent: number = 0.0;
  Residual_Rate: number = 0;
  Residual_Amount: number = 0;
  Total_Interest: number = 0;
  Total_Payment: number = 0;
  Total: number = 0;
  Estimated_Instal: number = 0;
  banner: Banners[] = []
  start: number = 0
  end: number = 4
  months: number[] = [12, 24, 36, 48, 60, 72]
  hideScrollBar: boolean = true
  @ViewChild('nav', { read: DragScrollComponent, static: true }) ds: DragScrollComponent;
  constructor(private http: HttprequestService,
    private vehicleData: InfoDataService, private router: Router, private _Activatedroute: ActivatedRoute, private validation: ValidationService) {
    document.addEventListener('click', this.offClickHandler.bind(this));
  }

  offClickHandler(event: any) {
    if (!$("#Location:hover").length && !$("#Locatio:hover").length) {
      $("#Location").hide()
    }
    if (!$("#monthDiv:hover").length && !$("#monthDi:hover").length) {
      $("#monthDiv").hide()
    }
  }

  ngOnInit(): void {
    this.banner = this.vehicleData.getBanners()
    let searchParams = new URLSearchParams(this.router.url)
    console.log(this.router.url)
    let vehicleID = this._Activatedroute.snapshot.paramMap.get('vehicleID');
    this.vehicleData.setVehicleDetails(vehicleID)
    this.getVehicleDetails()
    this.City = this.vehicleData.getAllcities()
  }

  getVehicleDetails() {
    $(".loader_div").css("display", "flex")
    this.http.getVehicleDeatails(this.vehicleData.getVehicleDetails()).subscribe(response => {
      this.vehicleDetailArray = response.aaData
      //console.log(this.vehicleDetailArray)
      if (this.vehicleDetailArray.length > 0) {
        this.vehicleDetail = this.vehicleDetailArray[0]
        if (!this.vehicleDetail.vehicleImageList.some(item => item.IMAGEANGLE == "Side view of the vehicle – right hand side")) {
          this.vehicleDetail.vehicleImageList[0].IMAGEANGLE = "Side view of the vehicle – right hand side"
        }
        //console.log(this.vehicleDetail)
        this.vehicleID = this.vehicleDetail.VEHICLEID
        let lengthOfArray = Math.ceil((this.vehicleDetail.vehicleImageList.length / 4))
        this.numberOfSlide = Array.from({ length: lengthOfArray }, () => Math.floor(Math.random() * lengthOfArray))
        this.PMTT = Math.ceil((0.09 / 12) * (0 + parseInt(this.vehicleDetail.PRICE) *
          Math.pow(1 + (0.09 / 12), 60)) / ((Math.pow(1 + (0.09 / 12), 60) - 1) * (1 + (0.09 / 12) * 0)));
        this.Car_Price = parseFloat(this.vehicleDetail.PRICE)
        this.getAllStartUpFunction(this.vehicleData.startToCallFeed(), false)
        let phoneNumber = this.vehicleDetail.TELEPHONENUMBER != "undefined" && this.vehicleDetail.TELEPHONENUMBER.length ? this.vehicleDetail.TELEPHONENUMBER : this.vehicleDetail.PHONENUMBER
        this.numberPhone = phoneNumber.substring(0, 3) + " - Reveal Number"
        this.EstimatedInstal()
      } else {
        this.navigateToNoVehicleFound()
      }
      $(".loader_div").css("display", "none")
    },
      err => {
        //this.getAllStartUpFunction(2, true)
        this.navigateToNoVehicleFound()
      })
  }



  getAllStartUpFunction(option: number, assingToVehicleDetails: boolean) {
    switch (option) {
      case 1:
        this.http.getVehicleListings("EdealerWebsiteFeed.xml").subscribe(reponse => {
          this.convertXMLToObject(2, reponse, "EdealerWebsiteFeed.xml", assingToVehicleDetails)
        }
          , errr => {
            this.getAllStartUpFunction(2, assingToVehicleDetails)
            this.http.sendErrorMessage("Something wrong with api EdealerWebsiteFeed")
          })
        break;
      case 2:
        this.http.getVehicleListings("EdealerWebsiteFeed3.xml").subscribe(reponse => {
          this.convertXMLToObject(3, reponse, "EdealerWebsiteFeed3.xml", assingToVehicleDetails)
        }
          , errr => {
            this.getAllStartUpFunction(3, assingToVehicleDetails)
            this.http.sendErrorMessage("Something wrong with api EdealerWebsiteFeed3")
          })
        break;
      case 3:
        this.http.getVehicleListings("EdealerWebsiteFeed2.xml").subscribe(reponse => {
          this.convertXMLToObject(4, reponse, "EdealerWebsiteFeed2.xml", assingToVehicleDetails)
        }, errr => {
          this.getAllStartUpFunction(4, assingToVehicleDetails)
          this.http.sendErrorMessage("Something wrong with EdealerWebsiteFeed2")
        })
        break;
      case 4:
        this.http.getVehicleListings("EdealerWebsiteFeed1.xml").subscribe(reponse => {
          this.convertXMLToObject(5, reponse, "EdealerWebsiteFeed1.xml", assingToVehicleDetails)
        }, errr => {
          this.getAllStartUpFunction(1, assingToVehicleDetails)
          this.http.sendErrorMessage("Something wrong with EdealerWebsiteFeed1")
        })
        break;
      case 5:
        this.http.getVehicleListing().subscribe(reponse => {
          this.vehicleData.setAllVehicle(reponse.aaData.sort(() => Math.random() - 0.5))
          this.SimilarCars = this.vehicleData.getSimilarVehicle(this.vehicleID)
          if (assingToVehicleDetails) {
            this.vehicleDetail = this.vehicleData.getVehicleDetailsPage(this.vehicleID)
          }
        }, errr => {
          this.getAllStartUpFunction(1, assingToVehicleDetails)
          this.http.sendErrorMessage("Something wrong with api")
        })
        break;
    }
  }

  convertXMLToObject(option: number, reponse: any, xmlName: string, assingToVehicleDetails: boolean) {
    var parseString = require('xml2js').processors.stripPrefix;
    const p: xml2js.Parser = new xml2js.Parser({ explicitArray: false });
    p.parseString(reponse, (err: any, result: any) => {
      if (err) {
        this.getAllStartUpFunction(option, assingToVehicleDetails)
        this.http.sendErrorMessage(`Something wrong when converting ${xmlName}, error ${err}`)
      }
      else {
        let vehicleData: Vehicles[] = result.WCFVehicleDetails.aaData.VehicleDetails;
        this.vehicleData.setAllVehicle(vehicleData)
        this.SimilarCars = this.vehicleData.getSimilarVehicle(this.vehicleID).sort(() => Math.random() - 0.5)
        if (assingToVehicleDetails) {
          this.vehicleDetail = this.vehicleData.getVehicleDetailsPage(this.vehicleID)
        }
      }
    })
  }




  EstimatedInstal() {
    // let pvif =(Math.pow(1 + ((this.Interest_Rate / 100) / 12), this.Months));
    let rate = (this.Interest_Rate / 100) / 12;
    let montly = rate * ((this.Residual_Amount * Math.pow(1 + rate, this.Months) - this.Residual_Amount) + (this.Car_Price - this.Deposit - this.Residual_Amount) * Math.pow(1 + rate, this.Months))
      / ((Math.pow(1 + (rate), this.Months) - 1) * (1 + (rate * 0)));
    //var sssss = (this.Car_Price*((this.Interest_Rate / 100)))/(pvif-1);
    if (this.Residual_Amount > 0) {
      this.Residual_Rate = parseNumbers(((this.Residual_Amount / this.Car_Price) * 100).toFixed(2))
    }
    if (typeof montly == 'number' && !isNaN(montly) && isFinite(montly)) {
      var Residual_Amount= this.Residual_Amount;
      if(this.Residual_Amount){

      }else{
        Residual_Amount=0;
      }
      var Deposit= this.Deposit;
      if(this.Deposit){

      }else{
        Deposit=0;
      }
      this.Estimated_Instal = Math.round(montly);
      let dummyTotalpayment = Math.round(montly * this.Months) - Residual_Amount;
      this.Depositpercent=Math.round((Deposit/this.Car_Price  ) *100)
     var l=(dummyTotalpayment + parseFloat(Deposit.toString()))
     var k=(dummyTotalpayment + parseFloat(Deposit.toString())) - this.Car_Price
     var j=(2 *  parseFloat(Residual_Amount.toString()))
     this.Total_Interest= k+j
      //this.Total_Interest = Math.round((dummyTotalpayment + this.Deposit) - this.Car_Price + (2 *  parseFloat(Residual_Amount.toString())))
      this.Total_Payment = Math.round(montly * this.Months) + parseFloat(Residual_Amount.toString())

    }
    else {
      this.Estimated_Instal = 0
      this.Total_Payment = 0
      this.Total_Interest = 0
    }

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

  imageSelected(path: string, number: number) {

    $(".mainSlide").removeClass("active")
    $("#imageID" + number).addClass("active")
  }
  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index: number) {
    this.ds.moveTo(index);
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
      let top = document.getElementById('SimilarCars');
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
      let top = document.getElementById('SimilarCars');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
    }
  }

  sortyByAccessories(accessory: string) {
    this.router.navigate(["listing", { accessory: accessory }])
  }

  showCalculator() {
    $("#calculatorDiv").show().parent().css("display", "flex")
    $("#hideCalcula > a").css("display", "flex")
    $("#hideCalcula").show()
    $("#showCalcula").hide()
  }
  hideCalculator() {
    $("#calculatorDiv").hide().parent().css("display", "none")
    $("#hideCalcula").hide()
    $("#showCalcula").show()
  }

  calculatorResdifual(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 188 || charCode == 110 || charCode == 119 || charCode == 44 || charCode == 46){
     
    }else{
    if(this.Residual_Rate){
      var f= this.Residual_Rate.toString();
     f=f.replace(",",".");
     this.Residual_Rate= parseNumbers(f);
      }
      if (this.Residual_Rate <= 60) {
    
      }else{
       this.Residual_Rate=parseNumbers(this.Residual_Rate.toString().slice(0, -1));
      }
    this.Residual_Amount = Math.round((this.Residual_Rate / 100) * this.Car_Price)
    this.EstimatedInstal()
    }
  }
  calculatorResdifualPercentage() {
    if (this.Residual_Amount > (this.Car_Price* 0.6)) {
    }else{
    this.Residual_Rate = Math.round((this.Residual_Amount / this.Car_Price) * 100)
    this.EstimatedInstal()
    }
  }
  isThanCarPrice(event: any): boolean {
    if (this.Residual_Amount > (this.Car_Price* 0.6)) {
      return false
    }
    else {
      return true
    }
  }

  onKey(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 188 || charCode == 110 || charCode == 119 || charCode == 44 || charCode == 46){
     
    }else{
      if(this.Interest_Rate){
      var f= this.Interest_Rate.toString();
     f=f.replace(",",".");
     this.Interest_Rate= parseNumbers(f);
     if(this.Interest_Rate<=100){

    }else{
     this.Interest_Rate=100;
    }

      }
    this.EstimatedInstal()
    }
  }
  calculatorDeposit(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 188 || charCode == 110 || charCode == 119 || charCode == 44 || charCode == 46){
     
    }else{


    if(this.Deposit){
      var f= this.Deposit.toString();
     f=f.replace(",",".");
     this.Deposit= parseNumbers(f);
      }
   if (this.Deposit <= (this.Car_Price)) {
    
   }else{
    this.Deposit=parseNumbers(this.Deposit.toString().slice(0, -1));
   }
   this.EstimatedInstal()
    }
  }
  DepositnumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (this.Deposit > (this.Car_Price)) {
      return false;

    }
    if(charCode == 188 || charCode == 110 || charCode == 119 || charCode == 44 || charCode == 46){
      return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
     
      return false;
    }
    return true;
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 188 || charCode == 110 || charCode == 119 || charCode == 44 || charCode == 46){
      return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  selectMonths(number: number) {
    this.Months = number
    this.EstimatedInstal()
    $("#monthDiv").css("display", "none")
  }

  viewMonths() {

    if ($("#monthDiv").attr("style") == "display: flex;") {
      $("#monthDiv").hide()
    }
    else {
      $("#monthDiv").css("display", "flex")
    }
  }

  revelNumber() {
    let phoneNumber = this.vehicleDetail.TELEPHONENUMBER != "undefined" && this.vehicleDetail.TELEPHONENUMBER.length ? this.vehicleDetail.TELEPHONENUMBER : this.vehicleDetail.PHONENUMBER
    this.numberPhone = phoneNumber
    if (!this.returnHrefNumber) {
      this.http.trackerRevelNumber(this.vehicleDetail.VEHICLEID.toString(), "Phone", this.numberPhone).subscribe(response => {
        this.returnHrefNumber = true
      })
    }
  }

  OpenEnquire() {
    $("#enquiry_form").attr("style", "opacity: 1; display: block; width: auto; transition: opacity 400ms ease 0s;")
    $("#successful_div").hide()
  }

  CloseEnquire() {
    $("#enquiry_form").removeAttr("style")
    $("#enquiry_form").css("display", "none")
  }

  SendEnquery() {

    let Name = $("#Name").val();
    let surname = $("#Surname").val();
    let contact = $("#Contact-Number").val();
    let mail = $("#E-Mail").val();
    let message = $("#Message").val();
    let location = $("#location").val();
    this.Finance = $("#FinanceID").is(":checked")
    this.Insurance = $("#InsuranceID").is(":checked")
    this.TestDrive = $("#TestDriveID").is(":checked")
    this.TermsCondiotions = $("#TermsConditions").is(":checked")
    this.showNameError = this.validation.lengthOfInput("Name", 1, "Please Enter Name") ? false : true
    this.showSurnameError = this.validation.lengthOfInput("Surname", 1, "Please Enter Surname") ? false : true
    this.showContactError = this.validation.validateNumberPhones("Contact-Number") ? false : true
    this.showEmailError = this.validation.validateEmail("E-Mail") ? false : true
    this.showMessageError = this.validation.validateDescrtion("Message", 1, "Please Enter Message") ? false : true
    this.showLocationError = this.Location != "Location" ? false : true
    this.showTermsCondiotionsError = this.validation.onclickCheckbox("TermsConditions") ? false : true
    if (!this.showNameError && !this.showSurnameError && !this.showContactError && !this.showEmailError && !this.showMessageError && !this.showLocationError && this.showTermsCondiotionsError) {
      $(".loader_div").css("display", "flex")
      $("#LoadingText").html("Sending Enquiry")
      this.http.sendEnquiry(this.vehicleDetail.DEALERID, this.vehicleDetail.VEHICLEID, this.vehicleDetail.VEHICLEID, Name, surname, mail,
        contact, message, this.vehicleDetail.MAKE, this.vehicleDetail.MODEL, this.vehicleDetail.PRICE, this.vehicleDetail.DEALERNAME,
        this.vehicleDetail.MILEAGE, this.vehicleDetail.YEAR, this.Finance, this.Insurance, this.TestDrive, this.Location).subscribe((response: any) => {

          if (response.status == 200) {
            //$("#enquiry_form").removeAttr("style")
          }
          $("#successful_div").css("display", "flex")
          $("#Name").val("");
          $("#Surname").val("");
          $("#Contact-Number").val("");
          $("#E-Mail").val("");
          $("#FinanceID").prop("checked", false)
          $("#InsuranceID").prop("checked", false)
          $("#TestDriveID").prop("checked", false)
          $("#Message").val("");
          this.Location = "Location"
          $(".loader_div").css("display", "none")
        })
    }
  }

  showCities() {

    if ($("#Location").attr("style") == "display: flex;") {
      $("#Location").hide()
    }
    else {
      $("#Location").css("display", "flex")
    }
  }
  selectCity(city: string) {
    this.Location = city;
    $("#Location").css("display", "none")
  }

  redirectToComponents(vehicleID: string) {
    this.vehicleData.setVehicleDetails(vehicleID)
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/Vehicle-details`, { vehicleID: vehicleID }])
  }

  navigateToNoVehicleFound() {
    const angularRoute = window.location.host;
    const angularProtocol = window.location.protocol;
    window.open(`${angularProtocol}//${angularRoute}//no-vehicle-found;`, "_self");
  }


}
