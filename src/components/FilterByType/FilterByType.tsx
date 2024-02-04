import style from './FilterByType.module.scss'
import {usePokemonsStore} from "../../store/pokemonsStore.ts";
import {useEffect, useState} from "react";
import useCapitalizeFirstLetter from "../../hooks/useCapitalizeFirstLetter.ts";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

export const FilterByType = () => {
  const {pokemonTypes, fetchAllTypes, fetchPokemonsByType, fetchPokemons} = usePokemonsStore(state => state)
  const [activeType, setActiveType] = useState('')

  useEffect(() => {
    fetchAllTypes()
    setActiveType('all')
  }, []);

  const getPokemonsByType = (type: string) => {
    fetchPokemonsByType(type)
    setActiveType(type)
  }
  const getAllPokemons = (type: string) => {
    fetchPokemons(0);
    setActiveType(type)
  }

  return (
    <div id={style.types}>
      {pokemonTypes ?
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={16}
          className={style.swiper}
        >
          <SwiperSlide
            className={`${style.all} ${style.slide} ${activeType == 'all' ? style.active : ''}`}
            onClick={() => getAllPokemons('all')}
          >
            Show all
          </SwiperSlide>
          {pokemonTypes.map((item) => (
            <SwiperSlide
              key={item.name}
              className={`
                ${style[item.name]}
                ${style.slide}
                ${activeType == item.name ? style.active : ''}
                ${activeType == 'all' ? style.active : ''}
              `}
              onClick={() => getPokemonsByType(item.name)}
            >
              {useCapitalizeFirstLetter(item.name)}
            </SwiperSlide>
          ))}
        </Swiper>
        :
        ''
      }
    </div>
  );
};