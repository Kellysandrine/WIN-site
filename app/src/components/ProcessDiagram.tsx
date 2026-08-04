import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  icon: LucideIcon;
}

interface ProcessDiagramProps {
  steps: ProcessStep[];
}

export default function ProcessDiagram({ steps }: ProcessDiagramProps) {
  return (
    <div className="relative">
      {/* Connecting line - horizontal on desktop, vertical on mobile */}
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#FF8C00]/30 -translate-y-1/2 z-0" />
      <div className="md:hidden absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#FF8C00]/30 -translate-x-1/2 z-0" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            {/* Circle with number */}
            <div className="relative mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-3 border-[#0022E8] bg-white flex items-center justify-center shadow-lg">
                <step.icon className="w-8 h-8 md:w-10 md:h-10 text-[#0022E8]" />
              </div>
              {/* Number badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FF8C00] text-white flex items-center justify-center font-bold text-sm shadow-md">
                {step.number}
              </div>
            </div>
            {/* Title */}
            <h4 className="text-sm md:text-base font-bold text-[#0022E8]">{step.title}</h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
