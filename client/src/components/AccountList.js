import React from 'react';

import AccountItem from './AccountItem';

function AccountList({ AccountList, onEdit, onRemove }) {
  const a = new Date().toLocaleString();
  return (
    <div className="AccountList">
      <div className="AccountListSpanBox">
        <h4>{AccountList.length}개의 기록이 있어요 !</h4>
      </div>
      <div>
        {AccountList.map(it => (
          <AccountItem
            onEdit={onEdit}
            onRemove={onRemove}
            AccountList={AccountList}
            key={it.id}
            {...it}
          />
        ))}
      </div>
    </div>
  );
}

AccountList.defaultProps = {
  AccountList: ['에러발생 !'],
};

export default AccountList;
