import React from 'react';

function SignOut(props) {
  return (
    <div>
      <h1>회원탈퇴시 모든 기록이 사라져요 그래도 진행하시겠어요?</h1>
      <button type="submit" onClick={props.signoutHandler}>
        Yes
      </button>
      <button type="button" onClick={props.closeModal}>
        No
      </button>
    </div>
  );
}

export default SignOut;
