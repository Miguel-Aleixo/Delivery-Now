import { cookies } from 'next/headers';
import { Header } from '../../components/Globais/header';
import { jwtDecode } from 'jwt-decode';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: '400' });

export default async function LayoutParaPassarProsp({ children }) {

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    let role;
    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
    }

    return (
        <div className={`${inter.className}`}>
            <Header role={role} />
            {children}
        </div>
    )
}
