import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProcurementCalculator from '../../src/components/procurement-calculator';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  }).format(value);

describe('通常仕入れ計算機', () => {
  it('入力値に基づいて仕入れ可能価格を計算する', async () => {
    render(<ProcurementCalculator />);

    const salePriceInput = screen.getByLabelText('販売予想金額') as HTMLInputElement;
    fireEvent.change(salePriceInput, { target: { value: '20000' } });

    const profitSlider = screen.getByLabelText('希望利益額') as HTMLInputElement;
    fireEvent.change(profitSlider, { target: { value: '5000' } });

    const saleShippingButton = screen.getByRole('button', {
      name: formatCurrency(750)
    });
    fireEvent.click(saleShippingButton);

    const purchaseShippingInput = screen.getByLabelText('購入送料') as HTMLInputElement;
    fireEvent.change(purchaseShippingInput, { target: { value: '480' } });

    await waitFor(() => {
      expect(screen.getByText(formatCurrency(10593))).toBeInTheDocument();
    });
  });
});
