import styled from 'styled-components';

export const RouletteGameGrid = styled.div`
  display: grid;
  width: 80vw;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  grid-template-rows: auto auto;
  color: white;
  @media (min-width: 501px) {
    gap: 8%;
  }
  @media (max-width: 500px) {
    gap: 2%;
  }
`
export const RouletteWheelContainer = styled.div`
  margin: 0 auto;
`
export const SpinButton = styled.button`

`
export const RouletteInfo1Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
  gap: 5%;
`
export const RouletteInfo2Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
  gap: 5%;
`
export const GameDisplay = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 30px;
`

export const BetTableContainer = styled.div`
  margin: 0 auto;
`
export const BetNumberGrid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto;
`
export const Number0Button = styled.button`
&:after {
  background-color: green;
}
background-color: #0b6102;
`

export const NumberButton = styled.button`
&:after {
  background-color: #FDA300;
}
background-color: #E09F5A;
`
export const BetColorOddGrid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto auto;
`
export const RedColorButton = styled.button`
&:after {
  background-color: red;
}
background-color: red;
`
export const BlackColorButton = styled.button`
&:after {
  background-color: black;
}
background-color: black;
`

export const Bet12Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
`
export const Bet12Button = styled.button`
&:after {
  background-color: #327ba8;
}
background-color: #1a4b82
`
export const Bet18Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto;

`
export const Bet18Button = styled.button`
&:after {
  background-color: #4ADEDE;
}
background-color: #1AA7EC;
`
export const BetRowGrid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
`
export const BetRowButton = styled.button`
  &:after {
    background-color: #FDA300;
  }
  background-color: #E09F5A;
`

