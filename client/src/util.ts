function rarityIdToRarity(rarityId: number) {
    switch (rarityId) {
        case 1:
            return "Common";
        case 2:
            return "Free";
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

function rarityIdToRarityOrdering(rarityId: number) {
    switch (rarityId) {
        case 1:
            return 1;
        case 2:
            return 0;
        case 3:
            return 2;
        case 4:
            return 3;
        case 5:
            return 4;
        default:
            return -1;
    }
}

function classIdToClass(classId: number) {
    switch (classId) {
        case 1:
            return "Death Knight";
        case 2:
            return "Druid";
        case 3:
            return "Hunter";
        case 4:
            return "Mage";
        case 5:
            return "Paladin";
        case 6:
            return "Priest";
        case 7:
            return "Rogue";
        case 8:
            return "Shaman";
        case 9:
            return "Warlock";
        case 10:
            return "Warrior";
        case 12:
            return "Neutral";
        default:
            return "Unknown";
    }
}

function cardSetIdToExpansion(cardSetId: number) {
    /*
3 - Legacy
12 - naxx
13 - gvg
14 - blackrock
15 - grand tournament
17 - Hero Skins
20 - league of explorers
21 - whispers
23 - karazhan
25 - mean streets
27 - un'goro
1001 - koft
1004 - kobolds
1125 - witchwood
1127 - boomsday
1129 - rastakhans
1130 - rise of shadows
1158 - saviors of uldum
1347 - dod
1403 - galakrond's awakening
1414 - ashes of outland
1443 - scholomance
1463 - demon hunter initiates
1466 - darkmoon faire
1525 - forged in the barrens
1578 - UiS
1626, alterac valley
1635, Legacy
1637, Core
1646, Classic
1658, voyage
1691, nathria
1776, march of the lich king
1809, Festival of legends
1858, titans
1869, path of arthas
1892, badlands
1897, whisbang
1898, caverns of time
1905, perils in paradise
1935, the great dark beyond
1941 "gift"
*/
    switch (cardSetId) {
        case 3:
            return "Legacy";
        case 12:
            return "Curse of Naxxramas";
        case 13:
            return "Goblins vs Gnomes";
        case 14:
            return "Blackrock Mountain";
        case 15:
            return "The Grand Tournament";
        case 17:
            return "Hero Skins";
        case 20:
            return "The League of Explorers";
        case 21:
            return "Whispers of the Old Gods";
        case 23:
            return "One Night in Karazhan";
        case 25:
            return "Mean Streets of Gadgetzan";
        case 27:
            return "Journey to Un'Goro";
        case 1001:
            return "Knights of the Frozen Throne";
        case 1004:
            return "Kobolds & Catacombs";
        case 1125:
            return "The Witchwood";
        case 1127:
            return "The Boomsday Project";
        case 1129:
            return "Rastakhan's Rumble";
        case 1130:
            return "Rise of Shadows";
        case 1158:
            return "Saviors of Uldum";
        case 1347:
            return "Descent of Dragons";
        case 1403:
            return "Galakrond's Awakening";
        case 1414:
            return "Ashes of Outland";
        case 1443:
            return "Scholomance Academy";
        case 1463:
            return "Demon Hunter Initiate";
        case 1466:
            return "Madness at the Darkmoon Faire";
        case 1525:
            return "Forged in the Barrens";
        case 1578:
            return "United in Stormwind";
        case 1626:
            return "Fractured in Alterac Valley";
        case 1635:
            return "Legacy";
        case 1637:
            return "Core";
        case 1646:
            return "Classic";
        case 1658:
            return "Voyage to the Sunken City";
        case 1691:
            return "Murder at Castle Nathria";
        case 1776:
            return "March of the Lich King";
        case 1809:
            return "Festival of Legends";
        case 1858:
            return "TITANS";
        case 1869:
            return "Path of Arthas";
        case 1892:
            return "Showdown in the Badlands";
        case 1897: 
            return "Whisbang's Workshop";
        case 1898:
            return "Caverns of Time";
        case 1905:
            return "Perils in Paradise";
        case 1941:
            return "Gift"
        default:
            return "Unknown"
    }
}

export { rarityIdToRarityOrdering, rarityIdToRarity, classIdToClass, cardSetIdToExpansion };