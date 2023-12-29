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
    <div className={style.card}>
      <div className={style.card_info}>
        <p className={style.card_id}>Nº{formatId(pokemon.id)}</p>
        <h3 className={style.name}>{capitalizeFirstLetter(pokemon.name)}</h3>
        <ul className={style.card_types}>
          {pokemon.types.map((type) => (
            <li className={style.card_type}>
              <div className={style.card_type_icon}>
                <img src="" alt="" />
              </div>
              <p className={style.card_type_name}>
                {capitalizeFirstLetter(type.type.name)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.card_img}>
        <img src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} />
      </div>
    </div>
  )
}