// pages/Home.tsx
import React from 'react';
import blackjack from '../assets/images/blackjack.jpg';
import roulette from '../assets/images/roulette.jpg';
import machine from '../assets/images/machine.jpg';

function Home() {
  return (
    <div className="min-h-screen bg-[#FCF5ED] flex flex-col items-center justify-center">
      <section className="text-center p-10">
        <h1 className="text-4xl font-bold text-[#1F1717]">Master Your Game, Master Your Fortune</h1>
        <p className="text-2xl mt-2 text-[#CE5A67]">Experience Premium Gaming</p>
        <button className="mt-4 bg-[#F4BF96] text-white font-bold py-2 px-8 rounded hover:bg-[#CE5A67] transition-all duration-300 ease-in-out transform hover:scale-105">Start Your Journey</button>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-lg font-bold">Luxury Gambling Experience</h3>
          <p>Premium high-stakes action</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-lg font-bold">24/7 Support</h3>
          <p>Always ready to assist</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-lg font-bold">Current Jackpots</h3>
          <p>Win big with progressive jackpots</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-lg font-bold">Customer Rating</h3>
          <p>4.92 based on 1,200 reviews</p>
        </div>
      </div>
      <section className="w-full p-4">
        <h2 className="text-2xl font-bold text-center text-[#1F1717]">Featured Games</h2>
        <div className="flex justify-around flex-wrap">
          <div className="bg-white p-4 shadow-lg rounded-lg m-2 transition-all duration-300 hover:shadow-2xl">
            <img src={blackjack} alt="Blackjack" className="h-40 w-full object-cover rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out"/>
            <h3 className="text-center mt-2">Blackjack</h3>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg m-2 transition-all duration-300 hover:shadow-2xl">
            <img src={roulette} alt="Roulette" className="h-40 w-full object-cover rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out"/>
            <h3 className="text-center mt-2">Roulette</h3>
          </div>
          <div className="bg-white p-4 shadow-lg rounded-lg m-2 transition-all duration-300 hover:shadow-2xl">
            <img src={machine} alt="Slot Machine" className="h-40 w-full object-cover rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out"/>
            <h3 className="text-center mt-2">Slot Machine</h3>
          </div>
        </div>
      </section>
      <footer className="w-full bg-[#1F1717] text-white text-center p-4 mt-auto">
        CASYN © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default Home;
