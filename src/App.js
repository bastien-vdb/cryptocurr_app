import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Coins from './components/Coins';

const cs = console.log;

function App() {

  const [datatab, setData] = useState([]);

  const getInfo = async () => {
    const tab = [];
    const res1 =
      await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(res => { return res.json() })
    // .then(res=>cs(res))

    res1.forEach(element => {
      const obj = { id: element.id, image: element.image, symbol: element.symbol, current_price: element.current_price, priceChangePourcent24: element.market_cap_change_percentage_24h, market_cap_rank: element.market_cap_rank }
      setData(tab => [...tab, obj]);
      tab.push(obj)
    })
    setData(() => [...tab]);
    cs(datatab)
  }

  const search = (e) => {
    cs(e.target.value);
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <div>
      <div className='bg-black h-full flex flex-col items-center justify-center'>
        <div id='search' className='mt-12'>
          <input id='crypto' onChange={(e)=>search(e)} className='bg-gray-800 text-center p-2 rounded-md text-4xl' placeholder='Search a coin' />
        </div>
        <div id='container' className=' w-2/3 h-fit justify-around rounded-xl flex flex-wrap gap-10 p-10 m-10'>
          {datatab.map(e => <Coins {...e} />)}
        </div>
      </div>
    </div >
  );
}

export default App;
