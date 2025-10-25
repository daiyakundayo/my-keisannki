import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import OaknetCalculator from '../../src/components/oaknet-calculator';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  }).format(value);

describe('オークネット計算機', () => {
  it('入力値と手数料率に応じた仕入れ上限を表示する', async () => {
    render(<OaknetCalculator />);

    const salePriceInput = screen.getByLabelText('販売予想金額') as HTMLInputElement;
    fireEvent.change(salePriceInput, { target: { value: '20000' } });

    const profitSlider = screen.getByLabelText('希望利益額') as HTMLInputElement;
    fireEvent.change(profitSlider, { target: { value: '5000' } });

    const saleShippingButton = screen.getByRole('button', {
      name: formatCurrency(750)
    });
    fireEvent.click(saleShippingButton);

    await waitFor(() => {
      expect(screen.getByText(formatCurrency(9945))).toBeInTheDocument();
    });
  });

  it('購入手数料率を4%に切り替えると結果が更新される', async () => {
    render(<OaknetCalculator />);

    const salePriceInput = screen.getByLabelText('販売予想金額') as HTMLInputElement;
    fireEvent.change(salePriceInput, { target: { value: '20000' } });

    const profitSlider = screen.getByLabelText('希望利益額') as HTMLInputElement;
    fireEvent.change(profitSlider, { target: { value: '5000' } });

    const saleShippingButton = screen.getByRole('button', {
      name: formatCurrency(750)
    });
    fireEvent.click(saleShippingButton);

    const feeRateButton = screen.getByRole('button', { name: '4%' });
    fireEvent.click(feeRateButton);

    await waitFor(() => {
      expect(screen.getByText(formatCurrency(10305))).toBeInTheDocument();
    });
  });
});
