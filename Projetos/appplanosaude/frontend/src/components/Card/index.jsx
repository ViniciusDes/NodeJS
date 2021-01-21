import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import logoIconPlanoSaude from '../../images/EXEOrange.png';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 300,
  },
});

export default function CardMUI({
  image,
  textHeader,
  textBody,
  onClick,
  destiny,
}) {
  const classes = useStyles();

  return (
    <NavLink style={{ textDecoration: 'none' }} exact to="Health">
      <Card className={classes.root} onClick={onClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="220"
            image={image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {textHeader}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {textBody}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    </NavLink>
  );
}
