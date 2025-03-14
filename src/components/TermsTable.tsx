
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Term } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/motion';

interface TermsTableProps {
  terms: Term[];
  relatedTermsMap: Record<string, string[]>;
}

const TermsTable: React.FC<TermsTableProps> = ({ terms, relatedTermsMap }) => {
  return (
    <FadeIn>
      <Table className="border border-border/50 rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Термін (UA)</TableHead>
            <TableHead>Термін (EN)</TableHead>
            <TableHead>Визначення</TableHead>
            <TableHead>Пов'язані терміни</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {terms.map((term) => (
            <TableRow key={term.id}>
              <TableCell className="font-medium">
                <Link 
                  to={`/term/${term.id}`}
                  className="hover:text-primary hover:underline inline-flex items-center gap-1"
                >
                  {term.termUA}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </TableCell>
              <TableCell>{term.termEN}</TableCell>
              <TableCell className="max-w-md">
                <p className="line-clamp-2">{term.definition}</p>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {relatedTermsMap[term.id]?.slice(0, 2).map((name, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {name}
                    </Badge>
                  ))}
                  {(relatedTermsMap[term.id]?.length || 0) > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{(relatedTermsMap[term.id]?.length || 0) - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FadeIn>
  );
};

export default TermsTable;
