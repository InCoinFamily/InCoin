import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import Logo from '../Logo/Logo';
import user from '../../Images/user.svg';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';

export default function Header({
  openRegisterPopup,
  isRegisterPopupOpen,
  closePopup,
  openLoginPopup,
  isLoginPopupOpen,
  redirectAuthorizationPopup,
}) {
  const location = useLocation();
  // const advantagesRef = useRef(null);
  // const howItWorksRef = useRef(null);

  // function handleScrollTodvantages() {
  //   advantagesRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //   });
  // }

  // function handleScrollToHowItWorks() {
  //   howItWorksRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //   });
  // }

  return (
    <header className="header">
      <Logo />
      {location.pathname === '/' ? (
        <nav className="header__home-menu">
          <div className="header__home-links">
            <button type="button" className="header__home-link">
              Преимущества
            </button>
            <button type="button" className="header__home-link">
              Как это работает?
            </button>
            <button type="button" className="header__home-link">
              Новости
            </button>
          </div>
          <div className="header__buttons">
            <button type="button" className="header__button-login" onClick={openLoginPopup}>
              Войти
            </button>
            <button
              type="button"
              className="header__button-registration"
              onClick={openRegisterPopup}
            >
              Регистрация
            </button>
          </div>
        </nav>
      ) : (
        <>
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li>
                <NavLink to="/budget" className="header__menu-link">
                  <p>Бюджет</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/statistic" className="header__menu-link">
                  <p>Статистика</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" className="header__menu-link">
                  <p>Помощь</p>
                </NavLink>
              </li>
            </ul>
          </nav>
          <NavLink to="/profile" className="header__profile-link">
            <img src={user} className="header__profile-icon" alt="Иконка личного кабинета" />
          </NavLink>
        </>
      )}

      <RegisterPopup
        isPopupOpen={isRegisterPopupOpen}
        closePopup={closePopup}
        redirectAuthorizationPopup={redirectAuthorizationPopup}
      />
      <LoginPopup
        isPopupOpen={isLoginPopupOpen}
        closePopup={closePopup}
        redirectAuthorizationPopup={redirectAuthorizationPopup}
      />
    </header>
  );
}
