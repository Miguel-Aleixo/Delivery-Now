import { cookies } from 'next/headers';
import { Header } from '../../components/Globais/header';
import { jwtDecode } from 'jwt-decode';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: '400' });

export default async function LayoutParaPassarProps({ children }) {

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    let role;
    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
    }

    return (
        <div className={`${inter.className}`}>
            <Header carrinho={true} role={role}/>
            {children}
        </div>
    )
}
