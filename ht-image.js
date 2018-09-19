"use strict";
import { LitElement, html } from "@polymer/lit-element";
class HTImage extends LitElement {
  render() {
    const { placeholder, image } = this;
    return html`
      <style>
        :host {
          display: block;
          position:relative;
          box-sizing:border-box;
        }
        img {
          position: absolute;
          top:0;
          left:0;
          width: 100%;
          display:block;
        }
        picture {
          display: flex;
          position:relative;
          
          width:100%;
          overflow:hidden;
        }
        picture[loading] {
          background:#e2e2e2;
        }
        #placeholder {
          filter:blur(5px);
          transition: opacity 0.5s;
        }
        #image {
          transition: opacity 0.7s;
        }
        [loading] {
          opacity:0;
        }
      </style>
      <picture loading style=${`padding-bottom: ${this.getPadding()}%;`}>
        <img id="placeholder" loading src=${placeholder}>
        <img id="image" loading src=${image}>
      </picture>
`;
  }

  static get is() {
    return "ht-image";
  }

  static get properties() {
    return {
      placeholder: { type: String },
      image: { type: String },
      size: { type: String },
      ratio: { type: String }
    };
  }

  getPadding() {
    if (this.size) {
      let size = this.size.split("x");
      return "" + size[1] / size[0] * 100;
    }
    if (this.ratio) {
      return "" + (2 - this.ratio) * 100;
    }
    if (this.size === undefined && this.ratio === undefined) return "100";
  }

  firstUpdated() {
    this.shadowRoot.querySelector("picture").removeAttribute("loading", "");
    this.shadowRoot.querySelectorAll("img").forEach(img => {
      img.addEventListener("load", e => {
        e.target.removeAttribute("loading", "");
      });
    });
  }
}

customElements.define(HTImage.is, HTImage);
