import { getDescripProf } from "./estructuras";

export const getProfesionales = async (urlApi) => {
    const request = await fetch(`${urlApi}/get-profesionales`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error", error));

    const profesionales = request.length ? request.map(profesional => {
        let date = new Date(profesional.fecha_nacimiento)
        return ({ ...profesional, fecha_nacimiento: date.toISOString().substring(0, 10), descripProfesion: getDescripProf(profesional.profesion) })
    }) : []

    return profesionales;
}

export const putProfesional = async (data, urlApi) => {
    const request = await fetch(`${urlApi}/put-profesional`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error", error));

    return request;
}

export const postProfesional = async (data, urlApi) => {
    const request = await fetch(`${urlApi}/post-profesional`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error", error));

    return request
}