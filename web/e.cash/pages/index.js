import Image from 'next/image';
import Link from 'next/link';
import Layout from '/components/layout';
import VideoBackground from '/components/videobackground';
import GlitchText from '/components/glitch-text';
import { Container } from '/components/atoms';
import { socials } from '/data/socials';
import {
    Hero,
    ButtonCtn,
    HeroImage,
    GradientSpacer,
    StoryAndWhySection,
    Overlay,
    StorySection,
    YouTubeVideo,
    PixelBorder,
    RoadmpaSection,
} from '/styles/pages/homepage';
import Button from '/components/button';
import H2 from '/components/h2';
import Hand from '/public/images/hand.png';
import Roadmap from '/components/roadmap';

export default function Home() {
    return (
        <Layout>
            <VideoBackground videoname="purple-abstract" />
            <Hero>
                <Container>
                    <h1>
                        <span>WEALTH</span>
                        <GlitchText text="REDEFINED" />
                    </h1>
                    <p>
                        Simple. Instant. Secure.
                        <br />
                        Experience the revolutionary new money powered by
                        Avalanche.
                    </p>
                    <HeroImage>
                        <Image src={Hand} alt="eCash" fill />
                    </HeroImage>
                    <ButtonCtn>
                        <Button
                            text="Avalanche Consensus"
                            link="https://avalanche.cash/"
                            color="white"
                            glow
                        />
                    </ButtonCtn>
                    <div className="social-ctn">
                        {socials.map(social => (
                            <Link
                                className="social-icon-ctn"
                                href={social.link}
                                target="_blank"
                                rel="noreferrer"
                                key={social.name}
                            >
                                <Image
                                    src={`/images/${social.name}.svg`}
                                    alt={social.name}
                                    fill
                                />
                            </Link>
                        ))}
                    </div>
                </Container>
            </Hero>
            <GradientSpacer />
            <StoryAndWhySection>
                <Overlay />
                <Container>
                    <StorySection>
                        <div>
                            <H2 subtext="The eCash Story" text="GET STARTED" />
                            <p>
                                Introducing eCash: the new battle-tested
                                cryptocurrency forged from centuries of economic
                                theory and over a decade of real-world crypto
                                experience. eCash is the implementation of the
                                tech-secured sound money envisioned by
                                luminaries in monetary philosophy like Milton
                                Friedman.
                            </p>
                        </div>
                        <div>
                            <YouTubeVideo>
                                <div>
                                    <iframe
                                        src="https://www.youtube.com/embed/2kR6Bx0Y2TE?rel=1&amp;controls=0&amp;autoplay=0&amp;mute=0&amp;start=0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        title="eCash - Future Technology"
                                    ></iframe>
                                </div>
                            </YouTubeVideo>
                        </div>
                    </StorySection>
                </Container>
            </StoryAndWhySection>
            <PixelBorder />
            <RoadmpaSection>
                <Container>
                    <H2 subtext="Now & Future" text="ROADMAP" />
                    <Roadmap />
                </Container>
            </RoadmpaSection>
        </Layout>
    );
}
