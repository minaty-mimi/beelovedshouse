import React from 'react';
import { Package, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { StockStatus } from '@/types/ecommerce';

interface StockBadgeProps {
  quantity?: number;
  status?: StockStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StockBadge: React.FC<StockBadgeProps> = ({
  quantity = 0,
  status = 'in_stock',
  showIcon = true,
  size = 'md',
}) => {
  const getStockInfo = () => {
    switch (status) {
      case 'unlimited':
        return {
          text: 'In Stock',
          icon: CheckCircle,
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-600',
        };
      case 'out_of_stock':
        return {
          text: 'Out of Stock',
          icon: XCircle,
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          iconColor: 'text-red-600',
        };
      case 'low_stock':
        return {
          text: `Only ${quantity} left!`,
          icon: AlertTriangle,
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-700',
          iconColor: 'text-orange-600',
        };
      case 'in_stock':
      default:
        return {
          text: `${quantity} in stock`,
          icon: Package,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-600',
        };
    }
  };

  const stockInfo = getStockInfo();
  const Icon = stockInfo.icon;

  const sizeClasses = {
    sm: {
      badge: 'px-2 py-1 text-xs',
      icon: 'w-3 h-3',
    },
    md: {
      badge: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4',
    },
    lg: {
      badge: 'px-4 py-2 text-base',
      icon: 'w-5 h-5',
    },
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full font-semibold ${stockInfo.bgColor} ${stockInfo.textColor} ${sizeClasses[size].badge}`}
    >
      {showIcon && <Icon className={`${sizeClasses[size].icon} ${stockInfo.iconColor}`} />}
      <span>{stockInfo.text}</span>
    </div>
  );
};

// Simpler text-only version
export const StockText: React.FC<StockBadgeProps> = ({
  quantity = 0,
  status = 'in_stock',
}) => {
  const getStockInfo = () => {
    switch (status) {
      case 'unlimited':
        return { text: 'In Stock', color: 'text-green-600' };
      case 'out_of_stock':
        return { text: 'Out of Stock', color: 'text-red-600' };
      case 'low_stock':
        return { text: `Only ${quantity} left!`, color: 'text-orange-600' };
      case 'in_stock':
      default:
        return { text: `${quantity} in stock`, color: 'text-blue-600' };
    }
  };

  const stockInfo = getStockInfo();

  return (
    <span className={`text-sm font-semibold ${stockInfo.color}`}>
      {stockInfo.text}
    </span>
  );
};
