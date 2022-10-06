import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('demo-video-canvas')
export class DemoVideoCanvas extends LitElement {
  static styles = css`
    canvas {
      width: 320px;
      height: 180px;
      background: pink;
    }
  `;

  render() {
    return html` <canvas></canvas> `;
  }
}
