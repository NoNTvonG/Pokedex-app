export interface iPokemonsStore {
  isLoaded: boolean
  isFilteredByType: boolean
  count: number
  pokemons: iPokemonData[]
  pokemonTypes: iPokemonType[]
  fetchPokemons: (offset: number) => Promise<void>
  fetchAllTypes: () => Promise<void>
  fetchPokemonsByType: (type: string) => Promise<void>
}

export interface iPokemonData {
  id: number,
  name: string,
  url: string,
  types: [
    {
      slot: number,
      type: {
        name: string,
        url: string
      }
    }
  ]
  sprites: {
    front_default: string,
    back_default: string,
    front_shiny: string,
    back_shiny: string
    other: {
      showdown: {
        front_default: string,
        back_default: string,
        front_shiny: string,
        back_shiny: string
      }
    }
  }
  stats: [
    {
      base_stat: number,
      stat: {
        name: string,
        url: string
      }
    }
  ]
  weight: number
}

export interface iPokemonSearch {
  isFetching: boolean,
  notFound: boolean,
  pokemon: iPokemonData | null,
  fetchPokemon: (name: string) => Promise<void>
}

export interface iPokemonType {
  name: string,
  url: string
}