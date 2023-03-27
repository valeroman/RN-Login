import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Pokemon {
  name: string;
  imageUrl: string;
}

interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    getPokemonsStart(state) {
      state.loading = true;
    },
    getPokemonsSuccess(state, action: PayloadAction<Pokemon[]>) {
      state.pokemons = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPokemonsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPokemonsStart,
  getPokemonsSuccess,
  getPokemonsFailure,
} = pokemonSlice.actions;