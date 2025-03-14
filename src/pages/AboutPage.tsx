
import React from 'react';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn, SlideUp } from '@/components/ui/motion';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 max-w-4xl mx-auto pt-32 pb-20">
        <FadeIn>
          <Link 
            to="/" 
            className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Назад до всіх термінів</span>
          </Link>
        </FadeIn>
        
        <div className="space-y-8">
          <SlideUp delay={100}>
            <h1 className="text-3xl md:text-4xl font-medium">Про проект</h1>
          </SlideUp>
          
          <SlideUp delay={200}>
            <div className="prose prose-lg max-w-none text-foreground/90">
              <p className="leading-relaxed">
                Цей проект є цифровою версією "Словника термінів у сфері штучного інтелекту", розробленого для полегшення розуміння термінології у галузі ШІ українською мовою.
              </p>
              <p className="leading-relaxed">
                Словник створений з метою стандартизації україномовної термінології у сфері штучного інтелекту та забезпечення чіткого розуміння ключових концепцій.
              </p>
              <p className="leading-relaxed">
                Проект допомагає подолати мовний бар'єр та сприяє розвитку україномовної спільноти у сфері штучного інтелекту, надаючи доступ до структурованої термінологічної бази даних.
              </p>
              <p className="leading-relaxed">
                Ми прагнемо підтримувати словник в актуальному стані, враховуючи швидкі темпи розвитку технологій штучного інтелекту та поповнення термінологічної бази.
              </p>
            </div>
          </SlideUp>
          
          <SlideUp delay={300}>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Термінопедія © 2023-2024
                </span>
                
                <Link to="/sources" className="inline-flex items-center text-sm text-primary hover:underline">
                  <span>Джерела та посилання</span>
                </Link>
              </div>
            </div>
          </SlideUp>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
