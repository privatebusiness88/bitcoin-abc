import { useEffect, useRef, useContext } from 'react';
import { VideoCtn } from './styles';
import { ThemeContext } from 'styled-components';

export default function Video({ videoname }) {
    const themeContext = useContext(ThemeContext);
    const videoRef = useRef();

    useEffect(() => {
        videoRef.current.playbackRate = themeContext.filters.videospeed;
    }, [themeContext.filters.videospeed]);

    return (
        <VideoCtn>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                poster={`/videos/${videoname}.jpg`}
            >
                <source src={`/videos/${videoname}.mp4`} type="video/mp4" />
            </video>
            <div className="video_gradient" />
        </VideoCtn>
    );
}
