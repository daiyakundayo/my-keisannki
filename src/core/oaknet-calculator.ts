export interface OaknetCalculatorInput {
  salePrice: number;
  desiredProfit: number;
  saleShippingCost: number;
  purchaseFeeRate: number;
}

/**
 * オークネット想定の仕入れ可能額を概算します。
 * 購入手数料は販売予想金額に対する割合として扱います。
 */
export const calculateOaknetProcurementPrice = ({
  salePrice,
  desiredProfit,
  saleShippingCost,
  purchaseFeeRate
}: OaknetCalculatorInput): number => {
  const afterInitialDeduction = salePrice * 0.9;
  const purchaseFee = salePrice * purchaseFeeRate;
  const afterExpenses =
    afterInitialDeduction - desiredProfit - saleShippingCost - purchaseFee;
  const finalAmount = afterExpenses * 0.9;

  return Math.round(finalAmount);
};
