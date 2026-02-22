import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="fixed bottom-10 left-1/2 z-[200] bg-white text-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px]"
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="font-bold text-sm">{message}</p>
          <button 
            onClick={onClose}
            className="ml-auto p-1 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
