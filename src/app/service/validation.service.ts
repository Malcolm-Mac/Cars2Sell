import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  lengthOfInput(elementID: string, length: number, message: string) {

    if (this.validateImojis(elementID)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Emoji are not allowed</div> </div>';

      if ($("#error" + elementID).length == 0) {
        //  $(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        //$(errorCode).insertAfter("#" + elementID);
      }
      $("#" + elementID).addClass("error_input");
      return false;
    }
    let input: any = $("#" + elementID).val();
    let format = /[`!@#$%^&*+\=\[\]{};':"\\|,.<>\?~]/;

    let element: any = $("#" + elementID).val()

    if (element.length < length) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >' + message + '</div> </div>';
      $("#" + elementID).addClass("error_input");
      if ($("#error" + elementID).length == 0) {
        //$(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        // $(errorCode).insertAfter("#" + elementID);
      }
      return false
    }
    else {
      if (format.test(input)) {
        let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Special characters like(!@#$) are not allowed</div> </div>';
        if ($("#error" + elementID).length == 0) {
          $("#" + elementID).addClass("error_input");
          //  $(errorCode).insertAfter("#" + elementID);
        }
        else {
          $("#error" + elementID).remove();
          //  $(errorCode).insertAfter("#" + elementID);
        }

        return false;
      }
      else {
        // $("#" + elementID).removeClass("error_input");
        $("#error" + elementID).remove();
      }

    }
    return true;
  }
  validateImojis(elementID: string) {
    let format = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/
    var element: any = $("#" + elementID).val()
    return format.test(element)
  }

  validateNumberPhones(elementID: string) {
    let formatNotAllowed = /[` !#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;

    let format = /^(0)[1-9][0-9]{8}$/
    let input: any = $("#" + elementID).val();
    input = this.myTrim(input)
    let ddd = formatNotAllowed.test(input)
    if (this.validateImojis(elementID)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Emoji are not allowed</div> </div>';

      if ($("#error" + elementID).length == 0) {
        //    $(errorCode).insertAfter("#" + elementID);
      }
      else {
        $("#error" + elementID).remove();
        //  $("#" + elementID).insertAfter(errorCode);

      }
      $("#" + elementID).addClass("error_input");
      return false;
    }

    if (input.length > 0) {
      if (formatNotAllowed.test(input)) {
        let errorCode = '<div class="message_div" id="error' + elementID + '"><div> Special characters like(!<>#$) are not allowed</div> </div>';
        if ($("#error" + elementID).length == 0) {
          $("#" + elementID).addClass("error_input");
          // $(errorCode).insertAfter("#" + elementID);
        }
        else {
          $("#error" + elementID).remove();
          $(errorCode).insertAfter("#" + elementID);
        }

        return false;

      }
      let sss = format.test(input);

      if (!format.test(input)) {
        let errorCode = '<div class="message_div" id="error' + elementID + '"><div> Numbers is not in the right format</div> </div>';
        if ($("#error" + elementID).length == 0) {
          //$(errorCode).insertAfter("#" + elementID)
        }
        else {
          $("#error" + elementID).remove();
          // $(errorCode).insertAfter("#" + elementID);
        }
        $("#" + elementID).addClass("error_input");
        return false;
      }

    }
    else {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Please Enter on Of The Contact Details</div> </div>';

      if ($("#error" + elementID).length == 0) {
        // $(errorCode).insertAfter("#" + elementID);
      }
      else {
        $("#error" + elementID).remove();
        //  $("#" + elementID).insertAfter(errorCode);

      }
      $("#" + elementID).addClass("error_input");
      return false;
    }

    $("#" + elementID).removeClass("error_input");
    $("#error" + elementID).remove();

    return true;
  }

  myTrim(x: string) {

    if (x == null || x.length <= 0) {
      return " ";
    } else {
      return x.replace(/\s+/g, '');
    }

  }

  validateEmail(elementID: string) {
    let formatNotAllowed = /[` !#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/;
    let format = /\S+@\S+/;

    let input: any = $("#" + elementID).val();
    let ddd = formatNotAllowed.test(input)
    if (this.validateImojis(elementID)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Emoji are not allowed</div> </div>';

      if ($("#error" + elementID).length == 0) {
        //$(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        //$(errorCode).insertAfter("#" + elementID);
      }
      $("#" + elementID).addClass("error_input");
      return false;
    }
    let sss = format.test(input);
    if (!format.test(input)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div> Email format is not correct</div> </div>';
      if ($("#error" + elementID).length == 0) {
        //  $(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        //    $(errorCode).insertAfter("#" + elementID);
      }
      $("#" + elementID).addClass("error_input");
      return false;
    }
    else if (formatNotAllowed.test(input)) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Special characters like(!<>#$) are not allowed</div> </div>';
      if ($("#error" + elementID).length == 0) {
        $("#" + elementID).addClass("error_input");
        //     $(errorCode).insertAfter("#" + elementID);
      }
      else {
        $("#error" + elementID).remove();
        //       $(errorCode).insertAfter("#" + elementID);
      }

      return false;

    } else {
      $("#" + elementID).removeClass("error_input");
      $("#error" + elementID).remove();

    }
    return true;
  }

  validateDescrtion(elementID: string, length: number, message: string) {

    var input: any = $("#" + elementID).val();

    let formats = /[#$%^*_\\[\]{}\\|<>\~]/;

    if (input.length < length) {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >' + message + '</div> </div>';
      $("#" + elementID).addClass("error_input");
      if ($("#error" + elementID).length == 0) {
        //$(errorCode).insertAfter("#" + elementID)
      }
      else {
        $("#error" + elementID).remove();
        //$(errorCode).insertAfter("#" + elementID);
      }
      return false
    }
    else {
      if (formats.test(input)) {
        let errorCode = '<div class="message_div" id="error' + elementID + '"><div >Special characters like(!@#$) are not allowed</div> </div>';
        if ($("#error" + elementID).length == 0) {
          $("#" + elementID).addClass("error_input");
          //   $(errorCode).insertAfter("#" + elementID);
        }
        else {
          $("#error" + elementID).remove();
          //     $(errorCode).insertAfter("#" + elementID);
        }

        return false;
      }
      else {
        $("#" + elementID).removeClass("error_input");
        $("#error" + elementID).remove();
      }

    }
    return true;
  }

  dropDownSelected(elementID: string, message: string) {
    let selected = $("#" + elementID + " option:selected").val();

    if (selected == "") {
      let errorCode = '<div class="message_div" id="error' + elementID + '"><div >' + message + '</div> </div>'

      $("#" + elementID).addClass("error_input");
      if ($("#error" + elementID).length == 0) {
        //  $(errorCode).insertAfter("#" + elementID)
      }
      return false
    }
    else {
      $("#" + elementID).removeClass("error_input");
      $("#error" + elementID).remove();
    }
    return true;
  }

  onclickCheckbox(elementID: string) {
    if ($("#" + elementID).is(":checked")) {
      $("#TermsConditionss").removeClass("message_div")
      return false;
    } else {
      $("#TermsConditionss").addClass("message_div")
      return true;
    }

  }

}
