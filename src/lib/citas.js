export const getCitas = async (urlApi) => {
    const request = await fetch(`${urlApi}/get-citas`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error", error));

    const citas = request.map(cita => {
        let date = new Date(cita.fecha_nacimiento)
        return ({ ...cita, fecha_nacimiento: date.toISOString().substring(0, 10) })
    })

    return citas;
}

export const putCita = async (data, urlApi) => {
    const request = await fetch(`${urlApi}/put-cita`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error", error));

    return request;
}

export const postCita = async (data, urlApi) => {
    const request = await fetch(`${urlApi}/post-cita`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error", error));

    return request
}