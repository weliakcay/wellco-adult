'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - ödeme sistemi bağlandığında gerçek endpoint eklenecek
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-wellco-primary/10 via-wellco-background to-wellco-accent-vibrant/10 py-16 md:py-24 border-b border-wellco-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-16 opacity-20 hover:opacity-60 transition-opacity">
                <Image
                  src="/logo.svg"
                  alt="Wellco Adult"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-light text-wellco-text-dark">
              İletişim
            </h1>
            <p className="text-lg md:text-xl text-wellco-text-dark/70 max-w-2xl mx-auto">
              Size nasıl yardımcı olabiliriz? Sorularınız, önerileriniz veya danışmanlık talepleriniz için bizimle iletişime geçin.
            </p>

            {/* Decorative line */}
            <div className="flex justify-center pt-4">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-wellco-accent-vibrant to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* Phone */}
              <Card className="border-wellco-primary/10 hover:border-wellco-accent-vibrant/30 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-wellco-text-dark">
                    <div className="w-12 h-12 rounded-full bg-wellco-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-wellco-primary" />
                    </div>
                    Telefon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="tel:+905441022245"
                    className="text-wellco-accent-vibrant hover:text-wellco-primary transition-colors font-medium"
                  >
                    +90 544 102 2245
                  </a>
                  <p className="text-sm text-wellco-text-dark/60 mt-2">
                    Pazartesi - Cumartesi<br />09:00 - 18:00
                  </p>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border-wellco-primary/10 hover:border-wellco-accent-vibrant/30 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-wellco-text-dark">
                    <div className="w-12 h-12 rounded-full bg-wellco-accent-vibrant/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-wellco-accent-vibrant" />
                    </div>
                    E-posta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:info@wellcoadult.com"
                    className="text-wellco-accent-vibrant hover:text-wellco-primary transition-colors font-medium break-all"
                  >
                    info@wellcoadult.com
                  </a>
                  <p className="text-sm text-wellco-text-dark/60 mt-2">
                    7/24 e-posta desteği
                  </p>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="border-wellco-primary/10 hover:border-wellco-accent-vibrant/30 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-wellco-text-dark">
                    <div className="w-12 h-12 rounded-full bg-wellco-accent-magenta/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-wellco-accent-magenta" />
                    </div>
                    Adres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wellco-text-dark/80 leading-relaxed">
                    Altındağ / Muratpaşa<br />
                    Antalya / Türkiye
                  </p>
                </CardContent>
              </Card>

              {/* AI Support Badge */}
              <Card className="border-wellco-primary/10 bg-gradient-to-br from-wellco-accent-vibrant/5 to-wellco-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-wellco-accent-vibrant mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-wellco-text-dark mb-1">7/24 AI Destek</h4>
                      <p className="text-sm text-wellco-text-dark/70">
                        Hemen yanıt almak için AI destekli uzmanlarımızla{' '}
                        <Link href="/personalar" className="text-wellco-accent-vibrant hover:underline font-medium">
                          sohbet edebilirsiniz
                        </Link>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-wellco-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-wellco-text-dark">
                    Danışmanlık Talebi Formu
                  </CardTitle>
                  <p className="text-sm text-wellco-text-dark/60 mt-2">
                    Formu doldurun, en kısa sürede size dönüş yapalım
                  </p>
                </CardHeader>
                <CardContent>
                  {submitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm font-medium">
                        ✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-wellco-text-dark mb-2">
                        Ad Soyad *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-wellco-text-dark mb-2">
                          E-posta *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                          placeholder="ornek@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-wellco-text-dark mb-2">
                          Telefon
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                          placeholder="+90 5XX XXX XX XX"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-wellco-text-dark mb-2">
                        Konu *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant"
                        placeholder="Mesajınızın konusu"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-wellco-text-dark mb-2">
                        Mesajınız *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="border-wellco-primary/20 focus:border-wellco-accent-vibrant min-h-[150px]"
                        placeholder="Detaylı olarak yazın..."
                      />
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-wellco-neutral p-4 rounded-lg text-xs text-wellco-text-dark/70">
                      <p>
                        Formu göndererek{' '}
                        <a href="/gizlilik-politikasi" className="text-wellco-accent-vibrant hover:underline">
                          gizlilik politikamızı
                        </a>{' '}
                        kabul etmiş olursunuz. Kişisel verileriniz yalnızca size dönüş yapmak için kullanılacaktır.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Gönder
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 bg-wellco-neutral border-t border-wellco-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-serif text-wellco-text-dark mb-4">
            Sıkça Sorulan Sorular
          </h3>
          <p className="text-wellco-text-dark/70 mb-8 max-w-2xl mx-auto">
            Merak ettikleriniz için önce SSS sayfamıza göz atabilirsiniz
          </p>
          <Button
            variant="outline"
            className="border-wellco-primary text-wellco-primary hover:bg-wellco-primary/10"
            asChild
          >
            <a href="/sss">
              SSS Sayfasına Git
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
