export interface ProcurementCalculatorInput {
  salePrice: number;
  desiredProfit: number;
  saleShippingCost: number;
  purchaseShippingCost: number;
}

export const calculateProcurementPrice = ({
  salePrice,
  desiredProfit,
  saleShippingCost,
  purchaseShippingCost
}: ProcurementCalculatorInput): number => {
  const afterInitialDeduction = salePrice * 0.9;
  const afterExpenses =
    afterInitialDeduction - desiredProfit - saleShippingCost - purchaseShippingCost;
  const finalAmount = afterExpenses * 0.9;

  return Math.round(finalAmount);
};
