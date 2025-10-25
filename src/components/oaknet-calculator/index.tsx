import { useMemo, useState } from 'react';
import { calculateOaknetProcurementPrice } from '../../core/oaknet-calculator';
import '../procurement-calculator/styles.css';

const desiredProfitBounds = {
  min: 3000,
  max: 20000,
  step: 1000
} as const;

const saleShippingOptions = [0, 160, 210, 215, 450, 750, 850, 1050, 1200, 1400] as const;
const purchaseFeeRateOptions = [
  { rate: 0.06, label: '6%' },
  { rate: 0.04, label: '4%' }
] as const;

const currencyFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY'
});

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const OaknetCalculator = () => {
  const [salePriceInput, setSalePriceInput] = useState<string>('');
  const [desiredProfit, setDesiredProfit] = useState<number>(desiredProfitBounds.min);
  const [saleShippingIndex, setSaleShippingIndex] = useState<number>(0);
  const [purchaseFeeRateIndex, setPurchaseFeeRateIndex] = useState<number>(0);

  const salePrice = useMemo(() => {
    if (salePriceInput.trim() === '') {
      return NaN;
    }

    const parsed = Number(salePriceInput.replace(/,/g, ''));
    return Number.isNaN(parsed) ? NaN : parsed;
  }, [salePriceInput]);

  const saleShippingCost = saleShippingOptions[saleShippingIndex] ?? saleShippingOptions[0];
  const selectedPurchaseFeeRate =
    purchaseFeeRateOptions[purchaseFeeRateIndex]?.rate ?? purchaseFeeRateOptions[0].rate;

  const purchaseFeeAmount = useMemo(() => {
    if (!Number.isFinite(salePrice) || salePrice <= 0) {
      return 0;
    }

    const afterInitialDeduction = salePrice * 0.9;
    const afterDesiredProfit = afterInitialDeduction - desiredProfit;
    const afterSaleShipping = afterDesiredProfit - saleShippingCost;
    const feeBase = Math.max(afterSaleShipping, 0);

    return Math.round(feeBase * selectedPurchaseFeeRate);
  }, [salePrice, desiredProfit, saleShippingCost, selectedPurchaseFeeRate]);

  const procurementPrice = useMemo(() => {
    if (!Number.isFinite(salePrice) || salePrice <= 0) {
      return null;
    }

    return calculateOaknetProcurementPrice({
      salePrice,
      desiredProfit,
      saleShippingCost,
      purchaseFeeRate: selectedPurchaseFeeRate
    });
  }, [salePrice, desiredProfit, saleShippingCost, selectedPurchaseFeeRate]);

  return (
    <section className="calculator">
      <div className="calculator__result">
        <h2>オークネット仕入れ上限</h2>
        <p className="calculator__result-value">
          {procurementPrice === null ? '---' : currencyFormatter.format(procurementPrice)}
        </p>
        {procurementPrice !== null && procurementPrice < 0 && (
          <p className="calculator__result-warning">
            希望利益や経費の条件を見直さないと仕入れがマイナスになります。
          </p>
        )}
      </div>

      <div className="calculator__grid">
        <div className="calculator__field">
          <div className="calculator__field-header">
            <label htmlFor="oaknetSalePrice" className="calculator__label">
              販売予想金額
            </label>
            <span className="calculator__value">
              {salePrice > 0 ? currencyFormatter.format(salePrice) : '---'}
            </span>
          </div>
          <div className="calculator__input-wrapper">
            <span className="calculator__prefix">¥</span>
            <input
              id="oaknetSalePrice"
              name="oaknetSalePrice"
              type="number"
              className="calculator__input"
              min={0}
              step={100}
              inputMode="numeric"
              value={salePriceInput}
              onChange={(event) => setSalePriceInput(event.target.value)}
              placeholder="例: 25000"
            />
          </div>
          <p className="calculator__hint">1台あたりの販売予想金額を入力してください。</p>
        </div>

        <div className="calculator__field">
          <div className="calculator__field-header">
            <label htmlFor="oaknetDesiredProfit" className="calculator__label">
              希望利益額
            </label>
            <span className="calculator__value">{currencyFormatter.format(desiredProfit)}</span>
          </div>
          <input
            id="oaknetDesiredProfit"
            name="oaknetDesiredProfit"
            type="range"
            className="calculator__slider"
            min={desiredProfitBounds.min}
            max={desiredProfitBounds.max}
            step={desiredProfitBounds.step}
            value={desiredProfit}
            onChange={(event) =>
              setDesiredProfit(
                clamp(Number(event.target.value), desiredProfitBounds.min, desiredProfitBounds.max)
              )
            }
          />
          <div className="calculator__scale">
            <span>{currencyFormatter.format(desiredProfitBounds.min)}</span>
            <span>{currencyFormatter.format(desiredProfitBounds.max)}</span>
          </div>
          <p className="calculator__hint">スライダーで希望利益を 1,000 円単位で調整できます。</p>
        </div>

        <div className="calculator__field">
          <div className="calculator__field-header">
            <span className="calculator__label">販売送料</span>
            <span className="calculator__value">{currencyFormatter.format(saleShippingCost)}</span>
          </div>
          <div className="calculator__button-group" role="group" aria-label="販売送料">
            {saleShippingOptions.map((option, index) => (
              <button
                key={option}
                type="button"
                className={`calculator__chip${
                  saleShippingIndex === index ? ' calculator__chip--active' : ''
                }`}
                onClick={() => setSaleShippingIndex(index)}
              >
                {currencyFormatter.format(option)}
              </button>
            ))}
          </div>
          <p className="calculator__hint">ボタンを押して想定される販売送料を選択してください。</p>
        </div>

        <div className="calculator__field">
          <div className="calculator__field-header">
            <span className="calculator__label">購入手数料</span>
            <span className="calculator__value">{currencyFormatter.format(purchaseFeeAmount)}</span>
          </div>
          <div className="calculator__button-group" role="group" aria-label="購入手数料率">
            {purchaseFeeRateOptions.map((option, index) => (
              <button
                key={option.label}
                type="button"
                className={`calculator__chip${
                  purchaseFeeRateIndex === index ? ' calculator__chip--active' : ''
                }`}
                onClick={() => setPurchaseFeeRateIndex(index)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="calculator__hint">ボタンを切り替えて手数料率（6% / 4%）を選択してください。</p>
        </div>
      </div>
    </section>
  );
};

export default OaknetCalculator;
