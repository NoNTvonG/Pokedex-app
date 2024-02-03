import style from './PockemonPopup.module.scss'
import React, {FC, useEffect, useState} from "react";
import {CardType} from "../CardType/CardType.tsx";
import {iPokemonData} from "../../types/Pokemon.ts";
import usePokemonId from "../../hooks/usePokemonId.ts";
import useCapitalizeFirstLetter from "../../hooks/useCapitalizeFirstLetter.ts";

interface PokemonPopupProps {
  pokemon: iPokemonData
  onClose: () => void
}

interface PockemonPopupStatProps {
  title: string
  param: number
  unit: string
}

export const PockemonPopup: React.FC<PokemonPopupProps> = ({pokemon, onClose}) => {
  const [typeIcon, setTypeIcon] = useState<string | null>(null);

  useEffect(() => {
    import(`../../assets/images/elements_mono/${pokemon.types[0].type.name}.svg`)
      .then((module) => setTypeIcon(module.default))
      .catch(() => setTypeIcon(''));
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const popupElement = document.querySelector('.popup');
      if (popupElement && !popupElement.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className={`${style.popup}`}>
      <div className={`${style.popup__wrapper} popup`}>
        <div className={style.popup_nav}>
          <div className={style.popup_nav__close} onClick={onClose}></div>
        </div>
        <div className={`${style.pokemon_image} ${pokemon && style[pokemon.types[0].type.name]}`}>
          {typeIcon !== null
            ? <img src={typeIcon} className={style.pokemon_image__type} alt={pokemon.types[0].type.name}/>
            : null
          }
          <img
            src={pokemon.sprites.other.showdown.front_default ? pokemon.sprites.other.showdown.front_default : pokemon.sprites.front_default}
            className={style.pokemon_image__img}
            alt={pokemon.name}
          />
        </div>
        <div className={style.pokemon_data}>
          <div className={style.pokemon_data__name}>
            <h2>{useCapitalizeFirstLetter(pokemon.name)}</h2>
            <p>{usePokemonId(pokemon.id)}</p>
          </div>
          <ul className={style.pokemon_data__types}>
            {pokemon.types.map(type => (
              <CardType type={type.type.name} name={type.type.name} key={type.type.name}/>
            ))}
          </ul>
          <div className={style.pokemon_data__stats}>
            {pokemon.stats
              .filter((stat) => (['hp', 'attack', 'defense', 'speed'].includes(stat.stat.name)))
              .map((pokemonStats) => (
                <PockemonPopupStatBox
                  title={pokemonStats.stat.name}
                  param={pokemonStats.base_stat}
                  unit={''}
                  key={pokemonStats.stat.name}
                />
              ))}
            <PockemonPopupStatBox title={"weight"} unit={'kg'} param={pokemon.weight}/>
          </div>
        </div>
      </div>
    </div>
  )
};

const PockemonPopupStatBox: FC<PockemonPopupStatProps> = ({title, param, unit}) => {
  return (
    <div className={style.single_stat}>
      <span>{useCapitalizeFirstLetter(title)}</span>
      <div className={style.single_stat__param}>
        <p>{param / 10} {unit}</p>
      </div>
    </div>
  )
}