import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        fontSize: 18,
        fontWeight: 700
    }
});

const Empasizer = (props) => (
    <span className={props.classes.root}>
        {props.link ? (
            <a href={props.link} target="_blank" rel="noopener noreferrer">
                {props.text}
            </a>
        ) : props.text}
    </span>
);

export default withStyles(styles)(Empasizer);
