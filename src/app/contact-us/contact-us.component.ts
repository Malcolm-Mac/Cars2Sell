import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../service/httprequest.service';
import { ValidationService } from '../service/validation.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  Name: string;
  Surname: string;
  Email: string;
  Contact: string;
  Message: string;
  errorMsg: string;
  formObject = {
    Name: true,
    Surname: true,
    ContactNumber: true,
    Email: true,
    Message: true
  }

  constructor(private contactus: HttprequestService, private validation: ValidationService) { }

  ngOnInit(): void {
  }

  SendContactMessages() {

    this.formObject.Name = this.validation.lengthOfInput("Name", 1, "Please Enter Name") == true ? true : false;
    this.formObject.Surname = this.validation.lengthOfInput("Surname", 1, "Please Enter Surname") == true ? true : false
    this.formObject.ContactNumber = this.validation.validateNumberPhones("Contact") == true ? true : false
    this.formObject.Email = this.validation.validateEmail("Email") == true ? true : false
    this.formObject.Message = this.validation.validateDescrtion("Message", 1, "Please Enter Message") == true ? true : false
    if (Object.values(this.formObject).every(item => item == true)) {
      $(".loader_div").css("display", "flex")
      this.contactus.sendmessage(this.Name + " " + this.Surname, this.Email, this.Contact, this.Message).subscribe((response: any) => {

        $(".loader_div").css("display", "none")
        if (response.status == 200) {
          $("#successful_div").css("display", "flex");
         // $("#successMessage").html("Enquiry has been sent successful, We will contact you shortly")
        }
       

        this.Name = ""
        this.Surname = ""
        this.Email = ""
        this.Contact = ""
        this.Message = ""

      }, error => { this.errorMsg = error }
      );

    }
  }

  CloseEnquire()
  {
    $("#successful_div").css("display", "none");
  }

}
