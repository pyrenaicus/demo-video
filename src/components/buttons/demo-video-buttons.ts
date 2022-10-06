import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('demo-video-buttons')
export class DemoVideoButtons extends LitElement {
  render() {
    return html` <button>clock!</button> `;
  }
}
