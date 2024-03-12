import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import SliderWithInfo from '../component/SliderWithInfo';
import SelectAutoWidth from '../component/Select';
import PieChart from '../component/PieChart';
import { Pagination } from '@mui/material';
import Chart from 'chart.js/auto';

const Home = () => {
  const [homevalue, setHomeValue] = useState(1700);
  const [downPaymentValue, setDownPaymentValue] = useState(180);
  const [loanAmountValue, setLoanAmountValue] = useState(1520);
  const [interestValue, setInterestValue] = useState(2); // Yearly
  const [tenureParent, setTenureParent] = useState();
  const [monthlyInterest, setMonthlyInterest] = useState();

  const updateChartData = () => {
    const r = interestValue / 12;
    const n = tenureParent * 12;
    const EMI = (loanAmountValue * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    const principal = loanAmountValue;
    const interest = EMI * n - loanAmountValue;

    setMonthlyInterest(EMI);

    setChartData({
      labels: ['Principal', 'Interest'],
      datasets: [
        {
          label: 'Monthly Payment',
          data: [principal, interest],
          backgroundColor: ['#F00F00', '#FCFCFC'],
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    });
  };

  const [chartData, setChartData] = useState({
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        label: 'Monthly Payment',
        data: [homevalue, 230],
        backgroundColor: ['#F00F00', '#FCFCFC'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const downPayment = homevalue * 0.20;
    setDownPaymentValue(downPayment);

    const loanAmount = homevalue - downPaymentValue;
    setLoanAmountValue(loanAmount);
  }, [homevalue, downPaymentValue]);

  useEffect(() => {
    updateChartData();
  }, [loanAmountValue, interestValue, tenureParent]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
        }}
      >
        {/* Sliders */}
        <div style={{ width: '50%', padding: '0px 10px' }}>
          <SliderWithInfo title={'Home Value'} symbol={'$'} setValue={setHomeValue} value={homevalue} min={1000} max={10000} updateChartData={updateChartData} />
          <SliderWithInfo title={'Down Payment'} symbol={'$'} setValue={setDownPaymentValue} value={downPaymentValue} min={0} max={homevalue} updateChartData={updateChartData} />
          <SliderWithInfo title={'Loan Amount'} symbol={'$'} setValue={setLoanAmountValue} value={loanAmountValue} min={0} max={homevalue} updateChartData={updateChartData} />
          <SliderWithInfo title={'Interest Rate'} symbol={'%'} setValue={setInterestValue} value={interestValue} min={1} max={18} updateChartData={updateChartData} />
          <SelectAutoWidth setTenureParent={setTenureParent} />
        </div>
        {/* Graph */}
        <div style={{ width: '50%' }}>
          <PieChart chartData={chartData} />
          <p>{monthlyInterest}</p>
          <Pagination count={10} defaultPage={1} page={4} onChange={(e, pageNo) => { console.log('Page', pageNo) }} />
        </div>
      </div>
    </>
  );
};

export default Home;
