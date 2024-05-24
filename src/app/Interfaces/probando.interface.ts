export interface Orden {
    ordenId:       number;
    precioTotal:   number;
    hecho:         boolean;
    cliente:       Cliente;
    empleado:      Empleado;
    detallesOrden: DetallesOrden[];
    fechaorden:    Date;
}

export interface Cliente {
    telf:       number;
    nom_cli:    string;
    direccion:  string;
    comentario: string;
}

export interface DetallesOrden {
    detalleId:      number;
    ordenId:        number;
    prodId:         number;
    cantidad:       number;
    producto:       Producto;
    precioProducto: number;
}

export interface Producto {
    prodId:  number;
    nomProd: string;
    precio:  number;
}

export interface Empleado {
    emplId:       number;
    codigo:       number;
    nomEmpl:      string;
    apellidoEmpl: string;
}
