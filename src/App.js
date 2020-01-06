import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import backgroundImage from './assets/paper.jpg';

import Home from './components/home';
import Content from './components/content';
import Blog from './components/blog';

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
                <Router>
                    <Home
                        open={this.state.open}
                        openBook={this.openBook}
                        closeBook={this.closeBook}
                    />
                    <Route path="/" exact render={props => (
                        <Content open={this.state.open} {...props} />
                    )} />
                    <Route path="/blog/" component={Blog} />
                </Router>
            </div>
        );
    }
}

export default withStyles(styles)(App);
