import { useState } from "react";
import { Button } from "@/components/Button";
import { PageTitle } from "@/components/PageTitle";
import Select from "@/components/Select";
import Autocomplete from "@/components/Autocomplete";
import { ModalForrm } from "@/components/ModalForrm";
import Navbar from "@/components/Navbar";

const metadata = {
  title: "Profesionales",
  descript:
    "Crea, actualiza o borra información básica de los profesionales en el sistema",
};

const tiposId = [
  { id: "RC", name: "Registro civil de nacimiento" },
  { id: "TI", name: "Tarjeta de identidad" },
  { id: "CC", name: "Cédula de ciudadania" },
  { id: "TE", name: "Tarjeta de extranjería" },
  { id: "NIT", name: "Nit" },
  { id: "PT", name: "Pasaporte" },
];

const sexos = [
  { id: "M", name: "Masculino" },
  { id: "F", name: "Femenino" },
];

const Pacientes = () => {
  const [open, setOpen] = useState(false);
  const [profesional, setProfesional] = useState({
    id: "1006689062",
    tipo_id: "CC",
    sexo: "M",
    fecha_nacimiento: "2023-03-07",
    correo: "pastusito18@gmail.com",
    primer_nombre: "Cristian",
    segundo_nombre: "David",
    primer_apellido: "Hernandez",
    segundo_apellido: "Suarez",
    profesion: "3",
  });

  const abrirFormulario = () => {
    setOpen(!open);
  };

  const onChangeProfesional = (event) => {
    const { value, name } = event.target;
    setProfesional((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="space-y-10">
        <div className="flex">
          <PageTitle title={metadata.title} subTitle={metadata.descript}>
            <Button
              onClick={abrirFormulario}
              className="custom-primary-button"
              icon="PlusCircleIcon"
              leadingIcon
            >
              Agregar profesional
            </Button>
          </PageTitle>
        </div>

        <ModalForrm
          isOpen={open}
          onHandlerClose={abrirFormulario}
          title="Información"
          descript="Datos básicos del profesional"
        >
          <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8">
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tipo documento
              </label>
              <div className="mt-2">
                <Select
                  name="tipo_id"
                  lista={tiposId}
                  selectedItem={profesional.tipo_id}
                  defaultSelected={2}
                  onChange={onChangeProfesional}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Documento de identidad
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={profesional.id}
                  name="id"
                  onChange={onChangeProfesional}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Primer nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={profesional.primer_nombre}
                  name="primer_nombre"
                  onChange={onChangeProfesional}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Segundo nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={profesional.segundo_nombre}
                  name="segundo_nombre"
                  onChange={onChangeProfesional}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Primer apellido
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={profesional.primer_apellido}
                  name="primer_apellido"
                  onChange={onChangeProfesional}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Segundo apellido
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={profesional.segundo_apellido}
                  name="segundo_apellido"
                  onChange={onChangeProfesional}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha nacimiento
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  value={profesional.fecha_nacimiento}
                  name="fecha_nacimiento"
                  onChange={onChangeProfesional}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sexo
              </label>
              <div className="mt-2">
                <Select
                  name="sexo"
                  lista={sexos}
                  selectedItem={profesional.sexo}
                  onChange={onChangeProfesional}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  value={profesional.correo}
                  name="correo"
                  onChange={onChangeProfesional}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Municipio residencia
              </label>
              <div className="mt-2">
                <Autocomplete />
              </div>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Dirección
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={profesional.direccion}
                  onChange={onChangeProfesional}
                  name="direccion"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </ModalForrm>
      </div>
    </>
  );
};

export default Pacientes;
