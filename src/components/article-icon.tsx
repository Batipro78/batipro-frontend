'use client';

import {
  CircuitBoard, ToggleLeft, Plug, Cable, Cylinder, LayoutGrid, Box, Link,
  Lightbulb, Lamp, Bell, Thermometer, ShieldAlert, Fan, Heater, Timer,
  Droplets, Bath, Toilet, Container, PipetteIcon, GitMerge, Gauge, Flame, ShowerHead,
  Columns3, Settings, Wrench, Zap,
} from 'lucide-react';
import { type ArticleIconName, getArticleIcon } from '@/lib/article-icons';

const ICON_MAP: Record<ArticleIconName, React.ComponentType<{ className?: string }>> = {
  'circuit-board': CircuitBoard,
  'toggle-left': ToggleLeft,
  'plug': Plug,
  'cable': Cable,
  'tube': Cylinder,
  'layout-grid': LayoutGrid,
  'box': Box,
  'link': Link,
  'lightbulb': Lightbulb,
  'lamp': Lamp,
  'bell': Bell,
  'thermometer': Thermometer,
  'shield-alert': ShieldAlert,
  'fan': Fan,
  'heater': Heater,
  'timer': Timer,
  'droplets': Droplets,
  'bath': Bath,
  'toilet': Toilet,
  'sink': Container,
  'pipe': PipetteIcon,
  'git-merge': GitMerge,
  'gauge': Gauge,
  'flame': Flame,
  'shower-head': ShowerHead,
  'radiator': Columns3,
  'settings': Settings,
  'wrench': Wrench,
  'zap': Zap,
};

const ELEC_BG = 'bg-amber-50 text-amber-600';
const PLOMB_BG = 'bg-blue-50 text-blue-600';

interface ArticleIconProps {
  articleName: string;
  metier: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ArticleIcon({ articleName, metier, size = 'sm' }: ArticleIconProps) {
  const iconName = getArticleIcon(articleName, metier);
  const Icon = ICON_MAP[iconName];
  const colorClass = metier === 'plombier' ? PLOMB_BG : ELEC_BG;

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
      <Icon className={iconSizes[size]} />
    </div>
  );
}
