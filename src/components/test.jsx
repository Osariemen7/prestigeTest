import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const data = [
  { option: '0%', likelihood: 0.3, style:{ backgroundColor: 'red', textColor: 'white' } },
  { option: `0.2%`, likelihood: 0.1, style:{ backgroundColor: 'black', textColor: 'white' } },
  { option: `10%`, likelihood: 0.1, style:{ backgroundColor: 'green', textColor: 'white' } },
  { option: `0.5%`, likelihood: 0.4, style:{ backgroundColor: 'black', textColor: 'white' } },
  
  { option: `0.3%`, likelihood: 0.1, style:{ backgroundColor: 'red', textColor: 'white' }},
  { option: `0.1% `, likelihood: 0.1, style:{ backgroundColor: 'black', textColor: 'white' }},
  { option: `0.4% `, likelihood: 0.1, style:{ backgroundColor: 'red', textColor: 'white' }},
  { option: `0.1% `, likelihood: 0.1, style:{ backgroundColor: 'black', textColor: 'white' }},
  { option: `0.2%`, likelihood: 0.1, style:{ backgroundColor: 'red', textColor: 'white' }},
  { option: `0% `, likelihood: 0.1, style:{ backgroundColor: 'black', textColor: 'white' }},
  { option: `0.1%`, likelihood: 0.1, style:{ backgroundColor: 'red', textColor: 'white' }},
  { option: `0.1%`, likelihood: 0.1, style:{ backgroundColor: 'black', textColor: 'white' }},
  { option: `0.3%`, likelihood: 0.1, style:{ backgroundColor: 'red', textColor: 'white' }}
];

const BarChart = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState('');
  const [winCount, setWinCount] = useState({});

  const handleSpinClick = () => {
    if (!mustSpin) {
      spinWheel();
    }
  };

  const spinWheel = () => {
    // Calculate the total likelihood
    const totalLikelihood = data.reduce((total, prize) => total + prize.likelihood, 0);

    // Generate a random value between 0 and the total likelihood
    const randomValue = Math.random() * totalLikelihood;

    // Determine which segment the randomValue falls into
    let currentLikelihood = 0;
    for (const prize of data) {
      currentLikelihood += prize.likelihood;
      if (randomValue < currentLikelihood) {
        setSelectedPrize(prize.option);
        setMustSpin(true);

        // Update win count
        setWinCount((prevWinCount) => ({
          ...prevWinCount,
          [prize.option]: (prevWinCount[prize.option] || 0) + 1,
        }));
        break;
      }
    }
  };

  return (
    <div className='ma'>
      <Wheel 
        mustStartSpinning={mustSpin}
        prizeNumber={data.findIndex((prize) => prize.option === selectedPrize)} // Make sure to provide the number of segments
        data={data}
        radiusLineColor='yellow'
        radiusLineWidth={6}
        outerBorderWidth= {3}
        innerRadius ={10}
        onStopSpinning={() => {
          // The onStopSpinning event is automatically triggered when spinning is complete
          // You can use it to handle post-spin actions if needed
          setMustSpin(false);
          
        }}
      />
      <button onClick={handleSpinClick} className='logb'>SPIN</button>
      {selectedPrize && <p>You won: {selectedPrize} of  </p>}
      
    </div>
  );
};

export default BarChart;
