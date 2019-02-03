import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import backgroundImage from './assets/paper.jpg';
import Home from './components/home';
import Content from './components/content';

const styles = theme => ({
    root: {
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative"
    }
});

class App extends React.Component {

    state = {
        open: false,
    }

    openBook = () => {
        this.setState({ open: true });
    }

    closeBook = () => {
        this.setState({ open: false });
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={`${classes.root} App`}>
                <Home
                    open={this.state.open}
                    openBook={this.openBook}
                    closeBook={this.closeBook}
                />
                <Content open={this.state.open} />
            </div>
        );
    }
}

export default withStyles(styles)(App);
