import React, {useState} from 'react';
import Button from '../components/Button';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if(!username || !password) {
            alert("아이다와 비밀번호를 입력하세요");
            return;
        }
        // 백엔드와 연동해서 
        alert("환영합니다, ${username}님!");
    };
    return (
        <div className=" mx-auto max-w-sm mt-20 p-6 shadow rounded bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">
                로그인
            </h2>
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded"
            />
            <Button onClick={handleLogin}>로그인</Button>
        </div>
    );
};

export default Login;