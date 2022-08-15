import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// move the links into served assets when finalized icon decision
const getImageFromValue = function getImageFromValue(value) {
  switch (value) {
    case 4:
      return <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/322/gem-stone_1f48e.png" alt="diamond" />;
    case 3:
      return <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/322/high-voltage_26a1.png" alt="lightning" />;
    case 2:
      return <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/322/lemon_1f34b.png" alt="lemon" />;
    case 1:
      return <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/322/dollar-banknote_1f4b5.png" alt="banknote" />;
    default: // 0
      return <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/322/cherries_1f352.png" alt="cherries" />;
  }
};

export default function Column({
  scrollTime,
  values,
  setValues,
  balance,
  setBalance,
  adjustment,
  column,
}) {
  const [offset, setOffset] = useState(0);

  const columnRef = useRef(null);

  useEffect(() => {
    const transitionEndListener = (e) => {
      e.stopPropagation();
      setValues(values.slice(-3));
      columnRef.current.style.transition = '';
      setOffset(0);
      if (column === 3) {
        setBalance(balance + adjustment);
      }
    };

    columnRef.current.addEventListener('transitionend', transitionEndListener);
    return () => { columnRef.current.addEventListener('transitionend', transitionEndListener); };
  }, [columnRef, values]);

  useEffect(() => {
    if (values.length !== 3) {
      columnRef.current.style.transition = `bottom ${scrollTime}s ease-out`;
      setOffset(50 * (values.length - 3));
    }
  }, [columnRef, values]);

  return (
    <div
      style={{
        display: 'inline-block',
        backgroundColor: 'rgb(220, 220, 220)',
        height: '150px',
        width: '40px',
        marginRight: '10px',
        overflow: 'hidden',
      }}
    >
      <div
        ref={columnRef}
        style={{
          position: 'relative',
          bottom: `${offset}px`,
          transition: `bottom ${scrollTime}s ease-out`,
        }}
      >
        {
          values.map((value, index) => (
            <div
              // need to use something other than purely value for key as otherwise
              // there would be duplicates
              // eslint-disable-next-line react/no-array-index-key
              key={`${value}@${index}`}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40px',
                width: '40px',
                marginBottom: '10px',
              }}
            >
              {getImageFromValue(value)}
            </div>
          ))
        }
      </div>
    </div>
  );
}

Column.propTypes = {
  scrollTime: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  setValues: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
  setBalance: PropTypes.func.isRequired,
  adjustment: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
};
