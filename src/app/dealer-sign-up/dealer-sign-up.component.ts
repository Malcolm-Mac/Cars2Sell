import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsComponent } from '../listings/listings.component';
import { HttprequestService } from '../service/httprequest.service';
import { InfoDataService } from '../service/info-data.service';
import { ValidationService } from '../service/validation.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-dealer-sign-up',
  templateUrl: './dealer-sign-up.component.html',
  styleUrls: ['./dealer-sign-up.component.css'],
  providers: [ListingsComponent],
  animations: [
    trigger('dimBox', [
      state('notDimmed',
        style({ width: '0%', opacity: 0 })
      ),
      state('dimmed',
        style({ width: '100%', opacity: 1 })
      ),
      transition('notDimmed => dimmed', [
        animate('0.5s')
      ]),
      transition('dimmed => notDimmed', [
        animate('0.5s')
      ])
    ]),
    trigger('viewSubMenu', [
      state("closed",
        style({ display: 'none' })
      ),
      state('open',
        style({ display: 'block' })
      ),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ]),
    trigger('showMenuText', [
      state('hide',
        style({ opacity: 0 })
      ),
      state('show',
        style({ opacity: 1 })
      ),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('show => hide',
        [
          animate('0.5s')
        ])

    ]),
    trigger('showBottomText', [
      state('hide',
        style({ opacity: 0, height: '0%' })
      ),
      state('show',
        style({ opacity: 1, height: '30%' })
      ),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('show => hide',
        [
          animate('0.5s')
        ])

    ])
  ]
})
export class DealerSignUpComponent implements OnInit {
  showNameError: boolean = false
  showPositionError: boolean = false
  showBusinessError: boolean = false
  showSurnameError: boolean = false
  showContactError: boolean = false
  showEmailError: boolean = false
  showMessageError: boolean = false
  showLocationError: boolean = false
  showDealerrName: boolean = false
  showFeedError: boolean = false
  Location: string = "Location"
  City: Array<string> = []
  isDimmed: boolean = true

  constructor(private http: HttprequestService,
    private vehicleData: InfoDataService, private listing: ListingsComponent, private router: Router, private _Activatedroute: ActivatedRoute, private validation: ValidationService) { }

  ngOnInit(): void {
    this.City = this.vehicleData.getAllcities()
  }

  sendDealerSignUp() {
    this.showNameError = this.validation.lengthOfInput("Name", 1, "Please Enter Name") ? false : true
    this.showSurnameError = this.validation.lengthOfInput("Surname", 1, "Please Enter Surname") ? false : true
    this.showBusinessError = this.validation.lengthOfInput("BusinessName", 1, "Please Enter Business Name") ? false : true
    this.showPositionError = this.validation.lengthOfInput("Position", 1, "Please Enter Position") ? false : true
    this.showContactError = this.validation.validateNumberPhones("ContactNumber") ? false : true
    this.showEmailError = this.validation.validateEmail("Mail") ? false : true
    this.showLocationError = this.validation.dropDownSelected("Locations", "Please Enter Location") ? false : true
    this.showMessageError = this.validation.validateDescrtion("Message", 5, "Please Enter Message") ? false : true

    if (!this.showNameError && !this.showSurnameError && !this.showBusinessError && !this.showPositionError && !this.showEmailError && !this.showContactError &&
      !this.showMessageError && !this.showLocationError) {
      $(".loader_div").css("display", "flex")
      $("#LoadingText").html("Sending Enquiry")
      this.http.sendDealerSingUp($("#BusinessName").val(), $("#Name").val(), $("#Surname").val(), $("#Mail").val(), $("#Message").val(), $("#ContactNumber").val(), $("#Locations").val(),
        $("#Position").val(), "").subscribe((response: any) => {
          $(".loader_div").css("display", "none")
          $(".close_button_new").hide()
          this.clearFields()
          $("#successful_div").css("display", "flex")
        }
        )
    }

  }

  done() {
    this.closeEnquiryPopup()
    $("#successful_div").css("display", "none")
  }

  navigatateToLink(page: string) {
    if (page == "home") {
      this.router.navigate(["/"])
      this.cleardata()
    }
  }

  cleardata() {
    this.listing.clearSearch2()
  }

  showEnquiryPopup() {
    $(".close_button_new").show()
    $(".e-dealer_enquiry_form").css("display", "flex")
  }

  closeEnquiryPopup() {
    this.clearFields()
    $(".e-dealer_enquiry_form").css("display", "none")
  }

  clearFields() {
    $("#BusinessName").val("")
    $("#Name").val("")
    $("#Surname").val("")
    $("#Message").val("")
    $("#ContactNumber").val("")
    $("#Locations").val("")
    $("#Position").val("")
    $("#Mail").val("")
  }

  showMenu() {
    this.isDimmed = false
  }
  hideMenu() {
    this.isDimmed = true
  }

  animationEnd(event: any) {

  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }



}
