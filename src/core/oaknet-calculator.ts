export interface OaknetCalculatorInput {
  salePrice: number;
  desiredProfit: number;
  saleShippingCost: number;
  purchaseFeeRate: number;
}

export const calculateOaknetProcurementPrice = ({
  salePrice,
  desiredProfit,
  saleShippingCost,
  purchaseFeeRate
}: OaknetCalculatorInput): number => {
  const afterInitialDeduction = salePrice * 0.9;
  const afterDesiredProfit = afterInitialDeduction - desiredProfit;
  const afterSaleShipping = afterDesiredProfit - saleShippingCost;
  const feeBase = Math.max(afterSaleShipping, 0);
  const afterPurchaseFee = afterSaleShipping - feeBase * purchaseFeeRate;
  const finalAmount = afterPurchaseFee * 0.9;

  return Math.round(finalAmount);
};
