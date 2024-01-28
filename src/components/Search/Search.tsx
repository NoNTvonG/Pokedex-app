import style from './Search.module.scss'
import searchIcon from '../../assets/images/icons/search.svg'
import {useSearchPokemon} from "../../store/pokemonsStore.ts";
import React, {useState} from "react";
import {PockemonPopup} from "../Popup/PockemonPopup.tsx";
import {Loader} from "../Loader/Loader.tsx";

export const Search: React.FC = () => {
  const {pokemon, isFetching, notFound, fetchPokemon} = useSearchPokemon(state => state)
  const [pokemonName, setPokemonName] = useState<string>('')
  const [isShowDescription, setIsShowDescription] = useState(false)

  const searchPokemon = (event: React.FormEvent) => {
    event.preventDefault()
    if (pokemonName) {
      fetchPokemon(pokemonName.toLowerCase())
      setIsShowDescription(true)
    }
  }

  const handleClosePopup = () => {
    setIsShowDescription(false);
  };

  return (
    <section id={style.search}>
      <form>
        <input type='text' name='name' placeholder='Search for Pokémon...'
               onChange={(e) => setPokemonName(e.target.value)}/>
        <button onClick={searchPokemon}>
          <img src={searchIcon} alt='search'/>
        </button>
      </form>
      {isFetching ? <Loader/> : ''}
      {notFound ?
        <div className={style.form_alerts}><p>Pokemon not found</p></div>
        :
        ''
      }
      {pokemon && !isFetching && isShowDescription ? <PockemonPopup pokemon={pokemon} onClose={handleClosePopup}/> : ''}
    </section>
  )
}