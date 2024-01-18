export interface iPokemonsStore {
  isLoaded: boolean,
  count: number
  pokemons: iPokemonData[]
  fetchPokemons: (offset: number) => Promise<void>
}

export interface iPokemonData {
  id: number
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
    front_default: string,
    back_default: string,
    front_shiny: string,
    back_shiny: string
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