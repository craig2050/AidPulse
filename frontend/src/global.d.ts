declare module "*.webp" {
  const value: string;
  export default value;
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export {}; // Ensures this file is treated as a module
