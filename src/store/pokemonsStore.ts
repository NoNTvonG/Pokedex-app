import { create } from 'zustand'
import axios from 'axios'
import { devtools } from 'zustand/middleware'
import { iPokemonsStore } from '../types/Pokemon'

export const usePokemonsStore = create<iPokemonsStore>()(
	devtools(set => ({
		pokemons: [],
		fetchPokemons: async () => {
			const response = await axios.get(
				'https://pokeapi.co/api/v2/pokemon?limit=50'
			)

			const pokemonURLs = response.data.results.map((pokemon: { url: string }) => pokemon.url)

			const pokemonDataPromises = pokemonURLs.map(async (url: string) => {
				const pokemonResponse = await axios.get(url);
				return pokemonResponse.data;
			});

			const pokemonData = await Promise.all(pokemonDataPromises);

			set(state => ({ ...state, pokemons: pokemonData }));
		},
	}))
)
