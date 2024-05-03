export interface PLC {
    reg:      number;
    oldValue: number;
    newValue: number;
}
export interface PlC2 {
    classname: string;
    message:   string;
}

export interface PLC3 {
    reg: number;
    values:  number[];
}

export interface PLCList {
    plc: PLC[];

}
