import * as React from 'react'
import ReactDOM from 'react-dom/client';
import Game from './Game';
import { useEffect, useState } from 'react'

const api = "/api"

function App() {
    const [iteration, setIteration] = useState(0);
    const [targetCard, setTargetCard] = useState(null);
    useEffect(() => {
        // dev
        // import('../standard_cards.json').then((HSCards) => HSCards[Math.floor(Math.random() * HSCards.length)]).then((card) => {
        //     console.log(card);
        //     setTargetCard(card);
        //     setIteration(1);
        // }); return;
        fetch(`${api}/daily`)
            .then((res) => res.json())
            .then((data) => {
                setIteration(data[0]);
                setTargetCard(data[1]);
            });
    }, [])
    return (
        <div className="bg-slate-50 w-full flex flex-col h-screen">
            <h1 className="text-2xl bold text-center m-4">Hearthstonedle{ !!iteration && ` #${iteration}`}</h1>
            {/* TODO: help/how to play */}
            {
                targetCard ?
                    <Game iteration={iteration} targetCard={targetCard} /> :
                    <div className="text-center">Loading...</div>
            }
        </div>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found");
}
