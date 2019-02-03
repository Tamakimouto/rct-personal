import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import gitImage from '../assets/computer.png';
import { TimelineLite } from 'gsap/all';
import gitIcon from '../assets/gh.png';
import Emphasizer from './emphasizer';

const styles = theme => ({
    root: {
        display: "flex",
        marginTop: "5vh",
        flexDirection: "column",
        '& .gitImg': {
            maxWidth: 300
        },
        '& .text': {
            padding: "0 15vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            '& p': {
                maxWidth: 600,
                textAlign: "left",
                textIndent: 40
            }
        },
        '& .worksLink': {
            display: "flex",
            justifyContent: "center"
        },
        '& .portfolio': {
            opacity: 0.8,
            maxWidth: 200,
            marginBottom: 20
        }
    }
});

class Works extends React.Component {

    constructor(props) {
        super(props);

        this.introAnimation = new TimelineLite({ paused: true });
        this.image = null;
        this.content = null;
        this.blurb1 = null;
        this.blurb2 = null;
    }

    componentDidMount() {
        this.introAnimation
            .from(this.image, 1, {y: -400, opacity: 0})
            .from(this.content, 1, {y: 400, opacity: 0}, '-=1')
            .from(this.blurb1, 0.5, {opacity: 0, y: -40}, "+=0.5")
            .from(this.blurb2, 0.5, {opacity: 0})
            .from(this.blurb3, 0.5, {opacity: 0});
        this.introAnimation.play();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className="img" ref={ref => this.image = ref}>
                    <img alt="profile" className="gitImg" src={gitImage} />
                </div>
                <div className="text" ref={ref => this.content = ref}>
                    <h2>Chapter 3: I Do Things</h2>
                    <p ref={ref => this.blurb1 = ref}>
                        I've made a few things since I went to school, things such as a small social media platform.
                        Ended up calling it <Emphasizer text="Sneeze" link="https://github.com/Tamakimouto/Sneeze" /> because
                        the intent was that it was like Twitter
                        but dumbed down to the point where you only get a few "Sneezes" from around the
                        world and some sneezes get lost to the ether periodically. It was a school "group"
                        project where I ended up being the only one who actually worked on it, sometimes
                        I just end up in those kinds of teams. It was either goof around with my unmotivated
                        team (I did try to get them to work) or bite the bullet and do the work alone,
                        I chose to get the good grade.
                    </p>
                    <p ref={ref => this.blurb2 = ref}>
                        Amongst other things, I've also made myself
                        a <Emphasizer text="puu.sh alternative on Linux" link="https://github.com/Tamakimouto/uguushot" /> where
                        it will take screenshots on command and it'll automatically upload them and put a "ready to paste"
                        link to the image on your clipboard. I made this one because I was on Linux at the
                        time since I broke my Windows OS back in High School and was too poor buy a new Windows install and
                        too dumb to obtain a free one. I missed the functionality that puu.sh gave and decided
                        to make my own. I don't use it anymore because now I can afford to just buy Windows and
                        am also smart enough to "obtain" it (totally wouldn't do that though).
                    </p>
                    <p ref={ref => this.blurb3 = ref}>
                        I've got a number of other stuff I made a while ago and some open source contributions
                        too. Almost none of it is hosted anywhere because I don't want to pay for hosting,
                        so I can't really demo any of it. Feel free to check that stuff out if you want.
                    </p>
                </div>
                <div className="worksLink">
                    <a href="https://github.com/Tamakimouto" target="_blank" rel="noopener noreferrer">
                        <img alt="portfolio" className="portfolio" src={gitIcon} />
                    </a>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Works);
