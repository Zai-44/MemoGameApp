import { Button } from '@/components/ui/button';

interface BotonCreditProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function BotonCredit({
  icon,
  onClick,
  className = '',
}: BotonCreditProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        className={`rounded-full w-14 h-14 p-0 shadow-lg ${className}`}
      >
            <span className='text-2xl font-bold'>C</span>
      </Button>
    </div>
  );
}