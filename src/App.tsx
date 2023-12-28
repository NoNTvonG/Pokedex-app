import { useEffect } from 'react'
import './App.css'
import { usePokemonsStore } from './store/pokemonsStore'


function App() {
  const {pokemons, fetchPokemons} = usePokemonsStore(state => state)
  useEffect(() => {
    fetchPokemons()
  }, [])
  
  return (
    <>
      <div>
        {pokemons.map((pokemon) => (
          <>
            <div className='pkemonInfo'>
              <img src={pokemon.sprites.other.showdown.front_default} alt="" />
            </div>
            <ul>
              {pokemon.types.map((item) => (
                <li>{item.type.name}</li>
              ))}
            </ul>
            <p key={pokemon.name}>{pokemon.name}</p>
          </>
          ))}
      </div>

    </>
  )
}
export default App
