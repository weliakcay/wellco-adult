import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Giriş Yap',
  description: 'Wellco Adult hesabınıza giriş yapın',
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Hoş Geldiniz</h1>
          <p className="text-muted-foreground">Hesabınıza giriş yapın</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
