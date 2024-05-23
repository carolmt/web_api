export interface Orden {
    ordenId:       number;
    precioTotal:   number;
    hecho:         boolean;
    cliente:       Cliente;
    empleado:      Empleado;
    detallesOrden: DetallesOrden[];
    fechaorden:    Date;
}

export interface OrdenInfo {
    ordenId: number;
    precioTotal: number;
    hecho: boolean;
    cliente: Cliente;
    empleado: Empleado;
    detallesOrden: DetallesInfo[];
    fechaorden: Date;
}

export interface CreateOrder {
    cliente:       ClienteOrder;
    empleado:      EmpleadoOrder;
    detallesOrden: DetallesOrden[];
}

export interface ClienteOrder {
    telf: number;
}

export interface Empleado {
    emplId:       number;
    codigo:       number;
    nomEmpl:      string;
    apellidoEmpl: string;
    ordenes?:     Orden[];
}

export interface EmpleadoOrder {
    emplId: number;

}

export interface Cliente {
    telf:       number;
    nom_cli:    string;
    direccion:  string;
    comentario: null | string;
}

export interface OldClient {
    telf: number;
}

export interface Categoria {
    catId:     number;
    nomCat:    string;
    productos: Producto[];
}

export interface Producto {
    prodId:        number;
    nomProd:       string;
    precio:        number;
    detallesOrden: DetallesOrden[];
}

export interface DetallesOrden {
    producto:  ProductoOrder;
    cantidad:  number;
    orden:     OrdenOder;
}

export interface DetallesInfo {
    detalleId: number;
    producto: Producto;
}


export interface ProductoOrder {
    prodId: number;
    precio: number;
}

export interface OrdenOder  {
    ordenId: number;
}
