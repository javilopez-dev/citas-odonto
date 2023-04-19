export const PageTitle = ({ children, title, subTitle }) => {
    return (
        <>
            <div className="container max-w-full border-b border-gray-200 bg-white px-4 pt-10 pb-5 sm:px-6">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-2xl font-bold leading-6 text-gray-900">{title}</h3>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                            {subTitle}
                        </p>
                    </div>
                    <div className="ml-4 mt-4 flex-shrink-0">
                        <div className="flex flex-wrap items-center gap-4">
                            {!!children && children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}