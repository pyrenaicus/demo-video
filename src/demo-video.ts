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

  #video-container {
    margin: auto;
    display: grid;
    grid-template-columns: 320px 1fr;
    grid-template-rows: 180 1fr;
    place-items: center;
  }

  video {
    grid-area: 1 / 1 / 2 / 2;
    width: 320px;
    height: 180px;
    background: grey;
  }
  canvas {
    grid-area: 1 / 1 / 2 / 2;
    display: none;
    width: 320px;
    height: 180px;
    background: grey;
    margin: 1rem 0;
  }
  #btn-container {
    margin-bottom: 5em;
  }
`;
@customElement('demo-video')
export class DemoVideo extends LitElement {
  static styles = appStyle;

  @query('#video')
  video!: HTMLVideoElement;

  @query('#canvas')
  canvas!: HTMLVideoElement;

  @state()
  private _constrains = {
    audio: false,
    video: { width: 320, height: 180, frameRate: { ideal: 25, max: 30 } },
  };

  @property({ type: String }) title = 'video blur demo';

  @property()
  isVideoOn: boolean = false;

  @property()
  isBlurOn: boolean = false;

  @property({
    hasChanged: (newVal: boolean, oldVal: boolean) => {
      return true;
    },
  })
  segmentationReady: boolean = false;

  render() {
    return html`
      <h3>${this.title}</h3>

      <div id="video-container">
        <video id="video"></video>
        <canvas id="canvas"></canvas>
      </div>
      <div id="btn-container">
        <button id="btn-video" @click=${this.videoCapture}>
          ${this.isVideoOn ? 'stop video' : 'start video'}
        </button>
        <button id="btn-blur" @click=${this.startBlur}>
          ${this.isBlurOn ? 'unblur' : 'Blurrr'}!
        </button>
      </div>
    `;
  }

  change() {
    this.video.style.display = 'none';
  }

  startBlur() {
    this.isBlurOn = !this.isBlurOn;
    this.startSegmentation();

    this.video.style.display = 'none';
    this.canvas.style.display = 'block';
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

  // async isSegmentationReady(){

  // }

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
    this.segmentationReady = true;
  }
}
