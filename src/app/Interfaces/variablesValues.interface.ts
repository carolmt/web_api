export interface Variable {
    name:  string;
    value: string;
}

export interface ChargeFile {
    file: string;
    copies: number;
    vars: Variable[];
}

export interface List {
    file: string;
    vars: Variable[];
}

