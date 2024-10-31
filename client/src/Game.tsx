import * as React from 'react'
import Dropdown from './Dropdown';
import { useEffect, useState } from 'react'
import type { Card } from './Dropdown';
import CardHover from './CardHover';
import { classIdToClass, cardSetIdToExpansion, rarityIdToRarity, rarityIdToRarityOrdering } from './util';

const Game = ({ iteration, targetCard }) => {
    const [guesses, setGuesses] = useState<Card[]>([]);
    const [won, setWon] = useState(false);

    function pickCard(card: Card) {
        setGuesses([...guesses, card]);
        if (card.id === targetCard.id) {
            setWon(true);
        }
    }

    function generateShare() {
        let share = "";
        for (const guess of guesses) {
            share += (guess.classId === targetCard.classId) ? "🟩" : "🟥";
            share += (guess.manaCost === targetCard.manaCost) ? "🟩" : "🟥";
            share += (guess.attack === targetCard.attack) ? "🟩" : "🟥";
            share += (guess.health === targetCard.health) ? "🟩" : "🟥";
            share += (guess.cardSetId === targetCard.cardSetId) ? "🟩" : "🟥";
            share += (guess.rarityId === targetCard.rarityId) ? "🟩" : "🟥";
            share += "\n";
        }

        function onShareClick(e) {
            navigator.clipboard.writeText(`Hearthstonedle #${iteration}\n${share}https://hsdle.com`);
            e.target.innerText = "Copied!";
            setTimeout(() => {e.target.innerText = "Share"}, 1000);
        }
        return (
            <div className="text-center px-4 whitespace-pre-line mb-4">
                { share } 
                <button type="button" className="border-2 px-2 border-black rounded-md mt-2" onClick={onShareClick}>Share</button>
            </div>
        )
    }

    return (
        <div className={`self-center w-fit pb-8 ${won ? "border-4 border-green-300" : ""}`}>
            {
                won ?
                    <div>
                        <div className="text-center p-4">You won in {guesses.length}!</div>
                        <div className="text-center px-4">Share your score!</div>
                        { generateShare() }
                    </div>:
                    <Dropdown pickCard={pickCard} />
            }
            <table>
                <tr
                    className="text-center border-b-2 border-black mt-4 "
                >
                    <th className="px-2">Card Name</th>
                    <th className="px-2">Class</th>
                    <th className="px-2">Cost</th>
                    <th className="px-2">Attack</th>
                    <th className="px-2">Health</th>
                    <th className="px-2">Expansion</th>
                    <th className="px-2">Rarity</th>
                </tr>
                {
                    guesses.map((guess) => (
                        <tr
                            className="border-t border-black text-center [&>*]:px-2"
                            key={guess.id}
                        >
                            <td>
                                <CardHover card={guess}>
                                    {guess.name}
                                </CardHover>
                            </td>
                            {
                                guess.classId === targetCard.classId ?
                                    <td className="bg-green-100">{classIdToClass(guess.classId)}</td> :
                                    <td className="bg-red-100">{classIdToClass(guess.classId)}</td>
                            }
                            {
                                guess.manaCost === targetCard.manaCost ?
                                    <td className="bg-green-100">{guess.manaCost}</td> :
                                guess.manaCost < targetCard.manaCost ?
                                    <td className="bg-red-100">{guess.manaCost}{targetCard.manaCost == null ? " X" : " ↑"}</td> :
                                guess.manaCost > targetCard.manaCost ?
                                    <td className="bg-red-100">{guess.manaCost}{" ↓"}</td> :
                                    <td className="bg-red-100">{guess.manaCost}{" X"}</td>
                            }
                            {
                                guess.attack === targetCard.attack ?
                                    <td className="bg-green-100">{guess.attack == null ? "N/A" : guess.attack}</td> :
                                (guess.attack || 0) < (targetCard.attack || 0) ?
                                    <td className="bg-red-100">{guess.attack == null ? "N/A" : guess.attack}{targetCard.attack == null ? " X" : " ↑"}</td> :
                                (guess.attack || 0) > (targetCard.attack || 0) ?
                                    <td className="bg-red-100">{guess.attack == null ? "N/A" : guess.attack}{" ↓"}</td> :
                                    <td className="bg-red-100">{guess.attack == null ? "N/A" : guess.attack}{" X"}</td>
                            }
                            {
                                guess.health === targetCard.health ?
                                    <td className="bg-green-100">{guess.health == null ? "N/A" : guess.health}</td> :
                                (guess.health || 0) < (targetCard.health || 0) ?
                                    <td className="bg-red-100">{guess.health == null ? "N/A" : guess.health}{targetCard.health == null ? " X" : " ↑"}</td> :
                                (guess.health || 0) > (targetCard.health || 0) ?
                                    <td className="bg-red-100">{guess.health == null ? "N/A" : guess.health}{" ↓"}</td> :
                                    <td className="bg-red-100">{guess.health == null ? "N/A" : guess.health}{" X"}</td>
                            }
                            {
                                guess.cardSetId === targetCard.cardSetId ?
                                    <td className="bg-green-100">{cardSetIdToExpansion(guess.cardSetId)}</td> :
                                    <td className="bg-red-100">{cardSetIdToExpansion(guess.cardSetId)}</td>
                            }
                            {
                                guess.rarityId === targetCard.rarityId ?
                                    <td className="bg-green-100">{rarityIdToRarity(guess.rarityId)}</td> :
                                rarityIdToRarityOrdering(guess.rarityId || 0) < rarityIdToRarityOrdering(targetCard.rarityId || 0) ?
                                    <td className="bg-red-100">{rarityIdToRarity(guess.rarityId)}{" ↑"}</td> :
                                rarityIdToRarityOrdering(guess.rarityId || 0) > rarityIdToRarityOrdering(targetCard.rarityId || 0) ?
                                    <td className="bg-red-100">{rarityIdToRarity(guess.rarityId)}{" ↓"}</td> :
                                    <td className="bg-red-100">{rarityIdToRarity(guess.rarityId)}{" X"}</td>
                            }
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default Game;