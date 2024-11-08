## Proyecto semestral Programación Movil

### Descripción:
Proyecto de programación movil llamado "Te Llevo", el cual esta desarrollado con Ionic + Firebase.

### Integrantes:

- Benjamín Cofré
- David Rojas

### ¿Que nos hace falta según el profesor?

- Incluir datos a la url ✅
- Crear un elemento Loading al iniciar sesión ✅
- Validaciones en el inicio de sesión ✅
- Mostrar los datos del usuario en la consola en formato JSON (Al regsitrar usuario se muestra en consola) ✅
- Crear un servicio llamado user o usuario que nos permita agregar usuarios a la api, el servicio contiene un metodo async. ✅
- Usar capacitor plugins ✅

---

>[!NOTE]
>- ⚠️ "Por implementar"
>- ✅ "Realizado"
>- ❌ "Error en la implementación"
>- 🛠️ "Realizando"

### 1. Firebase ✅
- Login y LogOut 
- ResetPassword 
- Registro 
### 2. Persistencia de datos (Plugin capacitor Preferences) ✅
- Agregar Datos 
- Obtener Datos 
### 3. Consumo de apiRest ✅
1. **Métodos GET:** 🛠️
- Obtener usuario 
- Obtener vehículo 
- Obtener viajes 
2. **Métodos POST:**  ✅
- Agregar usuario 
- Agregar vehículo 
- Agregar viaje 
- Actualizar estado viaje 
### 4. Protección de rutas con AuthGuard implementado con firebase. ✅
- Implementación página error 404. 
### 5. Implementación de plugin a elección. ✅
### 6. Animación nativa de ionic (Animations). ✅
- No debe iniciar la reproducción de la animación desde un botón que diga explícitamente “PLAY”, es 
decir, se debe animar desde una interacción con el usuario. 

---
### Plugins escogidos e implementados:
1. Geolocalización (En la vista Home)
2. Cámara (En el registro de usuario)

### Animación implementada:
- Overriding Ionic Component Animations (Modal en add-trip.page.html)
- Desplazamiento horizontal de un elemento de manera indefinida (panel publicitario en add-trip.page.html)

---

## Evaluación 3 (Test o pruebas)
### Procesos:
Ejecuta el siguiente comando para iniciar las pruebas: `npm run test`

- Las pruebas se realizan gracias a Jasmine
- Archivos spec son los que manejan las pruebas
- Puede ser cualquier prueba, se necesita una.

### Iconos:
- Icon 1024px X 1024px
- Icon splash 2732px X 2732px
- Se recomienda usar PowerToys para la redimension de imágenes.

El formato puede ser jpg o png
---

### API del docente:
https://uber-nodejs-server-git-d61f89-guillermovillacuratorres-projects.vercel.app/api/

### Web del docente:
https://uber.matiivilla.cl/inicio
