export const tiposId = [
    { key: "", value: "Seleccione" },
    { key: "RC", value: "Registro civil de nacimiento" },
    { key: "TI", value: "Tarjeta de identidad" },
    { key: "CC", value: "Cédula de ciudadania" },
    { key: "TE", value: "Tarjeta de extranjería" },
    { key: "NIT", value: "Nit" },
    { key: "PT", value: "Pasaporte" },
];

export const tiposIdProf = [
    { key: "", value: "Seleccione" },
    { key: "CC", value: "Cédula de ciudadania" },
];

export const sexos = [
    { key: "", value: "Seleccione" },
    { key: "M", value: "Masculino" },
    { key: "F", value: "Femenino" },
];

export const profesion = [
    { key: "", value: "Seleccione" },
    { key: "0", value: "Odontólogo" },
    { key: "1", value: "Medico general" },
    { key: "2", value: "Enfermera" },
    { key: "3", value: "Auxiliarde enfermeria" },
];

export const getDescripProf = (key) => {
    const prof = profesion.find(el => el.key == key);
    return prof ? prof.value : "No definido"
}