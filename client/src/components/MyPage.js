import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { stateContext } from '../store';
import MyPageList from './MyPageList';
import SignOut from './SignOut';
import PatchUser from './PatchUser';
import './MyPageList.css';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function MyPage() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newModalIsOpen, setNewIsOpen] = useState(false);
  const context = useContext(stateContext);
  const navigate = useNavigate();
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function newOpenModal() {
    setNewIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setNewIsOpen(false);
  }

  const signoutHandler = () => {
    axios
      .delete('https://www.remembertrip.tk/withdrawal', {
        headers: {
          authorization: `Bearer ${context.state.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div className="MyPage">
      {context.state.isLogIn ? (
        context.state.tripList.map(el => (
          <MyPageList
            className="MyPageListComponent"
            key={el.id}
            country={el.country}
            totalCost={el.totalPrice}
            start_date={el.start_date}
            end_date={el.end_date}
          />
        ))
      ) : (
        <p className="MyPageP">💁‍♂️ 먼저 로그인을 진행해주세요 </p>
      )}
      <div className="MyPageBtnBoxes">
        <div className="MyPageBtn1">
          <button
            className="MyPageBtn1"
            type="submit"
            onClick={context.funcs.logoutHandler}
          >
            로그아웃
          </button>
        </div>
        <div className="MyPageBtn2">
          <button className="MyPageBtn2" type="button" onClick={openModal}>
            회원탈퇴
          </button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            appElement={document.getElementById('root') || undefined}
          >
            <SignOut
              closeModal={closeModal}
              signoutHandler={signoutHandler}
            ></SignOut>
          </Modal>
        </div>
        <div className="MyPageBtn3">
          <button className="MyPageBtn3" type="button" onClick={newOpenModal}>
            정보수정
          </button>
          <Modal
            isOpen={newModalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            appElement={document.getElementById('root') || undefined}
          >
            <PatchUser></PatchUser>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
