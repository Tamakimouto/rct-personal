import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import handImg from '../assets/hand.png';
import endImg from '../assets/end.png';
import { TimelineLite } from 'gsap/all';
import Emphasizer from './emphasizer';

const styles = theme => ({
    root: {
        display: "flex",
        marginTop: "5vh",
        flexDirection: "column",
        '& .text': {
            padding: "0 15vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            '&:last-of-type': {
                paddingBottom: "10vh"
            },
            '& p': {
                maxWidth: 600,
                textAlign: "left",
                textIndent: 40
            }
        }
    },
    longImg: {
        maxWidth: 500,
        zIndex: 3,
        width: "80%"
    },
    endImg: {
        maxWidth: 300
    }
});

class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.introAnimation = new TimelineLite({ paused: true });
        this.image = null;
        this.image2 = null;
        this.content = null;
    }

    componentDidMount() {
        this.introAnimation
            .from(this.image2, 1, {scale: 0, opacity: 0})
            .to(this.image2, 1, {scale: 3, opacity: 0, display: "none"}, "+=1")
            .from(this.image, 1, {y: 400, opacity: 0})
            .from(this.content, 1, {opacity: 0, y: -100}, '-=0.5')
        this.introAnimation.play();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className="img" ref={ref => this.image2 = ref}>
                    <img alt="endimg" className={classes.endImg} src={endImg} />
                </div>
                <div className="img" ref={ref => this.image = ref}>
                    <img alt="handimg" className={classes.longImg} src={handImg} />
                </div>
                <div className="text" ref={ref => this.content = ref}>
                    <h2>In the case that I'm out of a job, please hire me.</h2>
                    <h2>
                        <Emphasizer text="Anthony@AnthonyZing.me" link="mailto:Anthony@anthonyzing.me" />
                    </h2>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Contact);
