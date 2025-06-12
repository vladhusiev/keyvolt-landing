export interface FormData {
    power: string;
    place: 'default' | 'zemlya';
    tarif: string;
    region: string;
}

export interface CalculationResults {
    power: number;
    price: string;
    year_generation: string;
    econom: string;
    ocupnost: string;
}

export interface Region {
    name: string;
    amount: number;
}

export interface Regions {
    [key: string]: Region;
} 