'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, Lock, Loader2 } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Profile load error:', error);
      }

      if (data) {
        setProfile(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
        });
      } else {
        // Profil yoksa oluştur
        const { data: newProfile } = await supabase
          .from('users')
          .insert([
            {
              id: user?.id,
              email: user?.email,
              name: user?.user_metadata?.name || '',
            },
          ])
          .select()
          .single();

        if (newProfile) {
          setProfile(newProfile);
          setFormData({
            name: newProfile.name || '',
            phone: newProfile.phone || '',
          });
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: formData.name,
          phone: formData.phone,
        })
        .eq('id', user?.id);

      if (error) throw error;

      setMessage('Bilgileriniz başarıyla güncellendi!');
      loadProfile();
    } catch (error) {
      console.error('Update error:', error);
      setMessage('Güncelleme sırasında bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-wellco-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-wellco-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-wellco-primary/10 to-wellco-secondary/20 border-b border-wellco-primary/10 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-light text-wellco-text-dark">
            Hesabım
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profil Bilgileri */}
          <Card className="border-wellco-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-wellco-primary" />
                Profil Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {message && (
                  <div
                    className={`p-3 rounded-md text-sm ${
                      message.includes('başarıyla')
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {message}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ad Soyad
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border-wellco-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </label>
                  <Input
                    value={user.email}
                    disabled
                    className="bg-gray-50 border-wellco-primary/20"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email değiştirilemez
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Telefon
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+90 5XX XXX XX XX"
                    className="border-wellco-primary/20"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-wellco-primary hover:bg-wellco-primary/90"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    'Değişiklikleri Kaydet'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Hesap Özeti */}
          <Card className="border-wellco-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-wellco-accent-vibrant" />
                Hesap Özeti
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Üyelik Tarihi</p>
                <p className="font-medium">
                  {new Date(user.created_at || '').toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Hızlı İşlemler</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href="/siparislerim">Siparişlerimi Görüntüle</a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href="/iletisim">Destek Talebi Oluştur</a>
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-semibold mb-2">Güvenlik</h4>
                <p className="text-sm text-muted-foreground">
                  Şifrenizi değiştirmek için email adresinize şifre sıfırlama
                  bağlantısı gönderin.
                </p>
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => router.push('/auth/forgot-password')}
                >
                  Şifremi Değiştir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
