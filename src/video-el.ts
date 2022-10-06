import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('video-el')
export class VideoEl extends LitElement {
  render() {
    return html` <video></video> `;
  }
}
