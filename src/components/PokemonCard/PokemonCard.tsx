import '../../assets/styles/variables.scss'
import style from './PokemonCard.module.scss'
import { iPokemonData } from '../../types/Pokemon.ts'

interface PokemonCardProps {
  pokemon: iPokemonData;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const formatId = (id: number): string => {
    return id.toString().padStart(3, '0');
  };

  const capitalizeFirstLetter = (input: string): string => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  return (
    <div className={`${style.card} ${style[pokemon.types[0].type.name]}`}>
      <div className={style.card_info}>
        <p className={style.card_id}>Nº{formatId(pokemon.id)}</p>
        <h3 className={style.name}>{capitalizeFirstLetter(pokemon.name)}</h3>
        <ul className={style.card_types}>
          {pokemon.types.map((type) => (
            <li className={`${style.card_type} ${style[type.type.name]}`}>
              <div className={style.card_type_icon}>
                <img src={`/src/assets/images/elements/${type.type.name}.svg`} alt="" />
              </div>
              <p className={style.card_type_name}>
                {capitalizeFirstLetter(type.type.name)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${style.card_img} ${style[pokemon.types[0].type.name]}`}>
        <img src={pokemon.sprites.other.showdown.front_default} className={style.card_img_pokemon} alt={pokemon.name} />
        <img src={`/src/assets/images/elements_mono/${pokemon.types[0].type.name}.svg`}className={style.card_img_type} alt={style[pokemon.types[0].type.name]} />
      </div>
    </div>
  )
}