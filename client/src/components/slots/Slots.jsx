import React, { useState } from 'react';
import axios from 'axios';
import Column from './Column';

export default function Slots() {
  const [column1Values, setColumn1Values] = useState([1, 2, 3]);
  const [column2Values, setColumn2Values] = useState([4, 5, 1]);
  const [column3Values, setColumn3Values] = useState([2, 3, 4]);

  function getSlotArray(start, result) {
    const filler = [...new Array(75)].map(() => Math.floor(Math.random() * 5));
    return start.concat(filler, result);
    // last 3 items of this returned array = what slot machine lands on
  }

  function play() {
    // don't allow playing when a roll is in progress
    if (column3Values.length !== 3) {
      return;
    }
    axios.get('/api/weightedSlots', { params: { plays: 3 } })
      .then((result) => {
        const { data } = result;
        const col1 = [data[0], data[3], data[6]];
        const col2 = [data[1], data[4], data[7]];
        const col3 = [data[2], data[5], data[8]];
        setColumn1Values(getSlotArray(column1Values, col1));
        setColumn2Values(getSlotArray(column2Values, col2));
        setColumn3Values(getSlotArray(column3Values, col3));
      })
      .catch((err) => {
        console.log('Error in Slots play:', err);
      });
  }

  return (
    <>
      <Column
        scrollTime={4}
        values={column1Values}
        setValues={setColumn1Values}
      />
      <Column
        scrollTime={5.5}
        values={column2Values}
        setValues={setColumn2Values}
      />
      <Column
        scrollTime={7}
        values={column3Values}
        setValues={setColumn3Values}
      />
      <button
        type="button"
        onClick={() => {
          play();
        }}
      >
        Go!
      </button>
    </>
  );
}
