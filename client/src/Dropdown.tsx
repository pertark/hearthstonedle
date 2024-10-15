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
    selection: string;
    setSelection: (selection: Card) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ selection, setSelection }) => {
    const [search, setSearch] = useState("");
    const [isOpen, setOpen] = useState(false);
    
    const searchVal = () => {
        if (selection) return selection;
        return search;
    }

    useEffect(() => {
        function toggleOpen() {
            setOpen(!isOpen);
        }
        document.addEventListener("click", toggleOpen);
        return () => document.removeEventListener("click", toggleOpen);
    }, [isOpen]);

    return (
        <div>
            <input 
            type="text" 
            value={searchVal()} 
            placeholder="Search for a card..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setSearch(e.target.value);
            }}
            onClick={() => setOpen(!isOpen)}
            onFocus={() => setOpen(true)}
            />
            {isOpen && (
                <div className='max-h-24 overflow-y-scroll flex flex-col text-left'>
                    {
                        HSCards.filter((card) => card.name.toLowerCase().includes(search.toLowerCase()))
                        .map((card) => (
                            <button 
                                key={card.id}
                                type="button"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {setSelection(card); setOpen(false); e.stopPropagation(); }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setSelection(card);
                                        setOpen(false);
                                    }
                                }}
                            >
                                {card.name}
                            </button>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default Dropdown;
export type { Card };