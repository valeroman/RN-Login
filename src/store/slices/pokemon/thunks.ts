import axios from "axios";
import { AppThunk } from "../../store";
import { getPokemonsFailure, getPokemonsStart, getPokemonsSuccess } from "./pokemonSlice";

export const fetchPokemons = (): AppThunk => async (dispatch) => {
    console.log('MAX');
    try {
      dispatch(getPokemonsStart());
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      const data = response.data.results.map((result: any) => ({
        name: result.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.url.split('/')[6]}.png`,
      }));
      dispatch(getPokemonsSuccess(data));
    } catch (error: any) {
      dispatch(getPokemonsFailure(error.message));
    }
  };