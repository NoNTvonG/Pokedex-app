import style from './CardImage.module.scss'
import React, {useEffect, useState} from 'react';

type PokemonCardProps = {
  pokemon_img: string;
  name: string;
  type: string;
}

export const CardImage: React.FC<PokemonCardProps> = ({pokemon_img, name, type}) => {
  const [imageBG, setImageBG] = useState<string | null>(null);

  useEffect(() => {
    import(`../../assets/images/elements_mono/${type}.svg`)
      .then((module) => setImageBG(module.default))
      .catch(() => setImageBG(''));
  }, [type]);

  return (
    <div className={`${style.card_img} ${style[type]}`}>

      <img src={pokemon_img} className={style.card_img_pokemon} alt={name}/>
      {imageBG !== null ? <img src={imageBG} className={style.card_img_type} alt={type}/> : null}
    </div>
  )
}
