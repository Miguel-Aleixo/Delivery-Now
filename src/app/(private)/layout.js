import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'], weight: ['400'] })

export default async function ProtectedLayout({ children }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verificar-token`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        })

        if (!response.ok) {
            console.log("Token inválido")
            redirect('/login');
        }

        console.log("Seu token foi verificadao: Válido")
    }

    if (!token) {
        redirect('/login');
    }

    return <div className={`${inter.className}`}>
        {children}
    </div>
}
