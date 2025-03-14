
import React from 'react';
import { Grid2X2, Table as TableIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ViewMode = 'card' | 'table';

interface ViewToggleProps {
  activeView: ViewMode;
  onChange: (view: ViewMode) => void;
  className?: string;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ 
  activeView, 
  onChange,
  className 
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        size="sm"
        variant={activeView === 'card' ? 'default' : 'outline'}
        onClick={() => onChange('card')}
        className="flex items-center gap-1"
      >
        <Grid2X2 className="w-4 h-4" />
        <span className="hidden sm:inline">Картки</span>
      </Button>
      
      <Button
        size="sm"
        variant={activeView === 'table' ? 'default' : 'outline'}
        onClick={() => onChange('table')}
        className="flex items-center gap-1"
      >
        <TableIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Таблиця</span>
      </Button>
    </div>
  );
};

export default ViewToggle;
