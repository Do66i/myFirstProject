import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useContext,
} from 'react';
import './Diary.css';
import { stateContext } from '../store';
import DiaryModal from './DiaryModal';
import DiaryList from './DiaryList';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date,
      };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter(it => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map(it =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it,
      );
    }
    default:
      return state;
  }
};

function Diary() {
  const [diaryData, diarySetData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);
  const context = useContext(stateContext);

  const dataId = useRef(0);

  const getData = () => {
    axios
      .get(
        `https://www.remembertrip.tk/trip/${context.state.tripList[0].id}/diary`,
        {
          headers: {
            authorization: `Bearer ${context.state.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(data => {
        const initData = data.data.diaries;
        dispatch({ type: 'INIT', data: initData });
        diarySetData(initData);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  const onCreate = useCallback(
    (location, content, write_date) => {
      dispatch({
        type: 'CREATE',
        data: { location, content, write_date, id: dataId.current },
      });

      let newDate = new Date();
      let nowTime =
        newDate.getFullYear() +
        '-' +
        newDate.getMonth() +
        '-' +
        newDate.getDate() +
        ' ' +
        newDate.getHours() +
        ':' +
        newDate.getMinutes() +
        ':' +
        newDate.getSeconds();
      axios
        .post(
          `https://www.remembertrip.tk/trip/${context.state.tripList[0].id}/diary`,
          { location, content, write_date: nowTime, trip_id: 1 },
          {
            headers: {
              authorization: `Bearer ${context.state.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(data => {
          const diary_id = data.data.diary_id;
          const created_date = new Date().getTime();
          const newItem = {
            location,
            content,
            write_date: nowTime,
            created_date,
            id: diary_id,
          };
          diarySetData([newItem, ...diaryData]);
        });
    },
    [diaryData],
  );

  const onRemove = targetId => {
    axios
      .delete(
        `https://www.remembertrip.tk/trip/${context.state.tripList[0].id}/diary/${targetId}`,
        {
          headers: {
            authorization: `Bearer ${context.state.accessToken}`,
            'Content-Type': 'application/json',
          },
          data: {
            diary_id: targetId,
          },
        },
      )
      .then(res => {
        dispatch({ type: 'REMOVE', targetId });

        const newDiaryList = data.filter(it => it.id !== targetId);
        diarySetData(newDiaryList);
      });
  };

  const onEdit = (targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });

    diarySetData(
      data.map(it =>
        it.id === targetId ? { ...it, content: newContent } : it,
      ),
    );
  };

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  return (
    <div className="Diary">
      <DiaryModal onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={diaryData} />
    </div>
  );
}
export default Diary;
