import { useState, useEffect } from "react";

const useMic = (setMessage) => {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { SpeechRecognition, webkitSpeechRecognition } = window;
      const RecognitionConstructor = SpeechRecognition || webkitSpeechRecognition;
      const recognitionInstance = RecognitionConstructor ? new RecognitionConstructor() : null;

      if (recognitionInstance) {
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = "en-US";
      }

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleMicClick = () => {
    if (!recognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    if (!listening) {
      setListening(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };
    } else {
      recognition.stop();
      setListening(false);
    }
  };

  return { listening, handleMicClick };
};

export default useMic;
