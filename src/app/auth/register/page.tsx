import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Kayıt Ol',
  description: 'Wellco Adult\'a üye olun',
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Hesap Oluştur</h1>
          <p className="text-muted-foreground">
            Hızlı alışveriş ve özel fırsatlar için üye olun
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
