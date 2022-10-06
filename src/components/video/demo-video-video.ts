import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('demo-video-video')
export class DemoVideoVideo extends LitElement {
  static styles = css`
    video {
      width: 320px;
      height: 180px;
      background: gold;
    }
  `;

  render() {
    return html` <video></video> `;
  }
}
