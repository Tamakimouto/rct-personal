import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TimelineLite } from 'gsap/all';
import RootRef from '@material-ui/core/RootRef';
import IconButton from '@material-ui/core/IconButton';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Scrollbox from 'react-perfect-scrollbar';
import Swipe from 'react-easy-swipe';

import About from './about';
import Works from './works';
import School from './school';
import Jobs from './jobs';
import Contact from './contact';

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
        minHeight: 0,
        overflow: "hidden",
        '& .prevIcon': {
            transform: "rotate(90deg)",
            position: "absolute",
            left: 0,
            top: "50%",
            zIndex: 2
        },
        '& .nextIcon': {
            transform: "rotate(-90deg)",
            position: "absolute",
            right: 0,
            top: "50%",
            zIndex: 2
        }
    }
});

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: [About, School, Works, Jobs, Contact],
            currentIdx: -1
        };

        this.buttonIntro = new TimelineLite({ paused: true });
        this.buttonOutro = new TimelineLite({ paused: true });
        this.prevButton = React.createRef();
        this.nextButton = React.createRef();

        this.scrollbox = null;
    }

    componentDidMount() {
        this.buttonIntro
            .from(this.prevButton.current, 1, {opacity: 0, x: 100})
            .from(this.nextButton.current, 1, {opacity: 0, x: -100}, '-=1');
        this.buttonOutro
            .to(this.prevButton.current, 1, {opacity: 0, x: -100})
            .to(this.nextButton.current, 1, {opacity: 0, x: 100}, '-=1');

        window.addEventListener("keydown", this.handleKey);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.props.open) {
            if (nextProps.open) {
                if (this.state.currentIdx < 0)
                    this.setState({ currentIdx: 0 });

                this.buttonIntro.restart();
            } else {
                this.buttonOutro.restart();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKey);
    }

    handleKey = e => {
        switch (e.keyCode) {
            case 37:
                this.prevPanel();
                break;
            case 39:
                this.nextPanel();
                break;
            default:
                break;
        }
    }

    getPanel = (idx) => {
        if (idx < 0) return <div></div>;
        const NewPanel = this.state.sections[idx];
        return <NewPanel />;
    }

    prevPanel = () => {
        if (this.state.currentIdx > 0) {
            this.setState({ currentIdx: this.state.currentIdx - 1 });
            this.scrollbox.scrollTop = 0;
        }
    }

    nextPanel = () => {
        if (this.state.currentIdx < this.state.sections.length - 1) {
            this.setState({ currentIdx: this.state.currentIdx + 1 });
            this.scrollbox.scrollTop = 0;
        }
    }


    render() {
        const { classes } = this.props;

        return (
            <Swipe
                allowMouseEvents
                className={classes.root}
                onSwipeLeft={this.nextPanel}
                onSwipeRight={this.prevPanel}
                tolerance={100}
            >
                <RootRef rootRef={this.prevButton}>
                    <IconButton className="prevIcon" disabled={this.state.currentIdx === 0} onClick={this.prevPanel}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/>
                            <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/>
                        </svg>
                    </IconButton>
                </RootRef>
                <Scrollbox option={{ suppressScrollX: true }} containerRef={ref => this.scrollbox = ref}>
                    {this.getPanel(this.state.currentIdx)}
                </Scrollbox>
                <RootRef rootRef={this.nextButton}>
                    <IconButton className="nextIcon" disabled={this.state.currentIdx === this.state.sections.length - 1} onClick={this.nextPanel}>
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

export default withStyles(styles)(Content);
