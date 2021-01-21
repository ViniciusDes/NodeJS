import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    background: '#F59D3A',
    color: '#FFFFFF',
    height: '35px',
    fontSize: '12px',
  },
});

export default function ButtonMUI(props) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={props.classe ? props.classe : classes.button}
      disableElevation
      fullWidth={false}
      onClick={props.click}
    >
      {props.icon}
      {props.text}
    </Button>
  );
}
