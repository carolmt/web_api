# PROYECTO FINAL DE CICLO DAM - SISTEMA DE PEDIDOS

Este proyecto es una aplicación web desarrollada con Angular y TypeScript que consume una API REST. 

La API REST está creada con Spring Boot y se puede encontrar en el siguiente repositorio:

[RestoServApi](https://github.com/carolmt/RestoServApi) (creada por mí misma).

## Características

- Autenticación de usuarios.
- Creación de clientes.
- Edición de clientes ya almacenados en la base de datos.
- Creación de pedidos.
- Visualización de todos los productos.
- Visualización de pedidos.
- Cancelación de pedidos.
- Interfaz para la cocina para ver los pedidos pendientes.
- Marcar pedidos como hechos.

## Instalación

Para instalar y ejecutar este proyecto localmente, necesitarás tener instalado Node.js y npm. Luego, sigue estos pasos:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/carolmt/web_api.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd web_api
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Inicia la aplicación:
    ```bash
    ng serve
    ```

La aplicación ahora debería estar disponible en [http://localhost:4200](http://localhost:4200).

## Uso

Para iniciar sesión, introduce tu código de empleado y tu nombre. Una vez autenticado, podrás ver y gestionar los pedidos.

## Licencia

Este proyecto está bajo la licencia MIT.
