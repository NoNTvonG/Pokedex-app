import {useEffect} from 'react'
import {usePokemonsStore} from '../store/pokemonsStore'
import {PokemonCard} from '../components/PokemonCard/PokemonCard.tsx'
import {Pagination} from '../components/Pagination/Pagination.tsx'
import {Loader} from "../components/Loader/Loader.tsx";
import {Search} from "../components/Search/Search.tsx";
import {FilterByType} from "../components/FilterByType/FilterByType.tsx";

export const Home = () => {
  const {pokemons, isLoaded, isFilteredByType, fetchPokemons} = usePokemonsStore(state => state)
  useEffect(() => {
    fetchPokemons(0)
  }, [])

  return (
    <div className='home-page'>
      <div className='container'>
        <Search/>
        <FilterByType/>
        <div className="pokemons-grid">
          {isLoaded ?
            <Loader/>
            :
            <>
              {pokemons.map((pokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.name}/>
              ))}
            </>
          }
        </div>
        {isFilteredByType ?
          ''
          :
          <Pagination/>
        }
      </div>
    </div>
  )
}