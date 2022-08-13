import React, { useEffect, useState, useContext } from 'react';
import BetTable from './BetTable.jsx'
import { RouletteInfo1Grid, RouletteInfo2Grid, GameDisplay, BetTableContainer  } from './roulette.styled.js';

export default function RouletteBet () {
  // RouletteBet will contain:
  // note: for MVP, only allow single bet
  // betting table:
    // bet on color, number, odd/even, 12range, 18range, rows, blocks
  // CHECK betting amount (for each bet)
  // multiplier: the payout for each choice
  // Winning Amount
  const [betAmount, setBetAmount] = useState(0);
  // whenever use click on betting board, this betState increases
  const [betState, setBetState] = useState(0);
  // userBets ex: {number: [2,3,4], color: red, eo: true, rangeOf12: 2 }
  const [userBets, setUserBets] = useState({});


  return (
    <div>
    <RouletteInfo1Grid>
      <form>
        <label htmlFor="dishName">Amount Betting: </label>
        <input id="recipeName" type="text" placeholder="place bet amount here" onChange={() => {setBetAmount(event.target.value); console.log('amount recorded', event.target.value)}} required />
      </form>
      <GameDisplay>Win Chance: </GameDisplay>

    </RouletteInfo1Grid>
    <RouletteInfo2Grid>
      <GameDisplay>Multiplier: </GameDisplay>

      <GameDisplay>Winning Amount: </GameDisplay>
      </RouletteInfo2Grid>
      <BetTableContainer>
        <BetTable/>
      </BetTableContainer>
      </div>
  )
}