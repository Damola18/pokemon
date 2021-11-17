import { Box, CircularProgress, withStyles, Typography, Grid, Button } from '@material-ui/core'
import axios from 'axios'
import React, { Component } from 'react'
import { POKEMON_API_URL } from '../config'
import FavoriteIcon from '@material-ui/icons/Favorite'
import {toggleFavorite} from "../redux/actions"
import { connect } from 'react-redux'

const styles = (theme) => ({
    pokedexContainer:{
        backgroundColor:"#c4c4c4",
        color:"white",
        height:"80vh",
        textAlign:"center",
        borderRadius:5,
        marginTop:80, 
        paddingTop:20
    },
    textTitle: {
        textTransform: "upperCase",
        fontFamily: "Fantasy",
    },
    pokemonImage:{
        width:200,
        height:200,
    },
    pokemonInfoContainer: {
        bottom:60,
        position: "absolute",
        width:"100%",
    },
    separator:{
        width:"85%",
        height:"0.95mm",
        color:"white",
        backgroundColor: "white",
        border:"none"
    },
    favorite: {
        height:50,
        width:50,
        marginTop:15,
    },
    text:{
        fontSize:20
    },
    favoriteIcon:{
        paddingLeft:120,
        paddingBottom:20,
        fontSize:50,
        color:"white",
    }
});

class PokemonDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemon: null
        }
    }

    componentDidMount(){
        const { match, styles } = this.props
        const { id } = match?.params
        axios.get(POKEMON_API_URL + "/" + id).then((response) =>{
            if(response.status >=200 && response.status < 300){
                this.setState({pokemon: response.data})
            } 
        })
    }

    favoriteChecker(pokemon) {
        let found = false
        this.props.favorites?.map((p) => {
            if(p.id === pokemon.id){
                found = true;
            }
        }) 
        return found
    }
    render() {
        console.log(this.props.favorites); 
        const { classes } = this.props
          const { pokemon } = this.state
          if(pokemon) {
            const { name , sprites, height, weight, types} = pokemon
            return (
                <Box>
                    <Box className={classes.pokedexContainer}>
                        <Typography className={classes.textTitle} variant="h6">
                            {name}
                        </Typography>
                        <img className={classes.pokemonImage} src={sprites.back_shiny} alt="alternate_image"></img>
                        <Box className={classes.pokemonInfoContainer}>
                            <hr className={classes.separator}></hr>
                            <Grid container>
                                <Grid item md={1}>
                                    <Button className={classes.favorite} 
                                    onClick={() =>this.props.toggleFavorite(pokemon)}
                                    >
                                        <FavoriteIcon style = {{ color: this.favoriteChecker(pokemon) ? "red" : "white", fontSize: 50}}/>
                                    </Button>
                                </Grid>
                                
                                <Grid item md={2}>
                                    <Typography className={classes.text}>
                                        Name
                                        <br/>
                                        {name}
                                    </Typography>
                                </Grid>

                                <Grid item md={2}>
                                    <Typography className={classes.text}>
                                        Height
                                        <br/>
                                        {height}m
                                    </Typography>
                                </Grid>
                                
                                <Grid item md={2}>
                                    <Typography className={classes.text}>
                                        Weight
                                        <br/>
                                        {weight}kg
                                    </Typography>
                                </Grid> 
                                
                                {types.map((pokemonType) => {
                                    const { name } = pokemonType.type;
                                    return (
                                        <Grid item md={2}>
                                            <Typography className={classes.text}>
                                                Type
                                                <br/>
                                                {name}
                                            </Typography>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            );
          } else {
              return <CircularProgress/>
          }
    }
}

const mapStateToProps = (state) => ({
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    toggleFavorite:(pokemon) => dispatch(toggleFavorite(pokemon))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PokemonDetails));


 