import React, { useState, useEffect } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import styled, { keyframes, css } from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';
import WinningEffect from '../shared/WinningEffect';
import LarryBackground from '../../../dist/background/LarryBackground.jpeg';
import scratchBackground from '../../../dist/background/scratch_ticket.jpeg';
import {
  StyledInputContainer,
  StyledInputSpan,
  StyledInput,
} from '../shared/button.styled';

const GRID_COLS = 5;
const winningsArr = [0, 0, 1, 10, 25, 100]; // 0-5 matches

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// number set
function getNUnique(n) {
  const arr = [];
  const set = new Set();
  for (let i = 0; i < n; i += 1) {
    let num = getRandom(1, 50);
    while (set.has(num)) {
      num = getRandom(1, 50);
    }
    arr.push(num);
    set.add(num);
  }
  return arr;
}

export default function ScratchTicket({ user, setUser }) {
  const [winningValues, setWinningValues] = useState([]);
  const [matchingValues, setMatchingValues] = useState([]);
  const [bet, setBet] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [confirmWinnings, setConfirmWinnings] = useState(false);
  const [notWinState, setNotWinState] = useState(false);

  const [numMatches, setNumMatches] = useState(0);
  const [winningAmount, setWinningAmount] = useState(0);
  const [winningAnimation, setWinningAnimation] = useState(false);

  useEffect(() => {
    setWinningValues(getNUnique(5));
    setMatchingValues(getNUnique(25));
  }, [playing]);

  function countMatches() {
    let count = 0;
    winningValues.forEach((amount) => {
      if (matchingValues.includes(amount)) {
        count += 1;
      }
    });
    return count;
  }

  async function getWinnings() {
    const matches = countMatches();
    setNumMatches(matches);
    const winnings = bet * winningsArr[matches];
    setWinningAmount(winnings);

    const res = await axios.post('/api/user/winnings', {
      id: user.id,
      bet,
      winnings,
    });

    setUser({
      ...user,
      balance: res.data.results,
    });

    if (winnings > 0) {
      setConfirmWinnings(true);
      setWinningAnimation(true);
    } else {
      setNotWinState(true);
    }
  }

  function changeBet(value) {
    setBet(Number(value));
  }

  // need to check if user entered a bet amount
  function confirmPlay() {
    if (bet >= 1 && bet <= user.balance) {
      setPlaying(true);
      alertify.success(`Placed a bet of $${bet}`);
    } else {
      alertify.error('Enter a legal bet');
    }
  }

  function handlePlayAgain() {
    setConfirmWinnings(false);
    setNotWinState(false);
    setPlaying(false);
  }

  // setTimeout is somehow broken with 10 sec.
  // using 15 sec as placeholder
  const winningEffect = () => {
    setTimeout(() => {
      setWinningAnimation(false);
    }, 4000);
  };

  useEffect(winningEffect, [winningAnimation]);

  return (
    <ScratchGrid>
      <Game
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {winningAnimation && <WinningEffect />}
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <StyledInputContainer style={{ color: 'white' }}>
            $
            <StyledInput
              className="input-lg"
              type="text"
              disabled={playing}
              onChange={(e) => {
                console.log(e.target.value);
                const digits = e.target.value.split(/[^0-9]/).join('');
                // max length 5 chars
                changeBet(digits.slice(0, 5));
              }}
              value={bet.toString()}
            />
          </StyledInputContainer>
        </Form>
        {/* <BetButton onClick={() => confirmPlay()}>Bet</BetButton> */}
        <Scratcher>
          {!playing ? (
            <ConfirmOverlay onClick={() => confirmPlay()} />
          ) : (
            <ScratchCard
              width={500}
              height={600}
              image={LarryBackground}
              finishPercent={80}
              onComplete={() => getWinnings()}
            >
              <WinningVals>
                {winningValues.map((num) => (
                  <Tile key={num}>{num}</Tile>
                ))}
              </WinningVals>
              <MatchingVals>
                {matchingValues.map((num) => (
                  <ScratchTicketNumber
                    key={num}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '70px',
                      border: '1px solid white',
                      borderRadius: '100px',
                      backgroundColor: '#FE53BB',
                    }}
                  >
                    {num}
                  </ScratchTicketNumber>
                ))}
              </MatchingVals>
            </ScratchCard>
          )}
          {confirmWinnings && (
            <ConfirmOverlay>
              <div>{`Congratulations you won $${winningAmount}`}</div>
              <div>
                {`You had ${numMatches} `}
                matches
              </div>
              <button type="submit" onClick={() => handlePlayAgain()}>
                Play again?
              </button>
            </ConfirmOverlay>
          )}
          {notWinState && (
            <ConfirmOverlay>
              <div>Click to play again</div>
              <div>
                {`You had ${numMatches} `}
                matches
              </div>
              <button type="submit" onClick={() => handlePlayAgain()}>
                Play again?
              </button>
            </ConfirmOverlay>
          )}
        </Scratcher>
      </Game>
    </ScratchGrid>
  );
}

ScratchTicket.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    countryid: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    winnings: PropTypes.number.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

const ScratchGrid = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-rows: auto auto;
  height: 600px;
`;

const Game = styled.form`
  display: flex;
  flex-direction: column;
`;

const Form = styled.div`
  height: 100px;
`;

const Scratcher = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const colorRotate = keyframes`
  0% {
    filter: hue-rotate(1deg);
  }

  50% {
    filter: hue-rotate(180deg);
  }

  100% {
    filter: hue-rotate(1deg);
  }
`;

// grey background
const ConfirmOverlay = styled.div`
  animation: ${css`${colorRotate}`} 4s ease-in infinite;
  display: grid;
  place-items: center;
  position: absolute;
  justify-self: center;
  width: 500px;
  height: 600px;
  max-width: 90%;
  color: black;
  background-image: url(${scratchBackground});
  background-size: cover;
  z-index: 2;
`;

const WinningVals = styled.div`
  display: flex;
  justify-content: center;
`;

const MatchingVals = styled.div`
  display: grid;
  grid-template-columns: repeat(${GRID_COLS}, 1fr);
  margin: 10px;
`;

const Tile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(to right, #FE53BB, #F5D300);
  @media (min-width: 501px) {

    width: 100px;
    height: 100px;
    border: 1px solid;
    margin: 10px;
    border-radius: 100px;
  }
  @media (max-width: 500px) {
    width: 60px;
    height: 30px;
    border: 1px solid;
    margin: 10px;
    border-radius: 100px;
  }
`;

const ScratchTicketNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: linear-gradient(to right, #F5D300, #09FBD3);
  @media (min-width: 501px) {
    width: 100px;
    height: 100px;
    border: 1px solid ;
    margin: 10px;
    border-radius: 100px;
  }
  @media (max-width: 500px) {
    width: 60px;
    height: 30px;
    border: 1px solid ;
    margin: 7px;
    border-radius: 100px;
  }
`;
