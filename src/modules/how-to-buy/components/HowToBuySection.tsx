import { Layers, SlidersHorizontal, Wallet } from 'lucide-react';
import { HOW_TO_BUY_STEPS, type HowToBuyStep } from '../data/howToBuy.data';
import './HowToBuySection.css';

function renderStepIcon(iconName: HowToBuyStep['iconName']) {
  switch (iconName) {
    case 'layers':
      return <Layers size={24} strokeWidth={2} aria-hidden="true" />;
    case 'sliders':
      return <SlidersHorizontal size={24} strokeWidth={2} aria-hidden="true" />;
    case 'wallet':
      return <Wallet size={24} strokeWidth={2} aria-hidden="true" />;
  }
}

export function HowToBuySection() {
  return (
    <section id="como-comprar" className="how-to-buy" aria-labelledby="how-to-buy-heading">
      <div className="container">
        <h2 id="how-to-buy-heading" className="how-to-buy__heading font-display">
          Cómo trabajamos
        </h2>

        <div className="how-to-buy__grid">
          {HOW_TO_BUY_STEPS.map((step) => (
            <article
              key={step.id}
              className="how-to-buy__card"
              style={{ backgroundColor: step.pastelVar }}
            >
              <div className="how-to-buy__icon">{renderStepIcon(step.iconName)}</div>
              <h3 className="how-to-buy__title font-display">{step.title}</h3>
              <p className="how-to-buy__desc">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
