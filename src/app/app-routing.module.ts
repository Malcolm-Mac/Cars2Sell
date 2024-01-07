import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { FinanceCalculatorComponent } from './finance-calculator/finance-calculator.component';
import { HomeComponent } from './home/home.component';
import { ListingsComponent } from './listings/listings.component';
import { VehicleDetailsComponent } from './listings/vehicle-details/vehicle-details.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { DealerSignUpComponent } from './dealer-sign-up/dealer-sign-up.component';
import { NoVehicleFoundComponent } from './no-vehicle-found/no-vehicle-found.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent,
    data: {

      title: 'Home Page | Cars2Sell - Official Site',
      metaTags: [
        { name: 'description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:title', content: 'Cars2Sell - Official Site' },
        { proprety: 'og:description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:type', content: 'website' },
        { name: "twitter:title", content: "Cars2Sell - Official Site" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: "Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website." }
      ]

    }
  },
  {
    path: 'faq', component: FaqComponent,
    data: {

      title: 'FAQ Page | Cars2Sell - Official Site',
      metaTags: [
        { name: 'description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:title', content: 'Cars2Sell - Official Site' },
        { proprety: 'og:description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:type', content: 'website' },
        { name: "twitter:title", content: "Cars2Sell - Official Site" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: "Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website." }
      ]

    }
  },
  {
    path: 'contact-us', component: ContactUsComponent,
    data: {

      title: 'Contact Us Page | Cars2Sell - Official Site',
      metaTags: [
        { name: 'description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:title', content: 'Cars2Sell - Official Site' },
        { proprety: 'og:description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:type', content: 'website' },
        { name: "twitter:title", content: "Cars2Sell - Official Site" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: "Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website." }
      ]

    }
  },
  {
    path: 'who-we-are', component: WhoWeAreComponent,
    data: {

      title: 'Who We Are Page | Cars2Sell - Official Site',
      metaTags: [
        { name: 'description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:title', content: 'Cars2Sell - Official Site' },
        { proprety: 'og:description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:type', content: 'website' },
        { name: "twitter:title", content: "Cars2Sell - Official Site" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: "Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website." }
      ]

    }
  },
  {
    path: 'finance-calculator', component: FinanceCalculatorComponent,
    data: {

      title: 'Finance Calculator Page | Cars2Sell - Official Site',
      metaTags: [
        { name: 'description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:title', content: 'Cars2Sell - Official Site' },
        { proprety: 'og:description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:type', content: 'website' },
        { name: "twitter:title", content: "Cars2Sell - Official Site" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: "Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website." }
      ]

    }
  },
  {
    path: 'listing', component: ListingsComponent,
    data: {

      title: 'Listing Page | Cars2Sell - Official Site',
      metaTags: [
        { name: 'description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:title', content: 'Cars2Sell - Official Site' },
        { proprety: 'og:description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:type', content: 'website' },
        { name: "twitter:title", content: "Cars2Sell - Official Site" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: "Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website." }
      ]

    }
  },
  {
    path: 'listing-dealer/:dealershipname', component: ListingsComponent,
    data: {

      title: 'Listing Dealer Page | Cars2Sell - Official Site',
      metaTags: [
        { name: 'description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:title', content: 'Cars2Sell - Official Site' },
        { proprety: 'og:description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:type', content: 'website' },
        { name: "twitter:title", content: "Cars2Sell - Official Site" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: "Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website." }
      ]

    }
  },
  {
    path: 'Vehicle-details', component: VehicleDetailsComponent,
    data: {

      title: 'Vehicle Details Page | Cars2Sell - Official Site',
      metaTags: [
        { name: 'description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:title', content: 'Cars2Sell - Official Site' },
        { proprety: 'og:description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:type', content: 'website' },
        { name: "twitter:title", content: "Cars2Sell - Official Site" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: "Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website." }
      ]

    }
  },
  {
    path: 'Dealer-Sign-Up', component: DealerSignUpComponent,
    data:
    {
      title: 'Dealer Sign-Up | Cars2Sell - Official Site',
      metaTags: [
        { name: 'description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:title', content: 'Dealer Sign-Up - Official Site' },
        { proprety: 'og:description', content: 'Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website.' },
        { property: 'og:type', content: 'website' },
        { name: "twitter:title", content: "Dealer Sign-Up - Official Site" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: "Simply Click A Car and Enquire on Top Quality Pre-Owned Used Cars in South Africa. At Cars2Sell browse thousands of used makes and models. Buy or Sell Your Next Car with Cars2Sell. South Africa&#x27;s leading car advertising website." }
      ]
    }
  },
  {
    path: 'no-vehicle-found', component: NoVehicleFoundComponent,
    data:
    {
      title: 'no-vehicle-found | Cars2Sell - Official Site'
    }
  },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
