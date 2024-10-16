// biome-ignore lint/style/useImportType: needed
import * as React from 'react'
import HSCards from '../../cards.json'
import { useEffect, useState } from 'react'

type Card = {
    id: number;
    collectible: number;
    slug: string;
    classId: number;
    multiClassIds: number[];
    minionTypeId?: number;
    cardTypeId: number;
    cardSetId: number;
    rarityId: number;
    artistName: string;
    health?: number;
    attack?: number;
    manaCost: number;
    name: string;
    text: string;
    image: string;
    imageGold: string;
    flavorText: string;
    cropImage: string | null;
    keywordIds?: number[];
    isZilliaxFunctionalModule: boolean;
    isZilliaxCosmeticModule: boolean;
};

type DropdownProps = {
    pickCard: (selection: Card) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ pickCard }) => {
    const [search, setSearch] = useState("");
    const [inputField, setInputField] = useState("");
    const [isOpen, setOpen] = useState(false);
    
    useEffect(() => {
        function toggleOpen() {
            setOpen(false);
        }
        document.addEventListener("click", toggleOpen);
        return () => document.removeEventListener("click", toggleOpen);
    }, []);

    // debounce search
    useEffect(() => {
        const timeout = setTimeout(() => setSearch(inputField), 400);
        return () => clearTimeout(timeout);
    }, [inputField]);

    return (
        <div className="self-center">
            <input 
            type="text" 
            value={inputField} 
            placeholder="Search for a card..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setInputField(e.target.value);
            }}
            onClick={(e) => {setOpen(!isOpen); e.stopPropagation();}}
            />
            {isOpen ? (
                <div className='max-h-96 overflow-y-scroll flex flex-col text-left'>
                    {
                        HSCards.filter((card) => card.name.toLowerCase().includes(search.toLowerCase()))
                        .map((card) => (
                            <button 
                                key={card.id}
                                type="button"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    pickCard(card); 
                                    setInputField("");
                                    setSearch("");
                                    setOpen(false); 
                                    e.stopPropagation(); 
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        pickCard(card);
                                        setInputField("");
                                        setSearch("");
                                        setOpen(false);
                                    }
                                }}
                            >
                                {card.name}
                            </button>
                        ))
                    }
                </div>
            ) : <div /> }
        </div>
    )
}

export default Dropdown;
export type { Card };