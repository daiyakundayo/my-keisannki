import { describe, expect, it } from 'vitest';
import { calculateProcurementPrice } from '../../src/core/procurement-calculator';

describe('calculateProcurementPrice', () => {
  it('期待利益と送料を考慮した仕入れ可能価格を返す', () => {
    const procurementPrice = calculateProcurementPrice({
      salePrice: 20000,
      desiredProfit: 5000,
      saleShippingCost: 750,
      purchaseShippingCost: 480
    });

    expect(procurementPrice).toBe(10593);
  });

  it('費用合計が高く仕入れ可能価格が負になるケースを処理する', () => {
    const procurementPrice = calculateProcurementPrice({
      salePrice: 10000,
      desiredProfit: 8000,
      saleShippingCost: 1400,
      purchaseShippingCost: 3470
    });

    expect(procurementPrice).toBe(-3483);
  });
});
