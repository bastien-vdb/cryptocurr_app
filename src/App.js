import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Coins from './components/Coins';

//Just for make console.log faster
const cs = console.log;

function App() {

  //Creating 2 useState filled after API Call:

  // 1-One to show data (filter or not)
  const [datatab, setData] = useState([]);
  // 2-the second to have an unchanged list even after arr.filter()
  const [listSaved, setListSaved] = useState([]);

  //Call API definition
  const getInfo = async () => {
    const tab = [];
    const res1 =
    //fixed address with no security key, so we can write it directly here
      await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(res => { return res.json() })

    res1.forEach(element => {
      const obj = { id: element.id, image: element.image, symbol: element.symbol, current_price: element.current_price, priceChangePourcent24: element.market_cap_change_percentage_24h, market_cap_rank: element.market_cap_rank }
      setData(tab => [...tab, obj]);
      tab.push(obj)
    })
    //filling of the list
    setData(() => [...tab]);
    setListSaved(()=> [...tab]);
  }

  //using of filter() fnct for the Search field
  const search = (e) => {
    let tab = [...listSaved];
    tab = tab.filter(element=>(element.id).includes(e.target.value)||(element.symbol).includes(e.target.value));
    setData(()=>[...tab]);
  }

  //Call API inserted into an UseEffect
  useEffect(() => {
    getInfo();
  }, [])

  return (
    <div>
      <div className='h-full flex flex-col items-center justify-center'>
        <div id='search' className='mt-12'>
          <input id='crypto' onChange={(e)=>search(e)} className='bg-gray-800 text-center p-2 rounded-md mx-4 lg:text-4xl' placeholder='Search a coin' />
        </div>
        <div id='container' className='w-full m-2 p-6 lg:w-2/3 lg:p-10 lg:m-10 h-fit justify-center rounded-xl flex flex-wrap gap-10'>
          {/* All the props are passed directly into the component with {...e} */}
          {datatab.map(e => <Coins {...e} />)}
        </div>
      </div>
    </div >
  );
}

export default App;
