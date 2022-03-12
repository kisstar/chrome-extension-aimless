interface VideoData {
  aid: string;
  cid: string;
}

interface InitialState {
  videoData: VideoData;
}

declare interface Window {
  __INITIAL_STATE__: InitialState;
}

declare module '*?raw' {
  const value: string;

  export default value;
}
