import { useState, Fragment } from "react";
import { Field, Form, Formik } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import { Alert, Button, Navbar, PageTitle, Autocomplete } from "@/components";
import { getCitas, getPacientes, getProfesionales, postCita, putCita } from "@/lib"

import {
  UserPlusIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import * as Yup from "yup";

const metadata = {
  title: "Citas",
  descript:
    "Crea, actualiza las citas",
};

const Citas = ({ urlApi, dataCitas, pacientes, profesionales }) => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentCita, setCurrentCita] = useState(null);

  console.log("dataCitas", dataCitas)

  const [citas, setCitas] = useState(dataCitas || [])
  const [dataAlert, setDataAlert] = useState({
    code: "03",
    msg: "Registro guardado!",
    tipo: "info"
  })

  const handleEditCita = (cita) => {
    const formatCita = {
      _id: cita._id,
      id_paciente: cita.id_paciente._id,
      id_profesional: cita.id_profesional._id,
      eps: cita.eps,
      fecha: cita.fecha
    }
    
    console.log("handleEditCita", formatCita)
    setEdit(true);
    setCurrentCita(formatCita)
    abrirFormulario()
  }

  let initialValues = {
    fecha: "",
    id_paciente: "",
    id_profesional: "",
    eps: "",
  };

  const validationSchema = Yup.object({
    fecha: Yup.string().required("Required"),
    id_paciente: Yup.string().required("Required"),
    id_profesional: Yup.string().required("Required"),
    eps: Yup.string().required("Required")
  });

  const onSubmit = async (values) => {
    console.log("values", values)
    const req = edit ? await putCita(values, urlApi, values._id) : await postCita(values, urlApi)

    setDataAlert(req)
    setOpenAlert(!openAlert);

    if (req.tipo == "success") {
      const citas = await getCitas(urlApi)
      setCitas(citas || [])
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
              Agregar cita
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
                      initialValues={edit ? currentCita : initialValues}
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
                            <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                              <div className="">
                                <div className="space-y-12">
                                  <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-lg font-semibold leading-7 text-gray-900">
                                      {metadata.title}
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                      {metadata.descript}
                                    </p>
                                    <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8">

                                      <div className="sm:col-span-3">
                                        <label
                                          htmlFor="sexo"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Paciente
                                        </label>
                                        <div className="mt-2">
                                          <Field
                                            name="id_paciente"
                                            {...formik.getFieldProps("id_paciente")}
                                            values={pacientes}
                                            component={Autocomplete}
                                          />
                                        </div>
                                      </div>

                                      <div className="sm:col-span-3">
                                        <label
                                          htmlFor="sexo"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Profesional
                                        </label>
                                        <div className="mt-2">
                                          <Field
                                            name="id_profesional"
                                            {...formik.getFieldProps("id_profesional")}
                                            values={profesionales}
                                            component={Autocomplete}
                                          />
                                        </div>
                                      </div>

                                      <div className="sm:col-span-3">
                                        <label
                                          htmlFor="last-name"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Eps
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="text"
                                            name="eps"
                                            {...formik.getFieldProps(
                                              "eps"
                                            )}
                                            maxLength={20}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.eps
                                              ? "ring-red-300"
                                              : "ring-gray-300"
                                              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                          />
                                        </div>
                                      </div>
                                      <div className="sm:col-span-3">
                                        <label
                                          htmlFor="last-name"
                                          className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                          Fecha
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="datetime-local"
                                            name="fecha"
                                            {...formik.getFieldProps(
                                              "fecha"
                                            )}
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.errors.fecha
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
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Paciente
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Profesional
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Eps
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
                  {citas.map((cita) => (
                    <tr key={cita._id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {`${cita.fecha.slice(0, 10)} - ${cita.fecha.slice(11, 19)}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {`${cita.id_paciente.id} - ${cita.id_paciente.primer_nombre} ${cita.id_paciente.primer_apellido}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {`${cita.id_profesional.id} - ${cita.id_profesional.primer_nombre} ${cita.id_profesional.primer_apellido}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cita.eps}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cita.telefono}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleEditCita(cita)}
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
  const initialDataCitas = await getCitas(urlApi) || [];

  const dataCitas = initialDataCitas.map(cita => ({ ...cita, fecha: cita.fecha.slice(0, 16),}))

  const initialDataPacientes = await getPacientes(urlApi) || [];

  const pacientes = initialDataPacientes.map(paciente => ({
    _id: paciente.id,
    id: paciente._id,
    name: `${paciente.primer_nombre} ${paciente.segundo_nombre} ${paciente.primer_apellido} ${paciente.segundo_apellido}`
  })
  )

  const initialDataProfesionales = await getProfesionales(urlApi) || [];

  const profesionales = initialDataProfesionales.map(paciente => ({
    _id: paciente.id,
    id: paciente._id,
    name: `${paciente.primer_nombre} ${paciente.segundo_nombre} ${paciente.primer_apellido} ${paciente.segundo_apellido}`
  })
  )


  return {
    props: { urlApi, dataCitas, pacientes, profesionales },
  };
};

export default Citas;
