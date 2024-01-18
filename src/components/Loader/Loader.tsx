import style from './Loader.module.scss'
import icon from '../../assets/images/icon.png'

export const Loader = () => {
  return (
    <div className={style.loader}>
      <span className="loader">
        <img src={icon} className={style.loader_img} alt="loading..."/>
      </span>
    </div>
  );
};