import style from './PokemonCard.module.scss'
import {iPokemonData} from '../../types/Pokemon.ts'
import {CardType} from '../CardType/CardType.tsx'
import {CardImage} from '../CardImage/CardImage.tsx'

interface PokemonCardProps {
  pokemon: iPokemonData
}

export const PokemonCard: React.FC<PokemonCardProps> = ({pokemon}) => {
  const formatId = (id: number): string => {
    return id.toString().padStart(3, '0')
  }

  const capitalizeFirstLetter = (input: string): string => {
    return input.charAt(0).toUpperCase() + input.slice(1)
  }

  return (
    <div className={`${style.card} ${style[pokemon.types[0].type.name]}`}>
      <div className={style.card_info}>
        <p className={style.card_id}>Nº{formatId(pokemon.id)}</p>
        <h3 className={style.name}>{capitalizeFirstLetter(pokemon.name)}</h3>
        <ul className={style.card_types}>
          {pokemon.types.map(type => (
            <CardType
              type={type.type.name}
              name={capitalizeFirstLetter(type.type.name)}
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
  )
}
