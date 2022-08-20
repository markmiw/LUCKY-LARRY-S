import styled from 'styled-components';

export const GreenWhiteButton = styled.button`
&:after {
  background-color: green;
  background-image: linear-gradient(to right, #4fe08e, green);

}
background-color: #0b6102;
`
export const YellowOrangeButton = styled.button`
&:after {
  background-color: #FDA300;
  background-image: linear-gradient(to right, #FDA300, #e0734f);
}
background-color: #E09F5A;
`
export const PinkRedButton = styled.button`
&:after {
  background-color: red;
  background-image: linear-gradient(to right, #e05d4f, red);

}
background-color: red;
`
export const BlueBlackButton = styled.button`
&:after {
  background-color: black;
  background-image: linear-gradient(to right, #5882ad, #161a20);
}
background-color: black;
`

export const GreenBlackButton = styled.button`
&:after {
  background-color: black;
  background-image: linear-gradient(to right, #6dcfa4, #178a80);
}
background-color: black;
`

export const BlueAquaButton = styled.button`
&:after {
  background-color: black;
  background-image: linear-gradient(to right, #0b8699, #68ded4);
}
background-color: black;
`
export const BlueLightBlueButton = styled.button`
&:after {
  background-color: #327ba8;
  background-image: linear-gradient(to right, #1E2F97, #327ba8);
}
background-color: #1a4b82
`
export const LightPurplePulpleButton = styled.button`
&:after {
  background-color: #4ADEDE;
  background-image: linear-gradient(to right, #9c76cf, #631b8c);
}
background-color: #1AA7EC;
`
export const PurplePinkButton = styled.button`
  &:after {
    background-color: #FDA300;
    background-image: linear-gradient(to right, #8c1b85, #b0548a);
  }
  background-color: #E09F5A;
`

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 20px;
  margin-left: auto;
`;

export const CloseText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: 100;
  color: black;
`;

const inputText = `
  color: white;
  font-family: din-round,sans-serif;
  font-size: 15px;
  font-weight: 700;
`;

export const StyledInputContainer = styled.div`
  ${inputText}
  height: 100%;
  margin: 0;
  background-image: linear-gradient(to right,#6dcfa4,#178a80);
  width: 100%;
  border: solid #165e58;
  border-radius: 16px;
  border-width: 0 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

export const StyledInputSpan = styled.span`
  ${inputText}
`;

export const StyledInput = styled.input`
  ${inputText}
  border: 0;
  height: 15px;
  width: 5ch;
  padding: 0;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, .5);
  text-align: right;
`;