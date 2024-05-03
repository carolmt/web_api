export interface PLC {
    reg:      number;
    values:  number[];
    oldValue: number;
    newValue: number;
}
export interface PlC2 {
    classname: string;
    message:   string;
}

export interface PLCList {
    plc: PLC[];

}
