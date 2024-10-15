import * as React from 'react'
import ReactDOM from 'react-dom/client';
import Dropdown from './Dropdown';
import { useEffect, useState } from 'react'
import HSCards from '../../cards.json'
import type { Card } from './Dropdown';

const App = () => {
    const [selection, setSelection] = useState(""); 

    const [guesses, setGuesses] = useState<Card[]>([]);

    function pickCard(card) {
        setSelection(card.name);
        if (guesses.length < 5) {
            setGuesses([...guesses, card]);
        }
        console.log(card);
    }

    return (
        <div className="bg-slate-50 w-full flex flex-col h-screen">
            <h1 className="text-2xl bold text-center m-4">Hearthstonedle</h1>
            <div className="self-center w-fit">
                <Dropdown selection={selection} setSelection={pickCard} />
                {
                    guesses.map((guess) => (
                        <div 
                            className="flex flex-row" 
                            key={guess.id}
                        >
                            <div>{guess.name}</div>
                            <div>{guess.manaCost}</div>
                            <div>{guess.attack}</div>
                            <div>{guess.health}</div>
                            <div>{guess.cardSetId}</div>
                            <div>{guess.rarityId}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found");
}