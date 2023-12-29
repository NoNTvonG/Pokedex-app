import style from './Header.module.scss'
import icon from '../../assets/images/icon.png'
import logo from '../../assets/images/logo.svg'

export const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.logo}>
          <img src={icon} className={style.logo_icon} alt="logo" />
          <img src={logo} className={style.logo_text} alt="pokedex" />
        </div>
      </div>
    </header>
  )
}
