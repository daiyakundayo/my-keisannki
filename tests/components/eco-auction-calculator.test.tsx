import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import EcoAuctionCalculator from '../../src/components/eco-auction-calculator';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  }).format(value);

describe('エコオク計算機', () => {
  it('購入手数料をボタンで選択して計算する', async () => {
    render(<EcoAuctionCalculator />);

    const salePriceInput = screen.getByLabelText('販売予想金額') as HTMLInputElement;
    fireEvent.change(salePriceInput, { target: { value: '20000' } });

    const profitSlider = screen.getByLabelText('希望利益額') as HTMLInputElement;
    fireEvent.change(profitSlider, { target: { value: '5000' } });

    const saleShippingButton = screen.getByRole('button', {
      name: formatCurrency(750)
    });
    fireEvent.click(saleShippingButton);

    const purchaseFeeButton = screen.getByRole('button', {
      name: formatCurrency(550)
    });
    fireEvent.click(purchaseFeeButton);

    await waitFor(() => {
      expect(screen.getByText(formatCurrency(10530))).toBeInTheDocument();
    });
  });
});
