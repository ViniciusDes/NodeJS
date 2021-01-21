import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  circular: {
    color: "#207eb8",
  },
}));

export default function GifLoading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.circular} />
    </div>
  );
}
