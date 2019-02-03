import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import jobImg from '../assets/job.png';
import longImg from '../assets/long.png';
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
        width: "80%"
    }
});

class Jobs extends React.Component {

    constructor(props) {
        super(props);

        this.introAnimation = new TimelineLite({ paused: true });
        this.image = null;
        this.image2 = null;
        this.content = null;
        this.content2 = null;
        this.title = null;
    }

    componentDidMount() {
        this.introAnimation
            .from(this.image, 1, {x: 400, opacity: 0})
            .from(this.title, 1, {x: -400, opacity: 0}, '-=0.5')
            .from(this.content, 1, {opacity: 0, y: 400}, '-=0.5')
            .from(this.image2, 1, {opacity: 0, x: -400})
            .from(this.content2, 1, {opacity: 0, y: 400}, '-=0.1');
        this.introAnimation.play();
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <div className="img" ref={ref => this.image = ref}>
                        <img alt="job" src={jobImg} />
                    </div>
                    <div className="text" ref={ref => this.title = ref}>
                        <h2>Chapter 4:<br /> I Try Being an Adult</h2>
                    </div>
                </div>
                <div className={classes.root2}>
                    <div className="text" ref={ref => this.content = ref}>
                        <p>
                            When I was about out of school I had to go looking for a job. That was just dreadful.
                            I hate selling myself, but that's how society works. These pages all seem be about
                            how much a person can brag about themselves.
                        </p>
                        <p>
                            I did have some experience from internships which I like to think helped me adjust
                            to real world work. My first time interning was as a <Emphasizer text="PHP Developer at The Cresca Group"/> where
                            I learned how to work with the LAMP stack. I met some great friends there, got to
                            go to some cool events in Atlanta, and had some damn good pizza. So that lasted for a summer,
                            when I got back to school I immediately started doing volunteer work as
                            a <Emphasizer text="Web Developer at Ethical Solutions" />. I would take care of pretty
                            much all their web needs (CSS, WordPress, Dealing with DNS, etc). And that lasted for several
                            years, up until after I graduated actually. Unfortunately I didn't have time to
                            help them anymore and my presence with them dwindled.
                        </p>
                        <p>
                            My first real job (and hopefully current job) fresh out of school is as
                            a <Emphasizer text="Software Engineer at Cadre5" />.
                            I'm learning how to really do Frontend work using React and learning new tools by
                            the day. The story has now thus caught up to the present day. I've successfully
                            become a computer boy; I think I've come quite far when I think about that boy a top
                            the Great Wall.
                        </p>
                    </div>
                    <div className="img" ref={ref => this.image2 = ref}>
                        <img alt="longimg" className={classes.longImg} src={longImg} />
                    </div>
                    <div className="text" ref={ref => this.content2 = ref}>
                        <p>
                            I still do have goals ofcourse, career-wise, life-wise, and character-wise. The most
                            interesting of them probably becoming able to freestyle a Boogie Woogie.
                        </p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Jobs);
