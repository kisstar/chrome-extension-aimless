declare module '*?raw' {
  const value: string;

  export default value;
}

declare module '*.css';

// --- For bilibili ---
interface VideoData {
  title: string;
  aid: string;
  cid: string;
}

interface InitialState {
  videoData: VideoData;
}

declare interface Window {
  __INITIAL_STATE__: InitialState;
}
