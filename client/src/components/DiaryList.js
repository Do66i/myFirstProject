import React, { useContext } from 'react';
import DiaryItem from './DiaryItem';
import { stateContext } from '../store';
const { getName } = require('country-list');

function DiaryList({ diaryList, onEdit, onRemove }) {
  const context = useContext(stateContext);
  return (
    <div className="DiaryList">
      <h2>{`${getName(
        context.state.tripList[0].country,
      )} 에서의 일기리스트`}</h2>
      <div className="DiaryListSpanBox">
        <span>{diaryList.length}</span> <span>개의 기록이 있어요 !</span>
      </div>
      <div>
        {diaryList.map(it => (
          <DiaryItem
            onEdit={onEdit}
            onRemove={onRemove}
            diaryList={diaryList}
            key={it.id}
            {...it}
          />
        ))}
      </div>
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: ['에러발생 !'],
};

export default DiaryList;
