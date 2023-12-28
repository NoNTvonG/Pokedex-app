import { create } from 'zustand'
import axios from 'axios'
import { devtools } from 'zustand/middleware'

type iPokemonsStore = {
	pokemons: iPokemonInfo[]
	fetchPokemons: () => Promise<void>
}

type iPokemonInfo = {
	name: string
	url: string
	types: [
		{
			slot: number
			type: {
				name: string
				url: string
			}
		}
	]
	sprites: {
		other: {
			showdown: {
				front_default: string
				back_default: string
				front_shiny: string
				back_shiny: string
			}
		}
	}
}

export const usePokemonsStore = create<iPokemonsStore>()(
	devtools(set => ({
		pokemons: [],
		fetchPokemons: async () => {
			const response = await axios.get(
				'https://pokeapi.co/api/v2/pokemon?limit=20'
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
