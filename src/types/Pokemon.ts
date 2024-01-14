export interface iPokemonsStore {
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