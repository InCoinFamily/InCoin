/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useMatch } from 'react-router-dom';
import './Header.scss';
import Logo from '../Logo/Logo';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';
import ProfileTooltip from '../ProfileTooltip/ProfileTooltip';
import defaultavatar from '../../Images/profile-default-avatar-header.svg';
import logo from '../../Images/logo.svg';
import logomini from '../../Images/logo-mini.svg';
import Button from '../../ui/Button/Button';
import Overlay from '../Overlay/Overlay';

export default function Header() {
  const dispatch = useDispatch();

  const { isRegisterPopupOpen, isLoginPopupOpen } = useSelector((state) => state.popup);

  const isLogin = useSelector((state) => state.login.login);
  const { avatar } = useSelector((state) => state.user.user);

  const isBudget = useMatch({ path: '/budget', exact: true });
  const isStatistic = useMatch({ path: '/statistic', exact: true });
  const isHelp = useMatch({ path: '/help', exact: true });

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleRegisterClick = () => {
    dispatch(toggleRegisterPopup(true));
  };
  const handleLoginClick = () => {
    dispatch(toggleLoginPopup(true));
  };

  const closeRegisterPopup = () => {
    dispatch(toggleRegisterPopup(false));
  };
  const closeLoginPopup = () => {
    dispatch(toggleLoginPopup(false));
  };

  const handleProfileTooltipClick = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  const handleScrollToAdvantages = (event) => {
    event.preventDefault();
    const advantagesSection = document.getElementById('advantages');
    advantagesSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHowWorks = (event) => {
    event.preventDefault();
    const howWorksSection = document.getElementById('how-works');
    howWorksSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`header ${isLogin ? 'header-login' : ''}`}>
      {!isLogin ? (
        <>
          <Logo src={logo} />
          <div className="header__content">
            <nav className="header__menu">
              <a
                href="#advantages"
                className="header__menu-link"
                onClick={handleScrollToAdvantages}
              >
                Преимущества
              </a>

              <a href="#how-works" className="header__menu-link" onClick={handleScrollToHowWorks}>
                Как это работает?
              </a>
            </nav>
            <div className="header__buttons">
              <Button
                variant="fiat"
                content="text"
                text="Войти"
                size="large"
                onClick={handleLoginClick}
              />

              <Button
                variant="primary"
                content="text"
                text="Зарегистрироваться"
                size="large"
                onClick={handleRegisterClick}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <Logo src={logomini} />
          <div className="header__content">
            <nav className="header__menu">
              <NavLink
                to="/budget"
                className={isBudget ? 'header__menu-link_active' : 'header__menu-link'}
              >
                Бюджет
              </NavLink>

              <NavLink
                to="/statistic"
                className={isStatistic ? 'header__menu-link_active' : 'header__menu-link'}
              >
                Статистика
              </NavLink>

              <NavLink
                to="/help"
                className={isHelp ? 'header__menu-link_active' : 'header__menu-link'}
              >
                Помощь
              </NavLink>
            </nav>
            <img
              src={avatar === null ? defaultavatar : avatar}
              className="header__profile-icon"
              alt="Аватар"
              onClick={handleProfileTooltipClick}
            />
          </div>
        </>
      )}
      <Overlay isOpen={isTooltipOpen} onClose={handleProfileTooltipClick}>
        <ProfileTooltip onClose={handleProfileTooltipClick} />
      </Overlay>
      {isRegisterPopupOpen && <RegisterPopup onClose={closeRegisterPopup} />}
      {isLoginPopupOpen && <LoginPopup onClose={closeLoginPopup} />}
    </header>
  );
}
