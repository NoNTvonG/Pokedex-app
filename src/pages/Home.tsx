import { useEffect } from 'react'
import { usePokemonsStore } from '../store/pokemonsStore'
import { PokemonCard } from '../components/PokemonCard/PokemonCard.tsx'

export const Home = () => {
  const {pokemons, fetchPokemons} = usePokemonsStore(state => state)
  useEffect(() => {
    fetchPokemons()
  }, [])

  return (
    <div className='home-page'>
      <div className='container'>
        <div className="pokemons-grid">
          {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.name}/>
          ))}
        </div>
      </div>
    </div>
  )
}