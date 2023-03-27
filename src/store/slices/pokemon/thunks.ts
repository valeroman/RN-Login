import { AppDispatch, AppThunk } from '../../store';
import axios from 'axios';
import { getPokemonsFailure, getPokemonsStart, getPokemonsSuccess } from './pokemonSlice';

export const fetchPokemons = () => async (dispatch: AppDispatch) => {
    console.log('MAXXX')
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
 
  
  
  
  
  
  