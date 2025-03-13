import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
            <div className="relative flex flex-col justify-center items-end w-fit">
                <button onClick={onClose} className="text-white text-xl absolute top-[-3rem] xl:top-[-2.5rem] xl:right-[-2.5rem] rounded-full hover:bg-white/20 transition ease-in-out duration-150">
                    <svg viewBox="0 0 24 24" width={"2.5rem"} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
                {children}
            </div>

        </div>
    );
};

export default Modal

