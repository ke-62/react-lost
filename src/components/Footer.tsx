import react from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-center py-4 mt-10 text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Sejong University - Lost&Found Project
        </footer>
    );
};

export default Footer;