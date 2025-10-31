
import { NavBar } from '@/app/components/Private/NavBar';
import { MenuLateralDashboard } from '../../../components/Private/menuLateralDashboard';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { MenuProvider } from '../context/MenuContext';


export default function LayoutTelasDashboard({ children }) {

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    let NomeAdm = '';
    if (token) {
        try {
            const decoded = jwtDecode(token);
            NomeAdm = decoded.nome || '';
        } catch (e) {
            NomeAdm = '';
        }
    }

    return (
       <MenuProvider>
            <div className="flex bg-zinc-100 min-h-screen">
                <MenuLateralDashboard nome={NomeAdm} />
                <div className='flex-1'>
                    <NavBar />
                    {children}
                </div>
            </div>
        </MenuProvider>
    )
}
