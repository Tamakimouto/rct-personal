import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import schoolImg from '../assets/class.png';
import { TimelineLite } from 'gsap/all';
import Emphasizer from './emphasizer';

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
            justifyContent: "center",
            padding: "12px 24px",
            '& h2': {
                marginTop: 0,
                maxWidth: 400
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
    },
    root2: {
        display: "flex",
        flexDirection: "column",
        '& .text': {
            padding: "0 15vw 10vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            '& p': {
                maxWidth: 600,
                textAlign: "left",
                textIndent: 40
            }
        }
    }
});

class School extends React.Component {

    constructor(props) {
        super(props);

        this.introAnimation = new TimelineLite({ paused: true });
        this.image = null;
        this.content = null;
        this.title = null;
    }

    componentDidMount() {
        this.introAnimation
            .from(this.image, 1, {x: 400, opacity: 0})
            .from(this.title, 1, {x: -400, opacity: 0}, '-=0.5')
            .from(this.content, 1, {opacity: 0, y: 400}, '-=0.5');
        this.introAnimation.play();
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <div className="text left" ref={ref => this.title = ref}>
                        <h2>Chapter 2:<br /> I Become Very Well Educated in Arithmetic</h2>
                    </div>
                    <div className="img right" ref={ref => this.image = ref}>
                        <img alt="scool" src={schoolImg} />
                    </div>
                </div>
                <div className={classes.root2}>
                    <div className="text" ref={ref => this.content = ref}>
                        <p>
                            Much to my parents' expectations, I studied hard and became the first in my
                            family to go to college. I made it into
                            <Emphasizer text="The University of Georgia"/> and studied <Emphasizer text="Computer Science"/> all
                            the way through until I eventually graduated with a <Emphasizer text="3.5 GPA"/>.
                        </p>
                        <p>
                            Now, if you don't know anything about Asian standards, let me educate you a little.
                            My 3.5 was still considered "failing" by my parents, and UGA was definitely not
                            their school of choice. They'd rather me go to Georgia Tech, or if possible, Harvard.
                            I don't regret going to the school I went to though. Athens was like a second home to
                            me; it was an incredibly comfy place with lots go around and see. I felt like a
                            "tourist in my own city" if you will.
                        </p>
                        <p>
                            Funny thing is, UGA and Athens being such a party and football focused location,
                            I never really participated in either. Do I regret it? Honestly, I sort of do.
                            At the time of me writing this, I'm still young; I feel like I should be out there
                            living life, socializing with friends, getting sh*t faced drunk, but no - I choose to
                            spend spring break alone in the dark in front of my computer screen.
                            Again, do I regret it? I do.
                        </p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(School);
