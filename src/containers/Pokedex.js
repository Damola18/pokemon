import React, { useEffect , useState } from 'react'
import {Box, CircularProgress, Grid, makeStyles } from "@material-ui/core"
import axios from 'axios'
import { IMAGE_API_URL, POKEMON_API_URL } from '../config'
import PokemonCard from '../components/PokemonCard'

const useStyles = makeStyles((theme) => ({
    pokedexContainer:{
        textAlign:"center",
        padding:"80px 10px 10px 10px"
    }
}))
export default function Pokedex() {
    // const [state, setstate] = useState(initialState)
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState([])
    useEffect(() => {
        axios.get(POKEMON_API_URL + "?limit=40").then((response) => {
            if(response.status >= 200 && response.status < 300){
                const { results } = response.data
                let newPokemonData = []
                results.forEach((pokemon, index) => {
                    index++;
                    let pokemonObject = {
                        id: index,
                        url: IMAGE_API_URL + index + '.png',
                        name: pokemon.name
                    }
                    console.log(pokemonObject.url);
                    newPokemonData.push(pokemonObject)
                });
                setPokemonData(newPokemonData)
            }
        })
    }, [])
    return (
        <Box>
            {pokemonData ? (
                <Grid className={classes.pokedexContainer} container spacing={2}>
                    {pokemonData.map((pokemon) => {
                        return (
                            <PokemonCard pokemon={pokemon} image={pokemon.url} key={pokemon.id}></PokemonCard>
                        )
                    })}
                </Grid>
            ) : ( 
                <CircularProgress style={{marginTop:100 }}/>
            )}
        </Box>
    )
}
