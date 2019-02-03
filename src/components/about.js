import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import profileImage from '../assets/face2.png';
import coolImage from '../assets/somehowCool.png';
import { TimelineLite } from 'gsap/all';

const styles = theme => ({
    root: {
        display: "flex",
        marginTop: "5vh",
        '& .img': {
            flex: 4,
            display: "flex",
            justifyContent: "flex-end",
            '&.right': {
                justifyContent: "flex-start"
            },
            '& img': {
                maxWidth: 115,
                maxHeight: 230
            }
        },
        '& .text': {
            flex: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "12px 24px",
            '& h2': {
                marginTop: 0
            },
            '& p': {
                textAlign: "left",
                maxWidth: 400,
                margin: "5px 0"
            },
            '&.left': {
                alignItems: "flex-end",
            },
        }
    }
});

class About extends React.Component {

    constructor(props) {
        super(props);

        this.introAnimation = new TimelineLite({ paused: true });
        this.image = null;
        this.image2 = null;
        this.content = null;
        this.content2 = null;
        this.blurb1 = null;
        this.blurb2 = null;
        this.blurb3 = null;
        this.blurb4 = null;
        this.blub5 = null;
    }

    componentDidMount() {
        this.introAnimation
            .from(this.image, 1, {x: -400, opacity: 0})
            .from(this.content, 1, {x: 400, opacity: 0}, '-=1')
            .from(this.blurb1, 0.5, {opacity: 0, y: -40}, "+=0.5")
            .from(this.blurb2, 0.5, {opacity: 0})
            .from(this.blurb3, 0.5, {opacity: 0})
            .from(this.blurb4, 0.5, {opacity: 0})
            .from(this.blurb5, 0.5, {opacity: 0}, "+=0.5")
            .from(this.image2, 1, {opacity: 0, x: 200}, "-=0.5");
        this.introAnimation.play();
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <div className="img" ref={ref => this.image = ref}>
                        <img alt="profile" src={profileImage} />
                    </div>
                    <div className="text" ref={ref => this.content = ref}>
                        <h2>Chapter 1: I'm Anthony</h2>
                        <p ref={ref => this.blurb1 = ref}>...But I guess you knew that huh?</p>
                        <p ref={ref => this.blurb2 = ref}>
                            Once upon a time, I walked the Great Wall of China. It was an intense mental and physical
                            battle with my crippling fear of heights and the incredibly uneven footing.
                            "Never again," I thought to myself.
                        </p>
                        <p ref={ref => this.blurb3 = ref}>
                            And that's when I knew I was going to be a computer boy.
                        </p>
                    </div>
                </div>
                <div className={classes.root}>
                    <div className="text left" ref={ref => this.content2 = ref}>
                        <p ref={ref => this.blurb4 = ref}>
                            And now I'm a creative (?) web developer, who enjoys making cool stuff happen.
                            I enjoy reading and sometimes watching chinese cartoons. When I'm not ditzing around
                            with code, I try to figure out how to get a life. Now let's see how well I can
                            tell my story.
                        </p>
                        <p ref={ref => this.blurb5 = ref}>
                            Oh, and just in case you're wondering, my last name is pronounced "Zing."
                        </p>
                    </div>
                    <div className="img right" ref={ref => this.image2 = ref}>
                        <img alt="cool" src={coolImage} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(About);
