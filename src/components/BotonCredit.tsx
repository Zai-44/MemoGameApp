import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={onClick}
        className={`rounded-full w-14 h-14 p-0 shadow-lg ${className}`}
      >
        <span className='text-2xl font-bold'>C</span>
      </Button>
    </motion.div>
  );
}