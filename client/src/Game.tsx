import * as React from 'react'
import Dropdown from './Dropdown';
import { useEffect, useState } from 'react'
import type { Card } from './Dropdown';
import CardHover from './CardHover';
import { classIdToClass, cardSetIdToExpansion, rarityIdToRarity, rarityIdToRarityOrdering } from './util';

const Game = ({ targetCard }) => {
    const [guesses, setGuesses] = useState<Card[]>([]);
    const [won, setWon] = useState(false);
    // const [targetCard, setTargetCard] = useState<Card>(HSCards[Math.floor(Math.random() * HSCards.length)]);

    function pickCard(card: Card) {
        setGuesses([...guesses, card]);
        if (card.id === targetCard.id) {
            setWon(true);
        }
    }

    return (
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
                            guess.classId === targetCard.classId ?
                                <div className="bg-green-100">{classIdToClass(guess.classId)}</div> :
                                <div className="bg-red-100">{classIdToClass(guess.classId)}</div>
                        }
                        {
                            guess.manaCost === targetCard.manaCost ?
                                <div className="bg-green-100">{guess.manaCost}</div> :
                            guess.manaCost < targetCard.manaCost ?
                                <div className="bg-red-100">{guess.manaCost}{targetCard.manaCost == null ? " X" : " ↑"}</div> :
                            guess.manaCost > targetCard.manaCost ?
                                <div className="bg-red-100">{guess.manaCost}{" ↓"}</div> :
                                <div className="bg-red-100">{guess.manaCost}{" X"}</div>
                        }
                        {
                            guess.attack === targetCard.attack ?
                                <div className="bg-green-100">{guess.attack == null ? "N/A" : guess.attack}</div> :
                            (guess.attack || 0) < (targetCard.attack || 0) ?
                                <div className="bg-red-100">{guess.attack == null ? "N/A" : guess.attack}{targetCard.attack == null ? " X" : " ↑"}</div> :
                            (guess.attack || 0) > (targetCard.attack || 0) ?
                                <div className="bg-red-100">{guess.attack == null ? "N/A" : guess.attack}{" ↓"}</div> :
                                <div className="bg-red-100">{guess.attack == null ? "N/A" : guess.attack}{" X"}</div>
                        }
                        {
                            guess.health === targetCard.health ?
                                <div className="bg-green-100">{guess.health == null ? "N/A" : guess.health}</div> :
                            (guess.health || 0) < (targetCard.health || 0) ?
                                <div className="bg-red-100">{guess.health == null ? "N/A" : guess.health}{targetCard.health == null ? " X" : " ↑"}</div> :
                            (guess.health || 0) > (targetCard.health || 0) ?
                                <div className="bg-red-100">{guess.health == null ? "N/A" : guess.health}{" ↓"}</div> :
                                <div className="bg-red-100">{guess.health == null ? "N/A" : guess.health}{" X"}</div>
                        }
                        {
                            guess.cardSetId === targetCard.cardSetId ?
                                <div className="bg-green-100 col-span-2">{cardSetIdToExpansion(guess.cardSetId)}</div> :
                                <div className="bg-red-100 col-span-2">{cardSetIdToExpansion(guess.cardSetId)}</div>
                        }
                        {
                            guess.rarityId === targetCard.rarityId ?
                                <div className="bg-green-100">{rarityIdToRarity(guess.rarityId)}</div> :
                            rarityIdToRarityOrdering(guess.rarityId || 0) < rarityIdToRarityOrdering(targetCard.rarityId || 0) ?
                                <div className="bg-red-100">{rarityIdToRarity(guess.rarityId)}{" ↑"}</div> :
                            rarityIdToRarityOrdering(guess.rarityId || 0) > rarityIdToRarityOrdering(targetCard.rarityId || 0) ?
                                <div className="bg-red-100">{rarityIdToRarity(guess.rarityId)}{" ↓"}</div> :
                                <div className="bg-red-100">{rarityIdToRarity(guess.rarityId)}{" X"}</div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Game;