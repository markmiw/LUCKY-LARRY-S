import React, { useState } from 'react';
import Column from './Column';

export default function Slots() {
  const [column1Values, setColumn1Values] = useState([1, 2, 3]);
  const [column2Values, setColumn2Values] = useState([4, 5, 6]);
  const [column3Values, setColumn3Values] = useState([7, 8, 9]);

  function getSlotArray(start, result) {
    const filler = [...new Array(50)].map(() => Math.floor(Math.random() * 5 + 1));
    return start.concat(filler, result);
  }

  function play() {
    // don't allow playing when a roll is in progress
    if (column3Values.length !== 3) {
      return;
    }
    // get values from andy
    const result = [7, 7, 7, 6, 6, 6, 5, 5, 5];
    setColumn1Values(getSlotArray(column1Values, result.slice(0, 3)));
    setColumn2Values(getSlotArray(column2Values, result.slice(3, 6)));
    setColumn3Values(getSlotArray(column3Values, result.slice(6)));
  }

  return (
    <>
      <Column
        scrollTime={4}
        values={column1Values}
        setValues={setColumn1Values}
      />
      <Column
        scrollTime={5}
        values={column2Values}
        setValues={setColumn2Values}
      />
      <Column
        scrollTime={6}
        values={column3Values}
        setValues={setColumn3Values}
      />
      <button
        type="button"
        style={{
          marginTop: '50px',
        }}
        onClick={() => {
          play();
        }}
      >
        Go!
      </button>
    </>
  );
}
