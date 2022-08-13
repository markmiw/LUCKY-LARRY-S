import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: '0', style: { backgroundColor: 'green' } },
  { option: '1' },
  { option: '2' },
  { option: '3' },
  { option: '4' },
  { option: '5' },
  { option: '6' },
  { option: '7' },
  { option: '8' },
  { option: '9' },
  { option: '10' },
  { option: '11' },
  { option: '12' },
  { option: '13' },
  { option: '14' },
  { option: '15' },
  { option: '16' },
  { option: '17' },
  { option: '18' },
  { option: '19' },
  { option: '20' },
  { option: '21' },
  { option: '22' },
  { option: '23' },
  { option: '24' },
  { option: '25' },
  { option: '26' },
  { option: '27' },
  { option: '28' },
  { option: '29' },
  { option: '30' },
  { option: '31' },
  { option: '32' },
  { option: '33' },
  { option: '34' },
  { option: '35' },
  { option: '36' }
]

const backgroundColors = ['#9c0505', '#000000'];
const textColors = ['white'];
const outerBorderColor = 'black';
const outerBorderWidth = 18;
const innerBorderColor = '#000000';
const innerBorderWidth = 29;
const innerRadius = 42;
const radiusLineColor = '#e3c13b';
const radiusLineWidth = 4;
const fontSize = 17;
const textDistance = 77;
const spinDuration = 1.0;

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    console.log(newPrizeNumber)
    setMustSpin(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontSize={fontSize}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          spinDuration={spinDuration}
          // perpendicularText
          textDistance={textDistance}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button className={'spin-button'} onClick={handleSpinClick}>
          SPIN
        </button>
      </header>
    </div>
  )
}