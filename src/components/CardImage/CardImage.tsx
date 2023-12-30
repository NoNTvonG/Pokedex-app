import style from './CardImage.module.scss'

type PokemonCardProps = {
  pokemon_img: string;
  name: string;
  type: string;
}

export const CardImage: React.FC<PokemonCardProps> = ({ pokemon_img, name, type }) => {
  return (
    <div className={`${style.card_img} ${style[type]}`}>
      <img src={pokemon_img} className={style.card_img_pokemon} alt={name} />
      <img src={`/src/assets/images/elements_mono/${type}.svg`} className={style.card_img_type} alt={type} />
    </div>
  )
}
