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

    expect(procurementPrice).toBe(9945);
  });

  it('希望利益が大きすぎる場合はマイナスになるケースを返す', () => {
    const procurementPrice = calculateOaknetProcurementPrice({
      salePrice: 10000,
      desiredProfit: 7500,
      saleShippingCost: 1400,
      purchaseFeeRate: 0.06
    });

    expect(procurementPrice).toBe(-450);
  });
});
