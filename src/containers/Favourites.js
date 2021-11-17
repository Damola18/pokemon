import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box, withStyles, Grid } from '@material-ui/core'
import PokemonCard from '../components/PokemonCard'

const styles = (theme) => ({
    pokedexContainer: {
        height:"100vh",
        backgroundColor:"#c4c4c4ae",
        paddingLeft:15,
        paddingTop:70,
    }
})
export class Favourites extends Component {
    render() {
        const { classes, favorites} = this.props;
        return (
            <Box>
                <Grid container spacing={2}  className={classes.pokedexContainer}>
                    {favorites.map((pokemon) => {
                            return (
                               <PokemonCard 
                                pokemon={pokemon}
                                key={pokemon.id} 
                                image={pokemon.sprites.front_default}
                               />
                            );
                        })
                    }
                </Grid>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
    favorites: state.favorites
})

const mapDispatchToProps = ({
    
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Favourites));
