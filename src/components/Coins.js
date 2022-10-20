import React from 'react';

function Coins({ image, symbol, priceChangePourcent24, current_price, market_cap_rank}) {
    return (
        <div>
            <div id='minibox' className='h-48 w-48 bg-black border-2 border-yellow-600 rounded-xl hover:scale-125 hover:rotate-3 duration-300 cursor-pointer ease-in-out flex flex-col gap-2 p-4 shadow-lg shadow-orange-300'>
                <div className='flex justify-evenly w-full'>
                    <img src={image} alt='crypto image' className='h-8 w-8' />
                    <p className='text-xl uppercase'>{symbol}</p>
                </div>
                <div className='text-center flex flex-col gap-6 font-bold'>
                    <p className={priceChangePourcent24>=0? 'text-green-500 text-3xl':'text-red-500 text-3xl'}>{Math.floor(priceChangePourcent24)} %</p>
                    <p>Price: <span className='text-sky-400'>{current_price} $</span></p>
                    <p>Marketcap N°: <span className='text-sky-400'>{market_cap_rank}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Coins;