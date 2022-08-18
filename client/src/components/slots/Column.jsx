import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
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
  iconSize,
  column,
  adjustment,
  user,
  setUser,
  setWinState,
}) {
  const [offset, setOffset] = useState(0);

  const columnRef = useRef(null);

  useEffect(() => {
    const transitionEndListener = (e) => {
      e.stopPropagation();
      setValues(values.slice(-3));
      columnRef.current.style.transition = '';
      setOffset(0);
      if (column === 3 && columnRef.current.style.transition === '') {
        const newBalance = user.balance + adjustment;
        setUser({ ...user, balance: newBalance });
        if (adjustment > 0) {
          setWinState(true);
        }
      }
    };

    const el = columnRef.current;

    el.addEventListener('transitionend', transitionEndListener);
    return () => { el.removeEventListener('transitionend', transitionEndListener); };
  }, [columnRef, values]);

  useEffect(() => {
    if (values.length !== 3) {
      columnRef.current.style.transition = `bottom ${scrollTime}s ease-out`;
      setOffset(iconSize * (values.length - 3));
    }
  }, [columnRef, values]);

  return (
    <ColumnContainer
      iconSize={iconSize}
    >
      <IconContainer
        ref={columnRef}
        style={{
          bottom: `${offset}px`,
          transition: `bottom ${scrollTime}s ease-out`,
        }}
      >
        {
          values.map((value, index) => (
            <Icon
              // need to use something other than purely value for key as otherwise
              // there would be duplicates
              // eslint-disable-next-line react/no-array-index-key
              key={`${value}@${index}`}
              iconSize={iconSize}
            >
              {getImageFromValue(value)}
            </Icon>
          ))
        }
      </IconContainer>
    </ColumnContainer>
  );
}

Column.propTypes = {
  scrollTime: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  setValues: PropTypes.func.isRequired,
  iconSize: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  adjustment: PropTypes.number.isRequired,
  user: PropTypes.shape({
    balance: PropTypes.number.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  setWinState: PropTypes.func.isRequired,
};

const ColumnContainer = styled.div`
  ${({ iconSize }) => `
    height: ${iconSize * 3}px;
    width: ${iconSize}px;
  `}
  display: inline-block;
  background-color: #30aebfed;
  border-radius: 10px;
  overflow: hidden;
`;

const IconContainer = styled.div`
  position: relative;
`;

const Icon = styled.div`
  ${({ iconSize }) => `
    height: ${iconSize}px;
    width: ${iconSize}px;
    padding: ${0.10 * iconSize}px;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`;
