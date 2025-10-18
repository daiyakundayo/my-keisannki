import { useState } from 'react';
import ProcurementCalculator from './components/procurement-calculator';
import EcoAuctionCalculator from './components/eco-auction-calculator';

const App = () => {
  const [activeView, setActiveView] = useState<'procurement' | 'eco'>('procurement');

  return (
    <main className="app">
      <h1>仕入れ値計算ツール</h1>

      <div className="view-toggle" role="tablist" aria-label="計算機の選択">
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
      </div>

      {activeView === 'procurement' ? <ProcurementCalculator /> : <EcoAuctionCalculator />}
    </main>
  );
};

export default App;
