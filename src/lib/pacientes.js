export const getPacientes = async (urlApi) => {
    console.log(urlApi)
    const request = await fetch(`${urlApi}/get-pacientes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error", error));

    const pacientes = request.map(paciente => {
        let date = new Date(paciente.fecha_nacimiento)
        return ({ ...paciente, fecha_nacimiento: date.toISOString().substring(0, 10) })
    })

    return pacientes;
}

export const putPaciente = async (data, urlApi) => {
    const request = await fetch(`${urlApi}/put-paciente`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error", error));

    return request;
}

export const postPaciente = async (data, urlApi) => {
    const request = await fetch(`${urlApi}/post-paciente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error", error));

    return request
}