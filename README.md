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


# APLICACIÓN WEB RESTO SERV 

## LOGIN

En la pantalla de Login debemos introducir el nombre de empeado y su código proporcionado previamente por la administradora.

**Códigos disponibles:** 1011, 1012, 1013, 1014, 1015, 1016, 1017

![Pantallazo login RestoServ](https://github.com/carolmt/web_api/blob/main/capturas/login.png)

### Qué pasa si el empleado introducido no existe: 

![Pantallazo login fail](https://github.com/carolmt/web_api/blob/main/capturas/login-erroneo.png)

## INICIO

![Pantallazo inicio](https://github.com/carolmt/web_api/blob/main/capturas/inicio.png)

## CLIENTE

Primero debemos ir a 'Cliente', primero se busca el cliente por número de teléfono.

![Pantallazo ventana cliente](https://github.com/carolmt/web_api/blob/main/capturas/cliente-vacio.png)

Botón 'Buscar', si no existe veremos que no existe y podemos crearlo rellenando los datos del formulario y dándole 'Enviar', si no se hace esto, no tendremos acceso
al botón 'Crear pedido'.

![Pantallazo no existe cliente](https://github.com/carolmt/web_api/blob/main/capturas/cliente-no-existe.png)

En caso de que llame un cliente ya previamente registrado, al pinchar en 'Buscar' el formulario se rellenará automáticamente.

![Pantallazo cliente existente](https://github.com/carolmt/web_api/blob/main/capturas/cliente-datos.png)

Ahora podemos crear un pedido nuevo!

## PRODUCTOS

Lo primero que vemos son los tipos de productos, podemos selccionar cualquiera para poder añadirlos al nuevo pedido.
Al pasar el ratón por encima los botones cambian de color.

![Pantallazo productos](https://github.com/carolmt/web_api/blob/main/capturas/productos-tipo.png)

Cuando clickamos una categoría de producto, se nos despliegan los diferentes productos, pero al ser estos pinchados, se irán añadiendo al pedido,
de momento no se puede eliminar si te equivocas, en una futura actualización añadiré esa opción!

![Pantallazo todos los productos](https://github.com/carolmt/web_api/blob/main/capturas/productos.png)

## PEDIDOS

Si vamos a la pantalla de pedidos podemos ver el listado de pedidos pendientes de entrega. Podremos marcarlos como 'entrgados' o 'cancelados'.
La gestión en la base de datos no es funcional, simplemente se eliminan definitivamente, pero al darle a cualquier botón el pedido desaparecerá.

![Pantallazo pedidos](https://github.com/carolmt/web_api/blob/main/capturas/pedidos.png)

## PANTALLA COCINA

En la pantalla de cocina pasamos por un filtrado de pedidos hechos y no hechos. solo veremos los que están por hacer, y si hay alguna bebida en el pedido, esta
no será visible. Si el cocinero le da a 'Hecho', el pedido cambiará de estado, no se eliminará de la base de datos, pero ya no aparecerá más en la pantalla de cocina.

![Pantallazo cocina](https://github.com/carolmt/web_api/blob/main/capturas/cocina.png)
