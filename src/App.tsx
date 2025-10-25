import { useState } from 'react';
import ProcurementCalculator from './components/procurement-calculator';
import EcoAuctionCalculator from './components/eco-auction-calculator';
import OaknetCalculator from './components/oaknet-calculator';

type CalculatorView = 'procurement' | 'eco' | 'oaknet';

const App = () => {
  const [activeView, setActiveView] = useState<CalculatorView>('procurement');

  return (
    <main className="app">
      <h1>仕入れ値計算機</h1>

      <div className="view-toggle" role="tablist" aria-label="計算機の切り替え">
        <button
          type="button"
          role="tab"
          aria-selected={activeView === 'procurement'}
          className={`view-toggle__button${
            activeView === 'procurement' ? ' view-toggle__button--active' : ''
          }`}
          onClick={() => setActiveView('procurement')}
        >
          通常仕入れ計算機
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeView === 'eco'}
          className={`view-toggle__button${activeView === 'eco' ? ' view-toggle__button--active' : ''}`}
          onClick={() => setActiveView('eco')}
        >
          エコオク計算機
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeView === 'oaknet'}
          className={`view-toggle__button${
            activeView === 'oaknet' ? ' view-toggle__button--active' : ''
          }`}
          onClick={() => setActiveView('oaknet')}
        >
          オークネット計算機
        </button>
      </div>

      {activeView === 'procurement' && <ProcurementCalculator />}
      {activeView === 'eco' && <EcoAuctionCalculator />}
      {activeView === 'oaknet' && <OaknetCalculator />}
    </main>
  );
};

export default App;
