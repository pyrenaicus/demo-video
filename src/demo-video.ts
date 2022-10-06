import { LitElement, html, css } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { getCustomUserMedia } from './utils.js';

const appStyle = css`
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

  video {
    width: 320px;
    height: 180px;
    background: gold;
  }
  canvas {
    width: 320px;
    height: 180px;
    background: pink;
    margin: 1rem 0;
  }
`;
@customElement('demo-video')
export class DemoVideo extends LitElement {
  static styles = appStyle;

  @state()
  private _constrains = {
    audio: false,
    video: { width: 320, height: 180, frameRate: { ideal: 25, max: 30 } },
  };

  @property({ type: String }) title = 'My app';

  @property()
  isVideoOn: boolean = false;

  @property()
  isBlurOn: boolean = false;

  @query('#video')
  video!: HTMLVideoElement;

  @query('#canvas')
  canvas!: HTMLVideoElement;

  render() {
    return html`
      <h1>${this.title}</h1>
      <p>Edit <code>src/DemoVideo.ts</code> and save to reload.</p>

      <video id="video"></video>
      <canvas id="canvas"></canvas>
      <button id="btn-video" @click=${this.videoCapture}>
        ${this.isVideoOn ? 'stop video' : 'start video'}
      </button>
      <button id="btn-blur" @click=${this.startBlur}>
        ${this.isBlurOn ? 'unblur' : 'Blurrr'}!
      </button>
    `;
  }

  startBlur() {
    this.isBlurOn = !this.isBlurOn;
    this.startSegmentation();
  }

  async videoCapture() {
    this.isVideoOn = !this.isVideoOn;
    const stream: MediaStream = await getCustomUserMedia(this._constrains);
    if (this.isVideoOn) {
      this.setVideoStream(this.video, stream);
    } else {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.stop();
      this.video.srcObject = null;
    }
  }

  setVideoStream(videoElement: HTMLVideoElement, stream: MediaStream) {
    videoElement.setAttribute('playsinline', 'true');
    videoElement.srcObject = stream;
    videoElement.play();
  }

  async startSegmentation() {
    console.log(this.video.width);
    this.video.height = this.video.videoHeight;
    this.video.width = this.video.videoWidth;
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;

    const performSegmentation = async net => {
      while (this.isBlurOn) {
        /* eslint-disable no-await-in-loop */
        const segmentation = await net.segmentPerson(this.video);
        // options for BokehEffect
        const backgroundBlurAmount = 10;
        const edgeBlurAmount = 6;
        // @ts-ignore
        bodyPix.drawBokehEffect(
          this.canvas,
          this.video,
          segmentation,
          backgroundBlurAmount,
          edgeBlurAmount
        );
      }
    };
    // @ts-ignore
    bodyPix
      .load()
      .then(net => performSegmentation(net))
      .catch(err => console.log(err));
  }
}
