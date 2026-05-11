import { motion } from 'framer-motion';

export default function StatsCard({ title, value, icon, description, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-panel p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-muted font-medium">{title}</h3>
        <div className="text-primary bg-primary/10 p-2 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-text-main">{value}</span>
        {description && <span className="text-sm text-text-muted">{description}</span>}
      </div>
    </motion.div>
  );
}
