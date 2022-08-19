import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
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
  winState,
  setWinState,
  winningRows,
  setGameInProgress,
  gameInProgress,
  plays,
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
        setGameInProgress(false);
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
              row={index}
              winningRows={winningRows}
              winState={winState}
              iconSize={iconSize}
              plays={plays}
              gameInProgress={gameInProgress}
            >
              {getImageFromValue(value, index, winningRows)}
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
  winState: PropTypes.bool.isRequired,
  setWinState: PropTypes.func.isRequired,
  winningRows: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  setGameInProgress: PropTypes.func.isRequired,
  gameInProgress: PropTypes.bool.isRequired,
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

const blinkingEffect = keyframes`
    25% {
      filter: brightness(1.2);
    }
    75% {
      filter: brightness(0.8);
    }
  `;
//  animation: ${blinkingEffect} 1s ease-in infinite;
// ${({ row, winningRows }) => {
//   console.log('Check:', winningRows, row + 1);
//   return (winningRows[row] === true) && `${blinkingEffect} 1s ease-in infinite;`;
// }}
// animation: ${({ row, winningRows }) => (winningRows.includes(row + 1) === true) && `${blinkingEffect} 1s ease-in infinite;`}
const Icon = styled.div`
  ${({ iconSize }) => `
    height: ${iconSize}px;
    width: ${iconSize}px;
    padding: ${0.10 * iconSize}px;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ row, winningRows, winState }) => (winningRows.includes(row + 1) === true && winState === true) && css`animation: ${blinkingEffect} 1s ease-in infinite;`}
  ${({ row, plays, winState, gameInProgress }) => (row < plays && winState === false && gameInProgress === false) && css`animation: ${blinkingEffect} 1s ease-in infinite;`}
`;

// const Img = styled.img`
//   animation: ${({ row, winningRows }) => (winningRows.includes(row + 1) === true) && `${blinkingEffect} 1s ease-in infinite;`}
//   border: ${({ row, winningRows }) => (winningRows.includes(row + 1) === true) && 'solid #165e58;'}
//   border-width: 5px;
// `;
