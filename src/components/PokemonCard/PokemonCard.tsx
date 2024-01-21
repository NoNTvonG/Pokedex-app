import style from './PokemonCard.module.scss'
import {iPokemonData} from '../../types/Pokemon.ts'
import {CardType} from '../CardType/CardType.tsx'
import {CardImage} from '../CardImage/CardImage.tsx'
import {PockemonPopup} from "../Popup/PockemonPopup.tsx";
import {useState} from "react";
import usePokemonId from "../../hooks/usePokemonId.ts";
import useCapitalizeFirstLetter from "../../hooks/useCapitalizeFirstLetter.ts";

interface PokemonCardProps {
  pokemon: iPokemonData
}

export const PokemonCard: React.FC<PokemonCardProps> = ({pokemon}) => {
  const [isShowDescription, setIsShowDescription] = useState(false)

  const handleOpenPopup = () => {
    setIsShowDescription(true);
  };

  const handleClosePopup = () => {
    setIsShowDescription(false);
  };


  return (
    <>
      <div className={`${style.card} ${style[pokemon.types[0].type.name]}`} onClick={handleOpenPopup}>
        <div className={style.card_info}>
          <p className={style.card_id}>{usePokemonId(pokemon.id)}</p>
          <h3 className={style.name}>{useCapitalizeFirstLetter(pokemon.name)}</h3>
          <ul className={style.card_types}>
            {pokemon.types.map(type => (
              <CardType
                type={type.type.name}
                name={type.type.name}
                key={type.type.name}
              />
            ))}
          </ul>
        </div>
        <CardImage
          pokemon_img={pokemon.sprites.other.showdown.front_default ? pokemon.sprites.other.showdown.front_default : pokemon.sprites.front_default}
          name={pokemon.name}
          type={pokemon.types[0].type.name}
        />
      </div>
      {isShowDescription ? <PockemonPopup pokemon={pokemon} onClose={handleClosePopup}/> : ""}
    </>
  )
}
