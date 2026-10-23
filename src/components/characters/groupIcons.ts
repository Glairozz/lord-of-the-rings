import {
  Crown,
  Flame,
  PawPrint,
  Pickaxe,
  Rabbit,
  Shield,
  Sparkles,
  Sword,
  Swords,
  Trees,
  Wand,
  type LucideIcon,
} from 'lucide-react';

export const groupIcons: Record<string, LucideIcon> = {
  Rabbit,
  Sword,
  Trees,
  Pickaxe,
  Wand,
  Shield,
  Swords,
  Flame,
  Crown,
  Sparkles,
};

export function getGroupIcon(icon: string): LucideIcon {
  return groupIcons[icon] ?? PawPrint;
}
