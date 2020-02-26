import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';
import formatRFC3339 from 'date-fns/formatRFC3339';
import Scrollbox from 'react-perfect-scrollbar';

const apiKey = "AIzaSyBoMgkuecoKhgTxc5me-wTnh1IYd-ZI9qU";
const blogId = "8723880054075980249";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        height: "calc(100vh - 100px)",
        justifyContent: "center"
    },
    wrapper: {
        width: "95vw",
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
}));

const Blog = (props) => {

    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [datePointer, setDatePointer] = useState(formatRFC3339(new Date()));

    useEffect(() => {
        axios.get(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&fields=items(published, title, content)&maxResults=50&endDate=${datePointer}`)
            .then(res => {
                setPosts(res.data.items);
            });
    }, [datePointer]);

    const fetchNewSet = () => {
        setDatePointer(posts[posts.length - 1].published);
    }

    return (
        <div className={classes.root}>
            <Scrollbox>
                <div className={classes.wrapper}>
                    {posts.map(post => (
                        <div key={post.id} className={classes.post}>
                            <h2>{post.title}</h2>
                            <span>{format(new Date(post.published), "MMM Do, yyyy - hh:mm a")}</span>
                            <p dangerouslySetInnerHTML={{__html: post.content}}></p>
                        </div>
                    ))}
                </div>
            </Scrollbox>
        </div>
    );
}

export default Blog;
