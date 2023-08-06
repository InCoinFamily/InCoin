/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './Popup.scss';
import PopupOverlay from '../PopupOverlay/PopupOverlay';

export default function Popup({ children, onClose, popupSize, title, subtitle }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef(null);

  const closeModal = () => {
    onClose ? onClose() : navigate.goBack();
  };

  useEffect(() => {
    setIsOpen(true);
    function onKeyDown(evt) {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return createPortal(
    <>
      <PopupOverlay onClose={closeModal} />
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="modal"
        unmountOnExit
        onExited={closeModal}
        nodeRef={nodeRef}
      >
        <div className={`${popupSize} popup`} ref={nodeRef}>
          <h2 className="popup__title">{title}</h2>
          <p className="popup__subtitle">{subtitle}</p>
          <button
            type="button"
            className="popup__close"
            aria-label="Закрыть"
            onClick={closeModal}
          />
          {children}
        </div>
      </CSSTransition>
    </>,
    document.getElementById('modals'),
  );
}
