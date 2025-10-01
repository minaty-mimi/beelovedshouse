import React, { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { PromoCode } from '@/types/ecommerce';

interface PromoCodeInputProps {
  subtotal: number;
  onApply: (discount: number, code: PromoCode) => void;
  onRemove: () => void;
  appliedCode?: PromoCode;
}

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  subtotal,
  onApply,
  onRemove,
  appliedCode,
}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateAndApplyCode = async () => {
    if (!code.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (!supabase) {
        setError('Database connection error');
        setLoading(false);
        return;
      }

      // Fetch promo code from database
      const { data: promoData, error: fetchError } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('active', true)
        .single();

      if (fetchError || !promoData) {
        setError('Invalid promo code');
        setLoading(false);
        return;
      }

      const promo = promoData as PromoCode;

      // Validate promo code
      const now = new Date();
      const validFrom = new Date(promo.valid_from);
      const validUntil = promo.valid_until ? new Date(promo.valid_until) : null;

      if (now < validFrom) {
        setError('This promo code is not yet active');
        setLoading(false);
        return;
      }

      if (validUntil && now > validUntil) {
        setError('This promo code has expired');
        setLoading(false);
        return;
      }

      if (promo.usage_limit && promo.times_used >= promo.usage_limit) {
        setError('This promo code has reached its usage limit');
        setLoading(false);
        return;
      }

      if (promo.min_purchase_amount && subtotal < promo.min_purchase_amount) {
        setError(`Minimum purchase of ₦${promo.min_purchase_amount.toLocaleString()} required`);
        setLoading(false);
        return;
      }

      // Calculate discount
      let discount = 0;
      if (promo.discount_type === 'percentage') {
        discount = (subtotal * promo.discount_value) / 100;
        if (promo.max_discount_amount) {
          discount = Math.min(discount, promo.max_discount_amount);
        }
      } else {
        discount = promo.discount_value;
      }

      discount = Math.min(discount, subtotal); // Can't discount more than subtotal

      onApply(discount, promo);
      setCode('');
      setLoading(false);
    } catch (err) {
      console.error('Error applying promo code:', err);
      setError('Failed to apply promo code');
      setLoading(false);
    }
  };

  if (appliedCode) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-green-900">
              Code "{appliedCode.code}" Applied!
            </div>
            {appliedCode.description && (
              <div className="text-sm text-green-700">
                {appliedCode.description}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onRemove}
          className="p-2 hover:bg-green-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-green-700" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                validateAndApplyCode();
              }
            }}
            placeholder="Enter promo code"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 uppercase"
            disabled={loading}
          />
        </div>
        <button
          onClick={validateAndApplyCode}
          disabled={loading || !code.trim()}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Checking...' : 'Apply'}
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-600 flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="text-xs text-gray-500">
        Have a promo code? Enter it above to get a discount!
      </div>
    </div>
  );
};
