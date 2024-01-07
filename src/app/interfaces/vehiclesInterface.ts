export interface Vehicles{
  ACC100_FIN: string,
  ASPIRATION:string,
  BODY:string,
  CITY:string,
  COLOUR:string,
  COMMENTS:string,
  CONDITION:string,
  DATEUPLOADED:string,
  DEALEREMAIL:string,
  DEALERID:string,
  DEALERNAME:string,
  DEALERSHIPID:string,
  DESCRIPTION:string,
  DOORS:string,
  DRIVE:string,
  DRIVETYPE:string,
  ENDSECONDS:string,
  ENDTIME:string,
  ENGINE:string,
  ENGINECAPACITY:string,
  ENGINEPOWER:string,
  EXTERIORCOLOR:string,
  EXTRAS:string,
  FUELCAPACITY:string,
  FUELTYPE:string,
  FirstOwner:string,
  INTERIORCOLOR:string,
  LOGO:string,
  MAKE:string,
  MILEAGE:string,
  MINUTE:string,
  MODEL:string,
  PHONENUMBER:string,
  POWERe:string,
  PRICE:string,
  PageNr:string,
  RESERVE:string,
  MODELRANGE:string,
  ReservePrice:string,
  SEATS:string,
  SECONDS:string,
  SERVICEHISTORY:string,
  STARTTIME:string,
  STREET1:string,
  STREET2:string,
  TELEPHONENUMBER:string,
  TORQUE:string,
  TOTALROWS:string,
  TRANSMISSION:string,
  VEHICLEID:string,
  YEAR:string,
  pageSize:string,
  rowNumber:string,
  statusstart:string,
  vehicleImageList:Array<VehicleImageDetails>,
  vehicleImage:string,
  winner:string,
  VehicleAccessoriesList:Array<string>
  WIDTH: string,
    HEIGHT:string,
    LENGTH:string,
    CO2:string,
    REARTYPESIZE:string,
    FRONTTYPESIZE:string,
    FUELTANKSIZE:string,
    CUBICCAPACITY:string,
    NOGEARS:string,
    AXLECONFIGURATION:string,
    DISCDATE:string,
    INTRODATE:string
}
export interface topMAKES {
  BRAND: string,
  NUM: string,
 
}
export interface VehicleImageDetails
{
  IMAGEANGLE:string,
  IMAGEPATH:string,
  IMAGETYPE:string,
  VEHICLEIMAGE:string
}

export interface filterOptions
{
  name:string,
  value:string,
}

export interface vehicleObject
{
  aaData:Array<Vehicles>
}

export interface topNavigation
{
  Home:boolean,
  listing:boolean,
  financeCalcutor:boolean,
  FAQ:boolean
}

export interface Banners
{
  ADVERTSPATH:string,
  IMAGEANGLE:string,
  IMAGETYPE:string,
  URLS:string,
  TITLE:string
}

export interface BodyType
{
  body:string,
  index:number
} 
