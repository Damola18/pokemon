import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, makeStyles} from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card:{
        cursor:"pointer",
        backgroundColor: "#c4c4c4",
        color:"black",
        "&:hover" :{
            backgroundColor:"#b6ad90",
            color:"white"
        }
    },
    cardMedia: {
        margin:"auto",
        width:130,
        height:130,
    },
    CardContent:{
        textAlign:"center"
    },
    link:{
        textDecoration:"none"
    }
}));

export default function PokemonCard(props) {
    const classes = useStyles();
    const { pokemon, image } = props;
    const { id , name } = pokemon;
    
    return (
        <Grid item xs={12} sm={2} key={id}>
            <Link to={"/pokemon/" + id} className={classes.link}>
                <Card className={classes.card} >
                    <CardMedia className={classes.cardMedia} image={image}></CardMedia >
                        <CardContent className={classes.CardContent}>
                            <Typography> 
                                {id}:{name}
                            </Typography>
                        </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}
