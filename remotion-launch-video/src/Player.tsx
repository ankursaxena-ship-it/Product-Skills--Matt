import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { ASNLaunchVideo } from "./ASNLaunchVideo";

const App: React.FC = () => {
  return (
    <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 60px rgba(0,0,0,0.5)" }}>
      <Player
        component={ASNLaunchVideo}
        compositionWidth={1920}
        compositionHeight={1080}
        durationInFrames={900}
        fps={30}
        controls
        autoPlay
        loop
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
