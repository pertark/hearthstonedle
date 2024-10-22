import * as React from 'react'
import ReactDOM from 'react-dom/client';
import Dropdown from './Dropdown';
import { useEffect, useState } from 'react'
import HSCards from '../standard_cards.json'
import type { Card } from './Dropdown';
import CardHover from './CardHover';
import { classIdToClass, cardSetIdToExpansion, rarityIdToRarity, rarityIdToRarityOrdering } from './util';

const App = () => {

    const [guesses, setGuesses] = useState<Card[]>([]);
    const [won, setWon] = useState(false);
    const [randomCard, setRandomCard] = useState<Card>(HSCards[Math.floor(Math.random() * HSCards.length)]);
    console.log("random card", randomCard);

    function pickCard(card: Card) {
        setGuesses([...guesses, card]);
        console.log("current guesses", guesses);
        if (card.id === randomCard.id) {
            setWon(true);
        }
    }

    return (
        <div className="bg-slate-50 w-full flex flex-col h-screen">
            <h1 className="text-2xl bold text-center m-4">Hearthstonedle</h1>
            {/* TODO: help/how to play */}
            <div className={`self-center w-fit px-4 pb-8 ${won ? "border-4 border-green-300" : ""}`}>
                {
                    won ?
                    // TODO: share feature and wordle graph
                        <div className="text-center p-4">You won in {guesses.length}!</div> :
                        <Dropdown pickCard={pickCard} />
                }
                <div 
                    className="grid grid-cols-9 gap-4 text-center font-semibold border-b-2 border-black mt-4" 
                >
                    <div className="col-span-2">Card Name</div>
                    <div>Class</div>
                    <div>Cost</div>
                    <div>Attack</div>
                    <div>Health</div>
                    <div className="col-span-2">Expansion</div>
                    <div>Rarity</div>
                </div>
                {
                    guesses.map((guess) => (
                        <div 
                            className="grid grid-cols-9 border-t border-black gap-4 text-center" 
                            key={guess.id}
                        >
                            <div className="col-span-2">
                                <CardHover card={guess}>
                                    {guess.name}
                                </CardHover>
                            </div>
                            {
                                guess.classId === randomCard.classId ?
                                    <div className="bg-green-100">{classIdToClass(guess.classId)}</div> :
                                    <div className="bg-red-100">{classIdToClass(guess.classId)}</div>
                            }
                            {
                                guess.manaCost === randomCard.manaCost ?
                                    <div className="bg-green-100">{guess.manaCost}</div> :
                                guess.manaCost < randomCard.manaCost ?
                                    <div className="bg-red-100">{guess.manaCost}{randomCard.manaCost == null ? " X" : " ↑"}</div> :
                                guess.manaCost > randomCard.manaCost ?
                                    <div className="bg-red-100">{guess.manaCost}{" ↓"}</div> :
                                    <div className="bg-red-100">{guess.manaCost}{" X"}</div>
                            }
                            {
                                guess.attack === randomCard.attack ?
                                    <div className="bg-green-100">{guess.attack == null ? "N/A" : guess.attack}</div> :
                                (guess.attack || 0) < (randomCard.attack || 0) ?
                                    <div className="bg-red-100">{guess.attack == null ? "N/A" : guess.attack}{randomCard.attack == null ? " X" : " ↑"}</div> :
                                (guess.attack || 0) > (randomCard.attack || 0) ?
                                    <div className="bg-red-100">{guess.attack == null ? "N/A" : guess.attack}{" ↓"}</div> :
                                    <div className="bg-red-100">{guess.attack == null ? "N/A" : guess.attack}{" X"}</div>
                            }
                            {
                                guess.health === randomCard.health ?
                                    <div className="bg-green-100">{guess.health == null ? "N/A" : guess.health}</div> :
                                (guess.health || 0) < (randomCard.health || 0) ?
                                    <div className="bg-red-100">{guess.health == null ? "N/A" : guess.health}{randomCard.health == null ? " X" : " ↑"}</div> :
                                (guess.health || 0) > (randomCard.health || 0) ?
                                    <div className="bg-red-100">{guess.health == null ? "N/A" : guess.health}{" ↓"}</div> :
                                    <div className="bg-red-100">{guess.health == null ? "N/A" : guess.health}{" X"}</div>
                            }
                            {
                                guess.cardSetId === randomCard.cardSetId ?
                                    <div className="bg-green-100 col-span-2">{cardSetIdToExpansion(guess.cardSetId)}</div> :
                                    <div className="bg-red-100 col-span-2">{cardSetIdToExpansion(guess.cardSetId)}</div>
                            }
                            {
                                guess.rarityId === randomCard.rarityId ?
                                    <div className="bg-green-100">{rarityIdToRarity(guess.rarityId)}</div> :
                                rarityIdToRarityOrdering(guess.rarityId || 0) < rarityIdToRarityOrdering(randomCard.rarityId || 0) ?
                                    <div className="bg-red-100">{rarityIdToRarity(guess.rarityId)}{" ↑"}</div> :
                                rarityIdToRarityOrdering(guess.rarityId || 0) > rarityIdToRarityOrdering(randomCard.rarityId || 0) ?
                                    <div className="bg-red-100">{rarityIdToRarity(guess.rarityId)}{" ↓"}</div> :
                                    <div className="bg-red-100">{rarityIdToRarity(guess.rarityId)}{" X"}</div>
                            }
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
