import React, { useRef, useState } from 'react';

function DiaryItem({
  onEdit,
  onRemove,
  location,
  content,
  write_date,
  id,
  create_date,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id + 1}번째 일기를 정말로 지우겠어요?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 이렇게 수정할까요 ?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <div className="place">
          <span>장소 : {location}</span>
        </div>
        <br />

        <span className="date">작성 시간 :{write_date}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <div className="DiaryItemTextarea">
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={e => setLocalContent(e.target.value)}
            />
          </div>
        ) : (
          <div DiaryItemContentBox>
            <span className="DiaryItemContentSpan">{content}</span>
          </div>
        )}
      </div>
      {isEdit ? (
        <div className="DiaryItemOptionBtnBox">
          <div>
            <button className="DiaryItemQuitEditBtn" onClick={handleQuitEdit}>
              수정 취소
            </button>
          </div>
          <div>
            <button className="DiaryItemEditSubmitBtn" onClick={handleEdit}>
              수정 완료
            </button>
          </div>
        </div>
      ) : (
        <div className="DiaryItemBtnBox">
          <div>
            <button className="DiaryItemRemoteBtn" onClick={handleRemove}>
              삭제
            </button>
          </div>
          <div>
            <button className="DiaryItemEditBtn" onClick={toggleIsEdit}>
              수정
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiaryItem;
