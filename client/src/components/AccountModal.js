import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import AccountEditor from './AccountEditor';

let AccountModalBtnAnimation = keyframes`
  50% {top: 0; opacity: 1}
  100% {top: -300px; opacity: 0}
  `;

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  text-align: center;
  background-color: white;
`;

export const ModalBtn = styled.button`
  outline: none;
  background-color: white;
  text-decoration: none;
  font-size: 40px;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
  animation-name: ${AccountModalBtnAnimation};
  animation-duration: 1.5s;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

function AccountModal({ onCreate }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ModalContainer>
      <ModalBtn onClick={openModalHandler}>
        {isOpen === false ? '📝' : '📝'}
      </ModalBtn>
      {isOpen === true ? (
        <ModalBackdrop onClick={openModalHandler}>
          <div className="AccountModalview" onClick={e => e.stopPropagation()}>
            <div className="AccountModalviewSpanBtn">
              <span onClick={openModalHandler} className="close-btn">
                &times;
              </span>
            </div>
            <div className="AccountModalviewDesc">
              <AccountEditor
                openModalHandler={openModalHandler}
                onCreate={onCreate}
              />
            </div>
          </div>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
}

export default AccountModal;
