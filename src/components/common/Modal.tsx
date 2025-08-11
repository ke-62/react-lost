import React from 'react'

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({open,onClose, children}) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center
        bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded p-6 relative min-w-[300px]">
                <button className="absolute top-2 right-2" onClick={onClose}>x</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;