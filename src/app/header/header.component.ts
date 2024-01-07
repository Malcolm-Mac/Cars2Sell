import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ListingsComponent } from '../listings/listings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
export class HeaderComponent implements OnInit {

  isDimmed: boolean = true
  constructor(private router: Router, private listing: ListingsComponent) {
    document.addEventListener('mouseover', this.offClickHandler.bind(this));
    document.addEventListener('mouseout', this.offClickHandler.bind(this));
    document.addEventListener('click', this.offClickHandler.bind(this));
  }

  ngOnInit(): void {


  }


  offClickHandler() {
    if ($("#dropdownNave:hover").length) {
      $("#dropdownNaveNav").addClass("w--open").css("top", "60px")
    }
    else {
      $("#dropdownNaveNav").removeClass("w--open")
    }

    if ($("#mainAboutUS:hover").length) {
      $("#mainAboutUSNav").addClass("w--open").css("top", "60px")
    }
    else {
      $("#mainAboutUSNav").removeClass("w--open")
    }
    if ($("#MobileNav:hover").length) {
      $("#MobileNavDIv").addClass("w--open").css("top", "60px")
    }
    else {
      $("#MobileNavDIv").removeClass("w--open")
    }
  }
  navigatateToLink(page: string) {
    this.hideMenu()
    if (page == "home") {
      this.router.navigate(["/"])
      this.cleardata()
    }
    if (page == "listing") {
      this.router.navigate(["/listing"])
      //this.cleardata()
    }
    if (page == "Finance") {
      this.router.navigate(["/finance-calculator"])
      this.cleardata()
    }
    if (page == "faq") {
      this.router.navigate(["/faq"])
      this.cleardata()
    }
    if (page == "who-we-are") {
      this.router.navigate(["/who-we-are"])
      this.cleardata()
    }
    if (page == "contact-us") {
      this.router.navigate(["/contact-us"])
      this.cleardata()
    }
    if (page == "dealership") {
      this.router.navigate(["/Dealer-Sign-Up"])
      this.cleardata()
    }

  }
  showMenu() {
    this.isDimmed = false
  }
  hideMenu() {
    this.isDimmed = true
  }

  animationEnd(event: any) {

  }
  toggleDropdown() {

  }

  cleardata() {
    this.listing.clearSearch2()
  }

}


