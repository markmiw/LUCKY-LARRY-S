import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

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

export const ModalWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  min-width: 30rem;
  z-index: 11;
  height: 500px;
  margin-top: -300px;
  overflow-y: scroll;
`

export const ModalForm = styled.form`
  z-index: 11;
  color: black;
`


export const CloseModalButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  padding: 0;
  z-index: 10;
`

export const ModalWrapperStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  perspective: 5.5cm;
`;

export const ModalBackgroundStyled = styled.div`
  background: rgba(250, 250, 250, 0.3);
  backdrop-filter: blur(2px);
  position: fixed;
  top: 0;
  left:0;
  right:0;
  bottom: 0;
  z-index: 10;
`;

export const ModalInnerStyled = styled.div`
  background: white;
  border: 1px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  min-width: 30rem;
  z-index: 11;
  height: 500px;
  margin-top: -300px;
  overflow-y: scroll;
`;

export const ModalHeaderStyled = styled.div`
  border-bottom: 1px solid black;
  padding: 3px;
  position: relative;
`;

export const ModalHeaderInnerStyled = styled.div`
  display: flex;
  align-items: center;
  width: (80%);
`;

export const ModalHeaderContentStyled = styled.div`
  flex: 1;
`;

export const CloseButtonStyled = styled.button`
  background: none;
  top: 20px;
  right: 20px;
  width: 32px;
  padding: 0;
  border-radius: 50%;
  border: none;
  position: absolute;
  z-index: 14;
  &:hover {
    cursor: pointer;
  }



`;