import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  contentAlert: {
    background: "#F59D3A",
    color: "#FFFFFF",
  },
  contentBody: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
  },
});
export default function AlertDialog(props) {
  // const [open, setOpen] = useState(false);

  const classes = useStyles();
  const { open, close } = props;

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.contentAlert}>
          {props.title}
        </DialogTitle>
        <DialogContent className={classes.contentBody}>
          {props.body}
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" className={props.classe}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
