import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '../video/demo-video-video.js';
import '../canvas/demo-video-canvas.js';
import '../buttons/demo-video-buttons.js';

@customElement('demo-video-app')
export class DemoVideoApp extends LitElement {
  @property({ type: String }) title = 'My app';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: white;
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  render() {
    return html`
      <h1>${this.title}</h1>
      <p>Edit <code>src/DemoVideo.ts</code> and save to reload.</p>

      <demo-video-video></demo-video-video>
      <demo-video-canvas></demo-video-canvas>
      <demo-video-buttons></demo-video-buttons>
    `;
  }
}
