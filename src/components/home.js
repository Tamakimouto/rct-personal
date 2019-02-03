import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import splash from '../assets/splash.png';
import { TimelineLite } from 'gsap/all';
import RootRef from '@material-ui/core/RootRef';
import IconButton from '@material-ui/core/IconButton';
import Swipe from 'react-easy-swipe';

const styles = theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        '& .splashImg': {
            maxWidth: "80vw"
        },
        '& .header': {
            cursor: "pointer",
            transition: "all 0.3s",
            minHeight: 100,
            maxHeight: 100,
            '&:hover': {
                opacity: 0.7
            }
        },
        '& .moreIcon': {
            position: "absolute",
            bottom: 10
        },
    },
});

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.introAnimation = new TimelineLite({ paused: true });
        this.openAnimation = new TimelineLite({
            paused: true,
            onComplete: this.props.openBook
        });

        this.container = null;
        this.image = null;
        this.title = null;
        this.name = null;
        this.punchline = null;
        this.button = React.createRef();
    }

    componentDidMount() {
        console.log(this.container)
        this.introAnimation
            .fromTo(this.title, 1, {scale: 0, yPercent: -300 }, {scale: 1, yPercent: -300})
            .to(this.title, 1, {yPercent: 0})
            .from(this.image, 1, {y: 400, opacity: 0}, "-=1")
            .from(this.button.current, 1, {y: -40, opacity: 0});
        this.introAnimation.play();

        this.openAnimation
            .to(this.container.swiper, 1, {justifyContent: "flex-start", height: "auto"})
            .to(this.image, 1, {y: -400, opacity: 0, height: 0, display: "none"}, "-=1")
            .to(this.button.current, 1, {opacity: 0, y: 100, display: "none"}, "-=1")
            .to(this.name, 0.3, {marginBottom: 0}, '-=1')
            .to(this.punchline, 0.5, {marginTop: 0}, '-=1');

        window.addEventListener("keydown", this.handleKey);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKey);
    }

    handleKey = e => {
        if (!this.props.open && e.keyCode === 40) {
            this.openBook();
        }
    }

    handleScroll = e => {
        if (!this.props.open && !(e.nativeEvent.wheelDelta > 0)) {
            this.openBook();
        }
    }

    handleSwipe = e => {
        if (!this.props.open) {
            this.openBook();
        }
    }

    openBook = () => {
        this.openAnimation.restart();
    }

    closeBook = () => {
        if (this.props.open) {
            this.props.closeBook();
            this.openAnimation.reverse();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Swipe
                allowMouseEvents
                onSwipeUp={this.handleSwipe}
                className={classes.root}
                ref={ref => this.container = ref}
                onWheel={this.handleScroll}
            >
                <div ref={ref => this.image = ref} className={classes.imageContainer}>
                    <img alt="test" className="splashImg" src={splash} />
                </div>
                <div
                    ref={ref => this.title = ref}
                    className={this.props.open ? "header" : ""}
                    onClick={this.closeBook}
                >
                    <h1 ref={ref => this.name = ref}>Anthony Zheng</h1>
                    <p ref={ref => this.punchline = ref}>Frontend Web Developer & Waster of Youth</p>
                </div>
                <RootRef rootRef={this.button}>
                    <IconButton className="moreIcon" onClick={this.openBook}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/>
                            <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/>
                        </svg>
                    </IconButton>
                </RootRef>
            </Swipe>
        );
    }
}

export default withStyles(styles)(Home);
