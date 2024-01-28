import {create} from 'zustand'
import axios from 'axios'
import {devtools} from 'zustand/middleware'
import {iPokemonSearch, iPokemonsStore} from '../types/Pokemon'

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

export const useSearchPokemon = create<iPokemonSearch>()(
  devtools(set => ({
    isFetching: false,
    notFound: false,
    pokemon: null,
    fetchPokemon: async (name: string) => {
      set(state => ({...state, pokemon: null}))
      set(state => ({...state, notFound: false}))

      try {
        set(state => ({...state, isFetching: true}))

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        )
        
        set(state => ({...state, pokemon: response.data}))
      } catch (error) {
        console.log('Error: ', error)
        set(state => ({...state, notFound: true}))
      } finally {
        set(state => ({...state, isFetching: false}))
      }
    }
  }))
)
