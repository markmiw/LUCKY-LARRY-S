import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import Camel from '../../../dist/slots-icons/Camel.png';
import Die from '../../../dist/slots-icons/Die.png';
import Gem from '../../../dist/slots-icons/Gem.png';
import Larry from '../../../dist/slots-icons/Larry.png';
import PalmTree from '../../../dist/slots-icons/PalmTree.png';

// move the links into served assets when finalized icon decision
const getImageFromValue = function getImageFromValue(value) {
  switch (value) {
    case 5:
      return <img src={Larry} alt="coin icon" />;
    case 4:
      return <img src={Gem} alt="gem icon" />;
    case 3:
      return <img src={Camel} alt="camel icon" />;
    case 2:
      return <img src={PalmTree} alt="palm tree icon" />;
    default: // 1
      return <img src={Die} alt="die icon" />;
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
  plays: PropTypes.number.isRequired,
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

