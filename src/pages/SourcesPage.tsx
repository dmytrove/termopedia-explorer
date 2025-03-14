
import React from 'react';
import Header from '@/components/Header';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SourcesPage = () => {
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
            <h1 className="text-3xl md:text-4xl font-medium">Джерела та посилання</h1>
          </SlideUp>
          
          <SlideUp delay={200}>
            <div className="prose prose-lg max-w-none text-foreground/90">
              <p className="leading-relaxed">
                Нижче наведені джерела, які використовувалися для створення словника термінів у сфері штучного інтелекту. 
                Ці ресурси охоплюють різні аспекти ШІ та надають додаткову інформацію для поглибленого вивчення.
              </p>
            </div>
          </SlideUp>
          
          <SlideUp delay={300}>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card border border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Офіційні документи</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SourceItem href="https://zakon.rada.gov.ua" label="Законодавство України" />
                  <SourceItem href="https://mon.gov.ua" label="Міністерство освіти і науки України" />
                  <SourceItem href="https://mdu.edu.ua" label="Методичні рекомендації щодо розроблення стандартів вищої освіти" />
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Міжнародні ресурси</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SourceItem href="https://www.iso.org" label="Міжнародна організація зі стандартизації (ISO)" />
                  <SourceItem href="https://www.ieee.org" label="IEEE (Institute of Electrical and Electronics Engineers)" />
                  <SourceItem href="https://ai.stanford.edu" label="Stanford AI Lab" />
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Академічні видання</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SourceItem href="#" label="Посібник 'Вступ до штучного інтелекту'" />
                  <SourceItem href="#" label="Енциклопедія штучного інтелекту" />
                  <SourceItem href="#" label="Наукові журнали з штучного інтелекту" />
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Онлайн-ресурси</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SourceItem href="https://deepmind.com" label="DeepMind" />
                  <SourceItem href="https://openai.com" label="OpenAI" />
                  <SourceItem href="https://ai.google" label="Google AI" />
                </CardContent>
              </Card>
            </div>
          </SlideUp>
          
          <SlideUp delay={400}>
            <div className="pt-4 mt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Цей словник створено на основі існуючих термінологічних баз даних, наукових публікацій, 
                стандартів та рекомендацій в галузі штучного інтелекту. Перелік джерел постійно оновлюється 
                та доповнюється для відображення актуального стану розвитку галузі.
              </p>
            </div>
          </SlideUp>
        </div>
      </div>
    </main>
  );
};

interface SourceItemProps {
  href: string;
  label: string;
}

const SourceItem: React.FC<SourceItemProps> = ({ href, label }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-between p-2 text-sm rounded-md hover:bg-accent transition-colors"
    >
      <span>{label}</span>
      <ExternalLink size={14} className="text-muted-foreground" />
    </a>
  );
};

export default SourcesPage;
