import { motion } from 'framer-motion';

export default function StatsCard({ title, value, icon, description, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -z-10 group-hover:bg-primary/20 transition-all duration-500 translate-x-1/2 -translate-y-1/2"></div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-text-muted font-bold tracking-wide uppercase text-xs">{title}</h3>
        <div className="p-2 rounded-xl bg-dark-surface/80 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2 relative z-10">
        <span className="text-4xl font-black text-text-main drop-shadow-md">{value}</span>
        {description && <span className="text-sm font-semibold text-text-muted uppercase tracking-wider">{description}</span>}
      </div>
    </motion.div>
  );
}
