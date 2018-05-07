"use strict";
import { LitElement, html } from "@polymer/lit-element";
class HTImage extends LitElement {
  _render({ placeholder, image }) {
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
          background:#e2e2e2;
          width:100%;
          overflow:hidden;
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
      <picture style=${`padding-bottom: ${this.getPadding()}%;`}>
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
      placeholder: String,
      image: String,
      size: String
    };
  }

  constructor() {
    super();
  }

  getPadding() {
    if (this.size === undefined) return "100";
    let size = this.size.split("x");
    return "" + size[1] / size[0] * 100;
  }

  ready() {
    super.ready();
    this.shadowRoot.querySelectorAll("img").forEach(img => {
      img.addEventListener("load", e => {
        e.target.removeAttribute("loading", "");
      });
    });
  }
}

customElements.define(HTImage.is, HTImage);
