// Constants
const PLACE_COEFFICIENT = {
    zemlya: 700,
    default: 600
};

const RATE_USD = 37.8;

// Helper function to convert month number to year and month format
function monthToYear(months) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years} р. ${remainingMonths} міс.`;
}

// Month coefficients data
const MONTH_COEFFICIENTS = {
    1: 0.031040,
    2: 0.044400,
    3: 0.084800,
    4: 0.109560,
    5: 0.129630,
    6: 0.136185,
    7: 0.137370,
    8: 0.121299,
    9: 0.091953,
    10: 0.062201,
    11: 0.028836,
    12: 0.022790
};

// Regions data
const REGIONS = {
    vinnitsa: {
        name: 'Вінницька обл.',
        amount: 1083.58
    },
    volin: {
        name: 'Волинська обл.',
        amount: 1041.08
    },
    dnipro: {
        name: 'Дніпропетровська обл.',
        amount: 1132.2
    },
    zhitomir: {
        name: 'Житомирська обл.',
        amount: 1060.545
    },
    zakarp: {
        name: 'Закарпатська обл.',
        amount: 1105
    },
    zaporizha: {
        name: 'Запорізька обл.',
        amount: 1165.435
    },
    'ivano-frankivsk': {
        name: 'Івано-Франківська обл.',
        amount: 1057.4
    },
    kiev: {
        name: 'Київська обл.',
        amount: 1065.985
    },
    kirovohrad: {
        name: 'Кіровоградська обл.',
        amount: 1107.55
    },
    lviv: {
        name: 'Львівська обл.',
        amount: 989.23
    },
    mikolaiv: {
        name: 'Миколаївська обл.',
        amount: 1217.285
    },
    odesa: {
        name: 'Одеська обл.',
        amount: 1242.02
    },
    poltava: {
        name: 'Полтавська обл.',
        amount: 1104.32
    },
    rivne: {
        name: 'Рівненська обл.',
        amount: 1042.865
    },
    summi: {
        name: 'Сумська обл.',
        amount: 1053.915
    },
    ternopil: {
        name: 'Тернопільська обл.',
        amount: 1037.425
    },
    kharkiv: {
        name: 'Харківська обл.',
        amount: 1084.6
    },
    kherson: {
        name: 'Херсонська обл.',
        amount: 1241.85
    },
    hmelnitsk: {
        name: 'Хмельницька обл.',
        amount: 1052.045
    },
    cherkasy: {
        name: 'Черкаська обл.',
        amount: 1105.425
    },
    chernivci: {
        name: 'Чернівецька обл.',
        amount: 1094.205
    },
    chernigiv: {
        name: 'Чернігівська обл.',
        amount: 1053.065
    }
};

// Main calculation function
function calculateSolarSystem(params) {
    const {
        power = 0,
        place = 'default',
        tarif = 0,
        region
    } = params;

    // Convert power and tarif to numbers, replacing comma with dot
    const powerNum = typeof power === 'string' ? parseFloat(power.replace(',', '.')) : power;
    const tarifNum = typeof tarif === 'string' ? parseFloat(tarif.replace(',', '.')) : tarif;

    // Get place coefficient
    const placeCof = PLACE_COEFFICIENT[place] || PLACE_COEFFICIENT.default;

    // Calculate initial price
    const price = powerNum * placeCof * RATE_USD;

    // Calculate yearly and monthly generation
    const yearGeneration = powerNum * REGIONS[region].amount;
    // const monthGeneration = yearGeneration / 12;

    let profit = 0;
    let monthIter = 0;
    let ocupnost = 0;

    // Calculate profit and payback period for 10 years
    for (let y = 1; y <= 10; y++) {
        for (let i = 1; i <= 12; i++) {
            monthIter++;

            const generate = yearGeneration * MONTH_COEFFICIENTS[i];
            const monthProfit = generate * tarifNum;
            profit += monthProfit;

            if (ocupnost === 0 && price <= profit) {
                ocupnost = monthIter;
            }
        }
    }

    // Return formatted results
    return {
        power: Math.round(powerNum),
        price: Math.round(price).toLocaleString('en-US'),
        year_generation: Math.round(yearGeneration).toLocaleString('en-US'),
        econom: Math.round(profit / 10).toLocaleString('en-US'),
        ocupnost: monthToYear(ocupnost)
    };
}

// Example usage:
/*
const result = calculateSolarSystem({
    power: 10,
    place: 'zemlya',
    tarif: 0.5,
    region: 'kyiv',
    regions: {
        kyiv: { amount: 1200 }
    },
    monthCof: {
        1: 0.3,
        2: 0.4,
        // ... other months
    }
});
*/

export { calculateSolarSystem, REGIONS };
