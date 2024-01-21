import style from './CardType.module.scss'
import React, {useEffect, useState} from 'react';
import useCapitalizeFirstLetter from "../../hooks/useCapitalizeFirstLetter.ts";

type CardTypesProps = {
  type: string;
  name: string;
}

export const CardType: React.FC<CardTypesProps> = ({type, name}) => {
  const [typeIcon, setTypeIcon] = useState<string | null>(null);

  useEffect(() => {
    import(`../../assets/images/elements/${type}.svg`)
      .then((module) => setTypeIcon(module.default))
      .catch(() => setTypeIcon(''));
  }, [type]);

  return (
    <li className={`${style.type} ${style[type]}`}>
      <div className={style.type_icon}>
        {typeIcon !== null ? <img src={typeIcon} alt={type}/> : null}
      </div>
      <p className={style.type_name}>
        {useCapitalizeFirstLetter(name)}
      </p>
    </li>
  )
}
