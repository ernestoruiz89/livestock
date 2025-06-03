# Livestock Management App

Aplicación web para el control de ganado y otros animales, construida con React y Tailwind CSS. Permite registrar animales, parcelas, alimentación y eventos de salud. Está preparada para integrarse con un backend en ERPNext y soporta multi‑usuario y multi‑empresa.

## Instalación

```bash
npm install
npm run dev
```

Copia el archivo `.env.example` a `.env` y ajusta la URL de ERPNext.

## Integración con ERPNext

El proyecto puede conectarse a un servidor ERPNext mediante las utilidades en `src/api/erpnext.ts`. Las solicitudes usan la API REST de ERPNext y requieren que el usuario esté autenticado.

### Doctypes sugeridos

- **Animal**: modelo principal para cualquier especie. Campos recomendados: `tag_number`, `species`, `breed`, `birth_date`, `weight`, `status`, `location`, `company`.
- **Pasture**: define las parcelas o potreros. Campos: `name`, `area`, `status`, `last_rotation`, `grass_type`, `capacity`, `company`.
- **Feeding Record**: registro de alimentación diaria. Relaciona `pasture`, `date`, `feed_type`, `quantity` y número de animales.
- **Health Record**: vacunas o tratamientos realizados a un animal.

Todos los doctypes deben tener permisos basados en el campo `company` para soportar multi‑empresa.

### Código del lado del servidor

En ERPNext pueden crearse controladores en `api/methods` para exponer endpoints específicos. Un ejemplo mínimo en Python:

```python
import frappe

@frappe.whitelist()
def list_animals(company=None):
    filters = {}
    if company:
        filters['company'] = company
    return frappe.get_all('Animal', fields='*', filters=filters)
```

Las funciones expuestas se consumirían desde `src/api/erpnext.ts`.

## Multiusuario y multiempresa

ERPNext gestiona la autenticación y los permisos. Cada Doctype debe incluir el campo `company` y los permisos de usuario se configuran desde el escritorio de ERPNext para que sólo puedan ver o editar los registros de su empresa.

## Licencia

MIT
