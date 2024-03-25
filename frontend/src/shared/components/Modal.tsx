import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // root: {
        //     '& .MuiTextField-root': {
        //       margin: theme.spacing(1),
        //       width: '25ch',
        //     },
        // },
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
        paper: {
            position: 'absolute',
            maxWidth: '80%',
            [theme.breakpoints.between(300, 600)]: { maxWidth: '60%' },
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            borderRadius: 40,
            padding: theme.spacing(2, 6, 3),
        },
        
        
    }),
);

export interface IModalProps {
    open: boolean,
    onClose?: () => void,
    onPasswordResetClicked?: () => void,
    children?: JSX.Element,
    handleChange?: () => void,
    
}



export default function Modal(props: IModalProps): JSX.Element {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

  

    return (
        <MaterialModal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    {props.children}
                </form>
            </div>
        </MaterialModal>
    );
}

