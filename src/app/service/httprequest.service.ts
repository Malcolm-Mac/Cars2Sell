import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { vehicleObject } from '../interfaces/vehiclesInterface'

@Injectable({
  providedIn: 'root'
})
export class HttprequestService {
  ipAddress: string = ""

  constructor(private http: HttpClient) {
    this.getIPAddress()
  }
  public xmlItems: any;

  getVehicleListing(): Observable<vehicleObject> {
    const url = `https://www.e-autodealerportal.co.za/Vehicles.svc/GetVehicleDetailsWithImages1?
      make=&body=&model=&Fuel=&TRANSMISSION=&typeseller=&DEALERNAME=&pricemin=&pricemax=&year=&mileagemin=&mileagemax=&pageNumber=1&pageSize=50000`
    return this.http.get<vehicleObject>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }



  getVehicleListings(xmlName: string): Observable<any> {
    const url = `https://www.e-autodealerportal.co.za/ListingFeeds/${xmlName}`
    return this.http.get(url,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')

        , responseType: 'text'
      }

    ).pipe(
      retry(2),
      catchError(this.handleError)
    )


  }
  getVehicleListingsLocal(xmlName: string): Observable<any> {
    const url = `/assets/xml/${xmlName}`
    return this.http.get(url,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')

        , responseType: 'text'
      }

    ).pipe(
      retry(2),
      catchError(this.handleError)
    )


  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getVehicleDeatails(vehicleID: string): Observable<vehicleObject> {
    const url = `https://www.e-autodealerportal.co.za/Vehicles.svc/GetVehicleDetailSinglePath?VehicleID=${parseInt(vehicleID)}`
    return this.http.get<vehicleObject>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  trackerRevelNumber(vehicleID: string, contactType: string, contactDetails: string): Observable<string> {
    const url = `https://www.e-autodealerportal.co.za/Vehicles.svc/ContactTracker?VehicleID=${vehicleID}&ips=${this.ipAddress}&Contacttype=${contactType}&contact=${contactDetails}`
    return this.http.get<string>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getIPAddress() {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress)
    });
  }

  sendEnquiry(DealerID: any, VehicleId: any, Listing: any, Name: any, Surname: any,
    ClientEmail: any, ClientPhone: any, Message: any, Make: any, Model: any, Price: any,
    DealerName: any, Mileage: any, Year: any, Finance: any, Insurance: any, VideoRequest: any, Location: any): Observable<HttpResponse<any>> {

    return this.http.get(`https://www.e-autodealerportal.co.za/Vehicles.svc/SendVehicleEnquiry?DealerID=
                          ${DealerID}&VehicleID=${VehicleId}&Listing=${Listing}&Name=${Name}&Surname=${Surname}&ClientEmail=${ClientEmail}&ClientPhone=${ClientPhone}
                          &Message=${Message}&MAKE=${Make}&MODEL=${Model}&PRICE=${Price}&DEALERNAME=${DealerName}&MILEAGE=${Mileage}
                          &YEAR=${Year}&FINANCE=${Finance}&INSURANCE=${Insurance}&videorequest=${VideoRequest}&Location=${Location}`,
      { observe: 'response' }).pipe(
        catchError(this.handleError)
      )
  }


  sendmessage(Name: any, Email: any, Contact: any, Message: any): Observable<HttpResponse<any>> {

    return this.http.get(`https://www.e-autodealerportal.co.za/Vehicles.svc/SendContactUs?ClientName=` + Name + "&ClientEmail=" + Email + "&ClientPhone=" + Contact + "&Message=" + Message, { observe: 'response' }).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
  sendErrorMessage(message: string) {

  }

  sendDealerSingUp(DEALERSHIPNAME: any, NAME: any, SURNAME: any, EMAIL: any, MESSAGES: any, PHONE: any, LOCATION: any, POSITION: any, FEEDS: any) {
    const url = `https://e-autodealerportal.co.za/Vehicles.svc/SendDealerSignup?DealershipName=${DEALERSHIPNAME}&Name=${NAME}&Surname=${SURNAME}&Email=${EMAIL}&Phone=${PHONE}&Messages=${MESSAGES}&Location=${LOCATION}&Feeds=${FEEDS}&position=${POSITION}`
    return this.http.get<vehicleObject>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
