import { describe, expect, it } from 'vitest';
import { calculateOaknetProcurementPrice } from '../../src/core/oaknet-calculator';

describe('calculateOaknetProcurementPrice', () => {
  it('購入手数料が6%の場合に仕入れ可能額を算出する', () => {
    const procurementPrice = calculateOaknetProcurementPrice({
      salePrice: 20000,
      desiredProfit: 5000,
      saleShippingCost: 750,
      purchaseFeeRate: 0.06
    });

    expect(procurementPrice).toBe(10364);
  });

  it('条件が厳しい場合にマイナスの仕入れ額を返す', () => {
    const procurementPrice = calculateOaknetProcurementPrice({
      salePrice: 10000,
      desiredProfit: 9000,
      saleShippingCost: 1400,
      purchaseFeeRate: 0.06
    });

    expect(procurementPrice).toBe(-1260);
  });
});
