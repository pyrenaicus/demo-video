export const getCustomUserMedia = (constraints?: any): Promise<MediaStream> => {
  const gum = navigator.mediaDevices.getUserMedia(
    constraints || { video: true, audio: false }
  );

  return gum.then(mediaStream => mediaStream);
};

export const videoToCanvas = async (
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  isCanvas: boolean
) => {
  const ctx = await canvas.getContext('2d');
  while (isCanvas) {
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
};
