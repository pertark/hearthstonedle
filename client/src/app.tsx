import * as React from 'react'
import ReactDOM from 'react-dom/client';
import Dropdown from './Dropdown';
import { useEffect, useState } from 'react'
import HSCards from '../../cards.json'
import type { Card } from './Dropdown';

function rarityIdToRarity(rarityId: number) {
    switch (rarityId) {
        case 1:
            return "Free";
        case 2:
            return "Common";
        case 3:
            return "Rare";
        case 4:
            return "Epic";
        case 5:
            return "Legendary";
        default:
            return "Unknown";
    }
}

const App = () => {

    const [guesses, setGuesses] = useState<Card[]>([]);

    const randomCard = HSCards[Math.floor(Math.random() * HSCards.length)];
    console.log(randomCard);

    function pickCard(card) {
        // if (guesses.length < 5) {
            setGuesses([...guesses, card]);

        // }
        console.log(card);
        console.log(guesses);
    }

    return (
        <div className="bg-slate-50 w-full flex flex-col h-screen">
            <h1 className="text-2xl bold text-center m-4">Hearthstonedle</h1>
            <div className="self-center w-fit">
                <Dropdown pickCard={pickCard} />
                <div 
                    className="grid grid-cols-7 border border-red-100 gap-4 text-center" 
                >
                    <div className="col-span-2">Card Name</div>
                    <div>Cost</div>
                    <div>Attack</div>
                    <div>Health</div>
                    <div>Expansion</div>
                    <div>Rarity</div>
                </div>
                {
                    guesses.map((guess) => (
                        <div 
                            className="grid grid-cols-7 border border-red-100 gap-4 text-center" 
                            key={guess.id}
                        >
                            <div className="col-span-2">{guess.name}</div>
                            {
                                guess.manaCost === randomCard.manaCost ?
                                    <div className="bg-green-100">{guess.manaCost}</div> :
                                guess.manaCost > randomCard.manaCost ?
                                    <div className="bg-red-100">↑</div> :
                                guess.manaCost < randomCard.manaCost ?
                                    <div className="bg-red-100">↓</div> :
                                    <></>
                            }
                            {/* <div>{guess.manaCost}</div> */}
                            {
                                guess.attack === randomCard.attack ?
                                    <div className="bg-green-100">{guess.attack == null ? "N/A" : guess.attack}</div> :
                                (guess.attack || 0) > (randomCard.attack || 0) ?
                                    <div className="bg-red-100">↑</div> :
                                (guess.attack || 0) < (randomCard.attack || 0) ?
                                    <div className="bg-red-100">↓</div> :
                                    <></>
                            }
                            {/* <div>{guess.attack == null ? "N/A" : guess.attack}</div> */}
                            {
                                guess.health === randomCard.health ?
                                    <div className="bg-green-100">{guess.health == null ? "N/A" : guess.health}</div> :
                                (guess.health || 0) > (randomCard.health || 0) ?
                                    <div className="bg-red-100">↑</div> :
                                (guess.health || 0) < (randomCard.health || 0) ?
                                    <div className="bg-red-100">↓</div> :
                                    <></>
                            }
                            {/* <div>{guess.health == null ? "N/A" : guess.health}</div> */}
                            {
                                guess.cardSetId === randomCard.cardSetId ?
                                    <div className="bg-green-100">{guess.cardSetId}</div> :
                                    <div className="bg-red-100">X</div>
                            }
                            {/* <div>{guess.cardSetId}</div> */}
                            {
                                guess.rarityId === randomCard.rarityId ?
                                    <div className="bg-green-100">{rarityIdToRarity(guess.rarityId)}</div> :
                                (guess.rarityId || 0) > (randomCard.rarityId || 0) ?
                                    <div className="bg-red-100">↑</div> :
                                (guess.rarityId || 0) < (randomCard.rarityId || 0) ?
                                    <div className="bg-red-100">↓</div> :
                                    <></>
                            }
                            {/* <div>{guess.rarityId == null ? "N/A" : guess.rarityId}</div> */}
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