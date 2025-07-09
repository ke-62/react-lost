import React from 'react';
import {Link} from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className='bg-white shadow-md px-6 py-4 flex justify-between items-center'>
            <Link to = "/" className="text-xl font-bold text-blue-600">
                유실물 찾기
            </Link>
            <nav className="space-x-4">
                <Link to = "/upload" className="text-gray-700 hover:text-blue-600">
                    업로드
                </Link>
                <Link to = "/result" className="text-gray-700 hover:text-blue-600">
                    결과
                </Link>
                <Link to ="/login" className="text-gray-700 hover:text-blue-600">
                    로그인
                </Link>
            </nav>
        </header>
    );
};

export default Header;