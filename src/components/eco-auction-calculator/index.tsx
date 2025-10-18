import { useMemo, useState } from 'react';
import { calculateProcurementPrice } from '../../core/procurement-calculator';
import '../procurement-calculator/styles.css';

const desiredProfitBounds = {
  min: 3000,
  max: 20000,
  step: 1000
} as const;

const saleShippingOptions = [0, 160, 210, 215, 450, 750, 850, 1050, 1200, 1400] as const;
const purchaseFeeOptions = [550, 2200] as const;

const currencyFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY'
});

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const EcoAuctionCalculator = () => {
  const [salePriceInput, setSalePriceInput] = useState<string>('');
  const [desiredProfit, setDesiredProfit] = useState<number>(desiredProfitBounds.min);
  const [saleShippingIndex, setSaleShippingIndex] = useState<number>(0);
  const [purchaseFeeIndex, setPurchaseFeeIndex] = useState<number>(0);

  const salePrice = useMemo(() => {
    if (salePriceInput.trim() === '') {
      return NaN;
    }

    const parsed = Number(salePriceInput.replace(/,/g, ''));
    return Number.isNaN(parsed) ? NaN : parsed;
  }, [salePriceInput]);

  const saleShippingCost = saleShippingOptions[saleShippingIndex] ?? saleShippingOptions[0];
  const purchaseFee = purchaseFeeOptions[purchaseFeeIndex] ?? purchaseFeeOptions[0];

  const procurementPrice = useMemo(() => {
    if (!Number.isFinite(salePrice) || salePrice <= 0) {
      return null;
    }

    return calculateProcurementPrice({
      salePrice,
      desiredProfit,
      saleShippingCost,
      purchaseShippingCost: purchaseFee
    });
  }, [salePrice, desiredProfit, saleShippingCost, purchaseFee]);

  return (
    <section className="calculator">
      <div className="calculator__result">
        <h2>エコオク仕入れ価格</h2>
        <p className="calculator__result-value">
          {procurementPrice === null ? '---' : currencyFormatter.format(procurementPrice)}
        </p>
        {procurementPrice !== null && procurementPrice < 0 && (
          <p className="calculator__result-warning">
            希望利益や手数料が高いため、仕入れ可能価格がマイナスになっています。
          </p>
        )}
      </div>

      <div className="calculator__grid">
        <div className="calculator__field">
          <div className="calculator__field-header">
            <label htmlFor="ecoSalePrice" className="calculator__label">
              販売予想金額
            </label>
            <span className="calculator__value">
              {salePrice > 0 ? currencyFormatter.format(salePrice) : '---'}
            </span>
          </div>
          <div className="calculator__input-wrapper">
            <span className="calculator__prefix">¥</span>
            <input
              id="ecoSalePrice"
              name="ecoSalePrice"
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
          <p className="calculator__hint">任意の金額を直接入力してください。</p>
        </div>

        <div className="calculator__field">
          <div className="calculator__field-header">
            <label htmlFor="ecoDesiredProfit" className="calculator__label">
              希望利益額
            </label>
            <span className="calculator__value">{currencyFormatter.format(desiredProfit)}</span>
          </div>
          <input
            id="ecoDesiredProfit"
            name="ecoDesiredProfit"
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
          <p className="calculator__hint">スライダーで希望利益を 1,000 円刻みで調整できます。</p>
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
          <p className="calculator__hint">ボタンから該当する販売送料を選択してください。</p>
        </div>

        <div className="calculator__field">
          <div className="calculator__field-header">
            <span className="calculator__label">購入手数料</span>
            <span className="calculator__value">{currencyFormatter.format(purchaseFee)}</span>
          </div>
          <div className="calculator__button-group" role="group" aria-label="購入手数料">
            {purchaseFeeOptions.map((option, index) => (
              <button
                key={option}
                type="button"
                className={`calculator__chip${
                  purchaseFeeIndex === index ? ' calculator__chip--active' : ''
                }`}
                onClick={() => setPurchaseFeeIndex(index)}
              >
                {currencyFormatter.format(option)}
              </button>
            ))}
          </div>
          <p className="calculator__hint">購入手数料は 550 円または 2,200 円から選択してください。</p>
        </div>
      </div>
    </section>
  );
};

export default EcoAuctionCalculator;
