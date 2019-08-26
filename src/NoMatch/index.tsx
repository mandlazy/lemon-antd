import './style.scss';
import React from 'react';

function NoMatch() {
  return (
    <div className='nomatch'>
      <div className='nomatch-body'>
        <p className='nomatch-body-404'>404 not found</p>
        <p className='nomatch-body-tip'>页面url有误，请确认！</p>
      </div>
    </div>
  );
}

export default NoMatch;
