import React, { FC } from 'react';

interface props {
    isVisible: boolean,
    children: React.ReactNode
}

const DropDownList:FC<props> = ({isVisible, children}) => {
    const baseStyles = ['tippy right-0', 'top-[60px] opacity-0 pointer-event-none invisible']

    if(isVisible) {
        baseStyles.pop()
        baseStyles.push('top-[40px] right-0 opacity-[1] pointer-event-auto visible')
    }

    return (
        <div className={baseStyles.join(' ')}>
            <div className='py-[8px]'>
                {children}
            </div>
        </div>
    );
};

export default DropDownList;