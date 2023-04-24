import { useState, Fragment } from "react";
import { Form, Formik } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import { Alert, Select, Button, Navbar, PageTitle } from "@/components";
import { getPacientes, postPaciente, putPaciente, tiposId, sexos } from "@/lib"

import {
  UserPlusIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import * as Yup from "yup";

const metadata = {
  title: "Pacientes",
  descript:
    "Crea, actualiza o borra información básica de los pacientes en el sistema",
};

const Pacientes = ({ urlApi, dataPacientes }) => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [pacientes, setPacientes] = useState(dataPacientes || [])
  const [dataAlert, setDataAlert] = useState({
    code: "03",
    msg: "Registro guardado!",
    tipo: "info"
  })

  const handleEditPaciente = (paciente) => {
    setEdit(true);
    setCurrentPatient(paciente)
    abrirFormulario()
  }

  let initialValues = {
    id: "",
    tipo_id: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    sexo: "",
    fecha_nacimiento: "",
    telefono: "",
    correo: "",
    direccion: "",
  };

  const validationSchema = Yup.object({
    id: Yup.string().required("Required"),
    tipo_id: Yup.string().required("Required"),
    primer_nombre: Yup.string().required("Required"),
    primer_apellido: Yup.string().required("Required"),
    sexo: Yup.string().required("Required"),
    fecha_nacimiento: Yup.string().required("Required"),
    telefono: Yup.string().required("Required"),
    correo: Yup.string().required("Required"),
    direccion: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    const req = edit ? await putPaciente(values, urlApi) : await postPaciente(values, urlApi)

    setDataAlert(req)
    setOpenAlert(!openAlert);

    if (req.tipo == "success") {
      const pacientes = await getPacientes(urlApi)
      setPacientes(pacientes || [])
      cerrarFormulario();
    }
  };

  const closeAlert = () => {
    setOpenAlert(!openAlert);
  }

  const abrirFormulario = () => {
    setOpen(true);
  };

  const cerrarFormulario = () => {
    setEdit(false)
    setOpen(false);
  }

  return (
    <>
      <Alert open={openAlert} onHandlerClose={closeAlert} data={dataAlert} />
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
              Agregar paciente
            </Button>
          </PageTitle>
        </div>

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={cerrarFormulario}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={cerrarFormulario}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <Formik
                      initialValues={edit ? currentPatient : initialValues}
                      validationSchema={validationSchema}
                      enableReinitialize
                      onSubmit={onSubmit}
                    >
                      {(formik) => (
                        <Form>
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                              <UserPlusIcon
                                className="h-6 w-6 text-blue-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="mt-3 w-full  sm:ml-4 sm:mt-0 sm:text-left">
                              <div className="">
                                <div className="space-y-12">
                                  <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-lg font-semibold leading-7 text-gray-900">
                                      {metadata.title}
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                      {metadata.descript}
                                    </p>
                                    <div className="mt-10 xs:flex grid  grid-cols-6 gap-x-6 gap-y-8">
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="country"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Tipo documento
                                        </label>
                                        <div className="mt-2">
                                          <Select
                                            name="tipo_id"
                                            options={tiposId}
                                          ></Select>
                                        </div>
                                      </div>
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="first-name"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Documento de identidad
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="text"
                                            {...formik.getFieldProps("id")}
                                            name="id"
                                            maxLength={10}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.id
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="first-name"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Primer nombre
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="text"
                                            name="primer_nombre"
                                            {...formik.getFieldProps(
                                              "primer_nombre"
                                            )}
                                            maxLength={20}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.primer_nombre
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="first-name"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Segundo nombre
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="text"
                                            name="segundo_nombre"
                                            {...formik.getFieldProps(
                                              "segundo_nombre"
                                            )}
                                            maxLength={20}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.segundo_nombre
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="last-name"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Primer apellido
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="text"
                                            name="primer_apellido"
                                            {...formik.getFieldProps(
                                              "primer_apellido"
                                            )}
                                            maxLength={20}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.primer_apellido
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="last-name"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Segundo apellido
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="text"
                                            name="segundo_apellido"
                                            {...formik.getFieldProps(
                                              "segundo_apellido"
                                            )}
                                            maxLength={20}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.segundo_apellido
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="last-name"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Fecha nacimiento
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="date"
                                            name="fecha_nacimiento"
                                            {...formik.getFieldProps(
                                              "fecha_nacimiento"
                                            )}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.fecha_nacimiento
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="sexo"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Sexo
                                        </label>
                                        <div className="mt-2">
                                          <Select
                                            name="sexo"
                                            options={sexos}
                                          ></Select>
                                        </div>
                                      </div>
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="first-name"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Teléfono
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="text"
                                            {...formik.getFieldProps(
                                              "telefono"
                                            )}
                                            name="telefono"
                                            maxLength={10}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.telefono
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
                                        </div>
                                      </div>
                                      <div className="sm:col-span-6">
                                        <label
                                          htmlFor="correo"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Correo electrónico
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            name="correo"
                                            type="email"
                                            {...formik.getFieldProps(
                                              "correo"
                                            )}
                                            maxLength={60}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.correo
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
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
                                            name="direccion"
                                            {...formik.getFieldProps(
                                              "direccion"
                                            )}
                                            maxLength={60}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.direccion
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                            >
                              Guardar
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={cerrarFormulario}
                            >
                              Cancelar
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
      <div className="mt-8 flow-root">
        <div className="container mx-auto">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tipo id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Primer nombre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Primer apellido
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Teléfono
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pacientes.map((paciente) => (
                    <tr key={paciente.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {paciente.tipo_id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {paciente.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {paciente.primer_nombre}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {paciente.primer_apellido}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {paciente.telefono}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleEditPaciente(paciente)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {" "}
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const urlApi = process.env.BASE_URL_API;
  const dataPacientes = await getPacientes(urlApi) || [];

  return {
    props: { urlApi, dataPacientes },
  };
};

export default Pacientes;
