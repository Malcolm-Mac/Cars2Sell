import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoServiceService {

  constructor(private title: Title, private meta: Meta) { }

  /* Default tags */
  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
  }

  /* OG tags */

  updateOgType(type: string) {
    this.meta.updateTag({ property: 'og:type', content: type })
  }

  updateOgTitle(title: string) {
    this.meta.updateTag({ property: 'og:title', content: title })
  }

  updateOgDescription(description: string) {
    this.meta.updateTag({ property: 'og:description', content: description })
  }

  /* Twitter tags */
  updateTwitterTitle(title: string) {
    this.meta.updateTag({ name: 'twitter:title', content: title })
  }

  updateTwitterCard(card: string) {
    this.meta.updateTag({ name: 'twitter:card', content: card })
  }

  updateTwitterDescription(description: string) {
    this.meta.updateTag({ name: 'twitter:description', content: description })
  }

}
