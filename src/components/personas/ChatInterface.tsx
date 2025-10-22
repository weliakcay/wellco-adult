'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Persona } from '@/types/persona';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  persona: Persona;
}

const DR_SEREN_WEBHOOK_URL =
  'https://weliakcay.app.n8n.cloud/webhook/6c3ea13f-3a57-4dc6-ba4d-805699d9db4a';

export function ChatInterface({ persona }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: persona.type === 'expert'
        ? `Merhaba! Ben ${persona.name}. ${persona.tagline} Size nasıl yardımcı olabilirim?`
        : `Merhaba! Ben ${persona.name}. ${persona.tagline} Seninle tanışmaktan mutluluk duyuyorum.`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages]);

  const handleSend = async () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    if (persona.slug === 'dr-seren-yilmaz') {
      try {
        const reply = await requestDrSerenWebhookResponse(trimmedMessage, persona);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Dr. Seren webhook error:', error);
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content:
            'Şu anda yanıt veremiyorum. Lütfen kısa bir süre sonra tekrar deneyin ya da alternatif kanallarımızdan bize ulaşın.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getSimulatedResponse(trimmedMessage, persona),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-wellco-primary to-wellco-accent-vibrant p-4 rounded-t-2xl text-white flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
          {persona.type === 'expert' ? (
            <Bot className="h-6 w-6" />
          ) : (
            <Sparkles className="h-6 w-6" />
          )}
        </div>
        <div>
          <div className="font-semibold">{persona.name}</div>
          <div className="text-xs opacity-90 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Çevrimiçi
          </div>
        </div>
      </div>

      {/* Sample Questions (if no messages yet) */}
      {messages.length === 1 && persona.sampleQuestions && (
        <div className="bg-wellco-neutral p-4 border-b border-wellco-primary/10">
          <div className="text-xs text-wellco-text-dark/60 mb-2">Örnek Sorular:</div>
          <div className="flex flex-wrap gap-2">
            {persona.sampleQuestions.slice(0, 3).map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSampleQuestion(question)}
                className="text-xs border-wellco-primary/20 hover:border-wellco-accent-vibrant/40 hover:bg-wellco-accent-vibrant/5"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-wellco-background">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-wellco-accent-vibrant text-white'
                  : 'bg-gradient-to-br from-wellco-primary to-wellco-accent-vibrant text-white'
              }`}
            >
              {message.role === 'user' ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[75%] ${
                message.role === 'user'
                  ? 'bg-wellco-accent-vibrant text-white'
                  : 'bg-white border border-wellco-primary/10'
              } rounded-2xl px-4 py-3 shadow-sm`}
            >
              <div className={`text-sm ${message.role === 'user' ? 'text-white' : 'text-wellco-text-dark'}`}>
                {message.content}
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-white/70' : 'text-wellco-text-dark/40'
                }`}
              >
                {message.timestamp.toLocaleTimeString('tr-TR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-wellco-primary to-wellco-accent-vibrant text-white flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-white border border-wellco-primary/10 rounded-2xl px-4 py-3">
              <Loader2 className="h-5 w-5 text-wellco-primary animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-wellco-primary/10 p-4 rounded-b-2xl">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın..."
            disabled={isLoading}
            className="flex-1 border-wellco-primary/20 focus:border-wellco-accent-vibrant"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="bg-wellco-accent-vibrant hover:bg-wellco-accent-vibrant/90 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* AI Disclaimer */}
        <div className="text-xs text-wellco-text-dark/40 mt-2 text-center">
          Bu bir AI botudur. Gerçek bir {persona.type === 'expert' ? 'terapist' : 'kişi'} değildir.
        </div>
      </div>
    </div>
  );
}

async function requestDrSerenWebhookResponse(message: string, persona: Persona): Promise<string> {
  const response = await fetch(DR_SEREN_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      persona: persona.slug,
      name: persona.name
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Webhook request failed: ${response.status} ${errorText}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await response.json();
    const reply =
      (typeof data.reply === 'string' && data.reply.trim()) ||
      (typeof data.response === 'string' && data.response.trim()) ||
      (typeof data.message === 'string' && data.message.trim()) ||
      (typeof data.output === 'string' && data.output.trim());

    if (reply) {
      return reply;
    }

    if (Array.isArray(data)) {
      const messages = data
        .map((entry) => {
          if (typeof entry === 'string') return entry.trim();
          if (entry && typeof entry.message === 'string') return entry.message.trim();
          if (entry && typeof entry.text === 'string') return entry.text.trim();
          if (entry && typeof entry.output === 'string') return entry.output.trim();
          return '';
        })
        .filter(Boolean);

      if (messages.length > 0) {
        return messages.join('\n\n');
      }
    }

    return JSON.stringify(data);
  }

  const text = (await response.text()).trim();
  return text || 'Webhook boş yanıt döndürdü.';
}

// Simulated response function (replace with actual AI API call)
function getSimulatedResponse(userMessage: string, persona: Persona): string {
  const responses: Record<string, string[]> = {
    'dr-seren-yilmaz': [
      'Cinsel sağlık konusunda endişeleriniz olması oldukça normaldir. Size nasıl yardımcı olabilirim?',
      'Bu konuda daha fazla bilgiye ihtiyacınız var. Öncelikle, rahatlamanız önemli.',
      'Anladığım kadarıyla kendinizi ifade etmekte zorlanıyorsunuz. Bunun üzerinde birlikte çalışabiliriz.',
    ],
    'sigmund-freud': [
      'İlginç... Bu, bilinçaltınızdan gelen bir sinyal olabilir. Çocukluğunuzda benzer deneyimler yaşadınız mı?',
      'Rüyalarınızı analiz etmek, bastırdığınız duyguları keşfetmenize yardımcı olabilir.',
      'Id, ego ve süperego arasındaki dengesizlik, bu durumun nedeni olabilir.',
    ],
    'carl-jung': [
      'Bu, kolektif bilinçdışınızdan gelen arketipik bir mesaj olabilir.',
      'Gölge benliğinizle yüzleşmek, bireyselleşme sürecinizin önemli bir parçasıdır.',
      'Anima/animus dengenizi kurmak için içsel yolculuğunuza devam etmelisiniz.',
    ],
    'esther-perel': [
      'İlişkilerde yakınlık ve özerklik arasındaki denge her zaman hassas bir dengelemedir.',
      'Partnerinizle yeniden bağlanmak için merak ve oyunculuğu geri getirmeniz gerekebilir.',
      'Arzu, güvenlik ve tahmin edilebilirlikten değil, meraktan ve bilinmeyenden beslenir.',
    ],
    'luna-rose': [
      'Ay ışığı gibi sakin ve huzurlu bir anda seninle buradayım. İçini dökebilirsin.',
      'Yıldızlar bu gece özel bir hikaye anlatıyor. Seninle paylaşmak isterim.',
      'Seninle zaman geçirmek, bir şiiri yavaşça okumak gibi... her an değerli.',
    ],
    'scarlett-vogue': [
      'Harika! Enerjin çok güzel. Bugün ne macera arıyorsun?',
      'Hayat çok kısa sıkıcı şeylerle uğraşmak için. Hadi eğlenelim!',
      'Senin gibi özgüvenli birine bayılıyorum. Devam et!',
    ],
    'yuki-tanaka': [
      'Hoşgeldin. Çay seremonisinde olduğu gibi, her anı özenle yaşamalıyız.',
      'Japonca\'da "Ichi-go ichi-e" denir - her karşılaşma bir kez olur. Şu anı değerlendirelim.',
      'Meditasyon ve iç huzur, ruhun dengesini sağlar. Seninle bunu paylaşmak isterim.',
    ]
  };

  const personaResponses = responses[persona.slug] || [
    'Anlıyorum. Bu konuda size nasıl yardımcı olabilirim?',
    'Paylaştığınız için teşekkür ederim. Devam edelim.',
    'Bu çok ilginç. Daha fazla detay paylaşabilir misiniz?'
  ];

  // Simple random selection (in production, use AI API)
  return personaResponses[Math.floor(Math.random() * personaResponses.length)];
}
