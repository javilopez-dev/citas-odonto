import React, { MouseEventHandler } from 'react'
import dynamic from 'next/dynamic'

export const Button = ({ children, onClick, icon, className = "custom-primary-button", leadingIcon = false }) => {

    const Icon = icon ? dynamic(() =>
        import('@heroicons/react/24/outline').then((mod) => mod[icon])
    ) : null;

    return (
        <button
            type="button"
            className={`${className} ${icon && 'inline-flex items-center gap-x-1.5'}`}
            onClick={onClick}
        >
            {Icon && <Icon className={`-ml-0.5 h-5 w-5  ${leadingIcon && 'order-last'}`} aria-hidden="true" />}
            {children}
        </button>
    )
}
