import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import DiaryEditor from './DiaryEditor';

let DiaryModalBtnAnimation = keyframes`
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
  margin-top: 10px;
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
  animation-name: ${DiaryModalBtnAnimation};
  animation-duration: 1.5s;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

function DiaryModal({ onCreate, openModalHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  function openModalHandler() {
    setIsOpen(!isOpen);
  }
  return (
    <ModalContainer>
      <ModalBtn onClick={openModalHandler}>
        {isOpen === false ? '📝' : '📝'}
      </ModalBtn>
      {isOpen === true ? (
        <ModalBackdrop onClick={openModalHandler}>
          <div className="DiaryModalview" onClick={e => e.stopPropagation()}>
            <div className="DiaryModalviewSpanBtn">
              <span onClick={openModalHandler}>&times;</span>
            </div>
            <div className="DiaryModalviewDesc">
              <DiaryEditor
                onCreate={onCreate}
                openModalHandler={openModalHandler}
              />
            </div>
          </div>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
}

export default DiaryModal;
