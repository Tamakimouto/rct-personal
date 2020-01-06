import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';

const apiKey = "AIzaSyBoMgkuecoKhgTxc5me-wTnh1IYd-ZI9qU";
const blogId = "8723880054075980249";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    post: {
        maxWidth: 800,
        width: "80vw",
        textAlign: "left",
        marginBottom: 12,
        '& h2': {
            marginBottom: 0
        }
    }
});

class Blog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.get(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&fields=items(published, title, content)`)
            .then(res => {
                this.setState({ posts: res.data.items });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {this.state.posts.map(post => (
                    <div key={post.id} className={classes.post}>
                        <h2>{post.title}</h2>
                        <span>{format(new Date(post.published), "MMM Do, YYYY")}</span>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(Blog);
