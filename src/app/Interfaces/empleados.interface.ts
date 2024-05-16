export interface Orden {
    ordenId:       number;
    precioTotal:   number;
    hecho:         boolean;
    cliente:       Cliente;
    empleado:      Empleado;
    detallesOrden: any[];
    fechaorden:    Date;
}

export interface Empleado {
    emplId:       number;
    codigo:       number;
    nomEmpl:      string;
    apellidoEmpl: string;
    ordenes?:     Orden[];
}

export interface Cliente {
    telf:       number;
    nom_cli:    string;
    direccion:  string;
    comentario: null | string;
}
