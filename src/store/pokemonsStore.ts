import {create} from 'zustand'
import axios from 'axios'
import {devtools} from 'zustand/middleware'
import {iPokemonsStore} from '../types/Pokemon'

export const usePokemonsStore = create<iPokemonsStore>()(
  devtools(set => ({
    isLoaded: false,
    count: 0,
    pokemons: [],
    fetchPokemons: async (offset: number = 0) => {
      set(state => ({...state, isLoaded: true}))

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`
      )

      const pokemonURLs = response.data.results.map(
        (pokemon: { url: string }) => pokemon.url
      )

      const pokemonDataPromises = pokemonURLs.map(async (url: string) => {
        const pokemonResponse = await axios.get(url)
        return pokemonResponse.data
      })

      const pokemonData = await Promise.all(pokemonDataPromises)

      set(state => ({...state, count: response.data.count}))
      set(state => ({...state, pokemons: pokemonData}))
      set(state => ({...state, isLoaded: false}))
    },
  }))
)
