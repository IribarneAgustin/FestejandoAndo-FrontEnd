# FESTEJANDO ANDO - Sistema de Alquiler de Mobiliario Infantil

**FESTEJANDO ANDO** es un proyecto de sistema para alquilar mobiliario infantil que permite a los usuarios explorar y solicitar reservas de una amplia variedad de artículos organizados por temáticas. Este sistema también incluye características como sugerencias de artículos para alquilar según las temáticas configuradas por el administrador y un carrito de compras para facilitar la gestión de las reservas. Además, el sistema envía notificaciones por correo electrónico tanto al cliente como al administrador cuando se realiza una reserva.

## Características Funcionales

- **Inicio de Sesión/Cierre de Sesión como Administrador:** Los administradores pueden iniciar sesión en el sistema y cerrar sesión cuando lo deseen.

- **Panel de Administración:** El sistema incluye un panel de administración que permite a los administradores gestionar clientes, temáticas, artículos y reservas de manera eficiente.

- **CRUD de Artículos:** Los administradores pueden crear, leer, actualizar y eliminar (CRUD) artículos disponibles para alquilar.

- **CRUD de Temáticas:** Los administradores pueden gestionar las temáticas que organizan los artículos, incluyendo su creación, lectura, actualización y eliminación.

- **CRUD de Reservas:** Los administradores pueden realizar operaciones CRUD en las reservas, lo que facilita la gestión de las solicitudes de alquiler.

- **CRUD de Clientes:** Los administradores pueden administrar la información de los clientes, incluyendo la creación, lectura, actualización y eliminación de registros.

- **Galería de Temáticas:** Los usuarios pueden explorar una galería de temáticas para encontrar artículos relacionados con sus necesidades de alquiler.

- **Detalle de Temática:** Cada temática muestra información detallada y artículos relacionados para una experiencia de navegación más completa.

- **Carrito de Compras:** Los usuarios pueden agregar y gestionar artículos en su carrito de compras antes de confirmar su reserva.

- **Formulario de Reserva:** Los usuarios pueden completar un formulario de reserva para solicitar la reserva de artículos específicos.

- **Captcha (Prevención de Spam):** El sistema utiliza Captcha para evitar el envío automático de formularios y reducir el riesgo de spam.

- **Notificaciones por Correo Electrónico:** Se envían notificaciones por correo electrónico tanto al cliente como al administrador cuando se realiza una reserva, solicitando confirmación.

## Recursos No Funcionales

- **Backend API Rest Java Spring Boot:** El sistema utiliza una API REST implementada en Java con Spring Boot para manejar las operaciones del servidor.

- **Frontend React JS:** La interfaz de usuario se desarrolla utilizando React JS para proporcionar una experiencia de usuario fluida y receptiva.

- **Base de Datos MySQL:** Se utiliza MySQL como sistema de gestión de bases de datos para almacenar y gestionar datos relacionados con clientes, temáticas, artículos y reservas.

## Cómo Ejecutar el Proyecto

Para ejecutar el proyecto **FESTEJANDO ANDO** en su entorno local, siga estos pasos:

1. Clone ambos repositorios, tanto del frontend como del backend desde GitHub.
```shell
   git clone https://github.com/tu_usuario/festejando-ando-frontend.git
```
Backend URL: https://github.com/IribarneAgustin/Festejando-Ando

Frontend URL: https://github.com/IribarneAgustin/FestejandoAndo-FrontEnd
   
3. Configure la base de datos MySQL con la configuración adecuada y asegúrese de que esté en funcionamiento.
4. Configure las propiedades de la aplicación, como la URL de la base de datos y las credenciales, en el archivo de configuración.
5. Instale las dependencias del proyecto tanto para el backend como para el frontend.

# En el directorio del backend
```shell
cd festejando-ando-backend
```
Run as Spring boot Application 

# En el directorio del frontend
```shell
cd ../festejando-ando-frontend
npm install
npm start
```

Abra su navegador web y vaya a http://localhost:3000 para acceder a la aplicación.

¡Disfrute explorando y utilizando FESTEJANDO ANDO!

## Contribuciones

Contribuciones son bienvenidas. Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio en GitHub.

2. Crea una nueva rama para tu función o corrección de errores.

3. Realiza los cambios necesarios y asegúrate de seguir las mejores prácticas de codificación.

4. Envía una solicitud de extracción (pull request) con una descripción detallada de los cambios que has realizado.

5. Los colaboradores revisarán tu solicitud y la fusionarán en el proyecto principal si es apropiado.

## Problemas y Soporte

Si encuentras problemas o tienes preguntas sobre el proyecto, no dudes en abrir un issue en GitHub o ponerte en contacto con el equipo de desarrollo.

¡Gracias por usar **FESTEJANDO ANDO**! Esperamos que este sistema de alquiler de mobiliario infantil sea útil para ti y tu comunidad.

