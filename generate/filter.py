import json
from collections import defaultdict

with open("cards.json", encoding="utf-8") as f:
    cards = json.load(f)

id_to_expac = {
    3: "Legacy",
    12: "Curse of Naxxramas",
    13: "Goblins vs Gnomes",
    14: "Blackrock Mountain",
    15: "The Grand Tournament",
    17: "Hero Skins",
    20: "The League of Explorers",
    21: "Whispers of the Old Gods",
    23: "One Night in Karazhan",
    25: "Mean Streets of Gadgetzan",
    27: "Journey to Un'Goro",
    1001: "Knights of the Frozen Throne",
    1004: "Kobolds & Catacombs",
    1125: "The Witchwood",
    1127: "The Boomsday Project",
    1129: "Rastakhan's Rumble",
    1130: "Rise of Shadows",
    1158: "Saviors of Uldum",
    1347: "Descent of Dragons",
    1403: "Galakrond's Awakening",
    1414: "Ashes of Outland",
    1443: "Scholomance Academy",
    1463: "Demon Hunter Initiate",
    1466: "Madness at the Darkmoon Faire",
    1525: "Forged in the Barrens",
    1578: "United in Stormwind",
    1626: "Fractured in Alterac Valley",
    1635: "Legacy",
    1637: "Core",
    1646: "Classic",
    1658: "Voyage to the Sunken City",
    1691: "Murder at Castle Nathria",
    1776: "March of the Lich King",
    1809: "Festival of Legends",
    1858: "TITANS",
    1869: "Path of Arthas",
    1892: "Showdown in the Badlands",
    1897: "Whisbang's Workshop",
    1898: "Caverns of Time",
    1905: "Perils in Paradise",
    1941: "Gift"
}

standard_sets = [
    e_id for e_id, name in id_to_expac.items() if name in [
        "TITANS",
        "Festival of Legends",
        "March of the Lich King",
        "Path of Arthas",
        "Murder at Castle Nathria",
        "Voyage to the Sunken City",
        "Core"
    ]
]

standard_cards = [card for card in cards if card["cardSetId"] in standard_sets]
print("No. standard cards:", len(standard_cards))

# find cards in multiple sets
card_expacs = defaultdict(set)
for card in standard_cards:
    card_expacs[card["name"]].add(card["cardSetId"])

duplicates = {name: list(sets) for name, sets in card_expacs.items() if len(sets) > 1}
print("Number of duplicates:", len(duplicates))

# filter out all core set duplicates
standard_cards = list(filter(lambda card: not (card["name"] in duplicates and card["cardSetId"]) == 1637, standard_cards))

with open("standard_cards.json", "w", encoding="utf-8") as f:
    json.dump(standard_cards, f)
