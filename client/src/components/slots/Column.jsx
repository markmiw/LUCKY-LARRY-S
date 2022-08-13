import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Column({ scrollTime, values, setValues }) {
  const [offset, setOffset] = useState(0);

  const columnRef = useRef(null);

  useEffect(() => {
    const transitionEndListener = (e) => {
      e.stopPropagation();
      setValues(values.slice(-3));
      columnRef.current.style.transition = '';
      setOffset(0);
    };

    columnRef.current.addEventListener('transitionend', transitionEndListener);
    return () => { columnRef.current.addEventListener('transitionend', transitionEndListener); };
  }, [columnRef, values]);

  useEffect(() => {
    if (values.length !== 3) {
      columnRef.current.style.transition = `bottom ${scrollTime}s ease-out`;
      setOffset(30 * (values.length - 3));
    }
  }, [columnRef, values]);

  return (
    <div
      style={{
        display: 'inline-block',
        backgroundColor: 'rgb(220, 220, 220)',
        height: '90px',
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
                height: '30px',
                width: '40px',
              }}
            >
              {value}
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
};
