import { Composition } from "remotion";
import { ASNLaunchVideo } from "./ASNLaunchVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ASNLaunchVideo"
        component={ASNLaunchVideo}
        durationInFrames={970}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
