import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { DemoVideo } from '../src/demo-video.js';
// import '../src/demo-video.js';

describe('DemoVideo', () => {
  let element: DemoVideo;
  beforeEach(async () => {
    element = await fixture(html`<demo-video-app></demo-video-app>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('has a video element', () => {
    const video = element.shadowRoot!.querySelector('video')!;
    expect(video).to.exist;
  });

  it('has a canvas element', () => {
    const canvas = element.shadowRoot!.querySelector('canvas')!;
    expect(canvas).to.exist;
  });
});
