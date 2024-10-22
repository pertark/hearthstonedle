// biome-ignore lint/style/useImportType: needed
import * as React from 'react'
import HSCards from '../standard_cards.json'
import { Suspense, useEffect, useState, useTransition } from 'react'
import CardHover from './CardHover';

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
    const [isOpen, setOpen] = useState(0);
    // const [isOptionsOpen, setOptionsOpen] = useState(false);
    const [isPending, setTransition] = useTransition();
    
    useEffect(() => {
        function closeMenu() {
            setOpen(0);
        }
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, []);

    // debounce search
    useEffect(() => {
        const timeout = setTimeout(() => setSearch(inputField), 400);
        return () => clearTimeout(timeout);
    }, [inputField]);

    function closeMenu() {
        setOpen(0);
        // setOptionsOpen(false);
    }

    function openMenu() {
        setOpen(1);
        setTransition(() => {
            setOpen(2);
        });
    }

    function toggleOpen() {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    return (
        <div className="flex justify-center items-center flex-col gap-4">
            <input 
            type="text" 
            className='max-w-md'
            value={inputField} 
            placeholder="Search for a card..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setInputField(e.target.value);
            }}
            onClick={(e) => {e.stopPropagation();}}
            />
            {search.length > 0 ? (
                <div className='max-h-96 overflow-y-scroll flex flex-col text-left min-w-72'>
                    {
                        HSCards.filter((card: Card) => card.name.toLowerCase().includes(search.toLowerCase()))
                        .map((card: Card) => (
                            <button 
                                key={card.id}
                                type="button"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    pickCard(card); 
                                    setInputField("");
                                    setSearch("");
                                    closeMenu();
                                    e.stopPropagation(); 
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        pickCard(card);
                                        setInputField("");
                                        setSearch("");
                                        closeMenu();
                                    }
                                }}
                            >
                                <CardHover card={card}>{card.name}</CardHover>
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