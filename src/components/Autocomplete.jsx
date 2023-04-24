import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Autocomplete = ({ field, form: { setFieldValue, errors }, meta, ...props }) => {

    const { name } = field;
    const { values } = props;

    const [query, setQuery] = useState('')
    const [selectedOption, setSelectedOption] = useState(values.find(v => v.id === field.value) || {})

    const filteredData =
        query === ''
            ? values
            : values.filter((value) =>
                value.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const handleOnChange = (value) => {
        setFieldValue(name, value.id);
        setSelectedOption(value)
    };

    return (
        <div>
            <Combobox
                value={selectedOption}
                onChange={handleOnChange}
            >
                <div className="relative mt-1">
                    <div className="relative w-full">
                        <Combobox.Input
                            className={`w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors[name] ? "ring-red-300" : "ring-gray-300"}  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            displayValue={() => values.find((el) => el.id === field.value)?.name || ''}
                            onChange={(event) => setQuery(event.target.value)}

                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {
                                filteredData.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-900">
                                        Nothing found.
                                    </div>
                                ) :
                                    (filteredData.map((option) => (
                                        <Combobox.Option
                                            key={option.id}
                                            value={option}
                                            className={({ active }) =>
                                                classNames(
                                                    'relative cursor-default select-none py-2 pl-3 pr-9',
                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                )
                                            }
                                        >
                                            {({ active, value }) => (
                                                <>
                                                    <span className={classNames('block truncate', value && 'font-semibold')}>{option.name}</span>

                                                    {value && (
                                                        <span
                                                            className={classNames(
                                                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                active ? 'text-white' : 'text-indigo-600'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    )))
                            }
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
