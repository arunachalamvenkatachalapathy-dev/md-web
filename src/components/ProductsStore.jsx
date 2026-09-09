import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Check, ArrowUpRight, ShoppingBag, ShieldCheck, X } from 'lucide-react';

export default function ProductsStore() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderEmail, setOrderEmail] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderEmail) return;
    setOrderSubmitted(true);
  };

  return (
    <section id="products" className="py-20 md:py-28 px-6 border-b border-hairline bg-panel/10">
      <div className="max-w-ledger mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber block mb-2">
              FIELD MANUALS & RESEARCH TOOLS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-paper">
              Products & Intelligence
            </h2>
          </div>
          <p className="text-sm text-paper-dim max-w-sm font-sans">
            Independent research toolkits built to immunize your portfolio against viral scams and predatory advice.
          </p>
        </div>

        {/* Products 6-Item Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-hairline">
          {siteConfig.products.map((product) => (
            <div
              key={product.id}
              className="border-r border-b border-hairline p-7 md:p-8 flex flex-col justify-between bg-panel hover:bg-panel-secondary transition-colors relative group"
            >
              <div>
                {/* Product Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono px-2 py-0.5 uppercase bg-ink text-paper-dim border border-hairline">
                    {product.tag}
                  </span>
                  {product.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 uppercase font-semibold text-ink bg-amber">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif text-2xl font-semibold text-paper mb-3 leading-snug group-hover:text-amber transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-paper-dim font-sans leading-relaxed mb-6">
                  {product.subtitle}
                </p>

                {/* Features list */}
                <ul className="space-y-2.5 mb-8 border-t border-hairline/60 pt-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-paper-dim">
                      <Check size={15} className="text-amber shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action Button */}
              <div className="pt-6 border-t border-hairline flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-paper-muted line-through mr-2">
                    {product.priceOriginal}
                  </span>
                  <span className="font-mono text-2xl font-bold text-paper">
                    {product.price}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setOrderSubmitted(false);
                    setOrderEmail('');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase font-semibold text-ink bg-amber hover:bg-amber-hover transition-colors"
                >
                  <span>{product.ctaText}</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Security / Quality guarantee */}
        <div className="mt-8 p-4 bg-panel border border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-paper-dim">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-amber" />
            <span>Direct Digital Delivery · 100% Ad-Free & Sponsor-Free Research</span>
          </div>
          <span>Questions? Contact the research desk at marketdebunk@gmail.com</span>
        </div>

      </div>

      {/* Product Purchase / Inquiry Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-panel border border-hairline max-w-lg w-full p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-paper-dim hover:text-paper"
            >
              <X size={20} />
            </button>

            {!orderSubmitted ? (
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-amber mb-2">
                  Acquire Access
                </div>
                <h3 className="font-serif text-2xl font-semibold text-paper mb-2">
                  {selectedProduct.title}
                </h3>
                <p className="text-sm text-paper-dim mb-6">
                  Price: <strong className="text-paper font-mono text-lg">{selectedProduct.price}</strong> (Instant digital license & download link)
                </p>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-paper-dim uppercase mb-1">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={orderEmail}
                      onChange={(e) => setOrderEmail(e.target.value)}
                      placeholder="investor@example.com"
                      className="w-full px-4 py-3 bg-ink border border-hairline text-paper placeholder:text-paper-muted font-sans text-sm focus:border-amber focus:outline-none"
                    />
                  </div>

                  <div className="text-xs text-paper-muted">
                    We'll email you the direct download bundle and Notion workspace link immediately.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber hover:bg-amber-hover text-ink font-mono text-sm uppercase font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Direct Delivery</span>
                    <ArrowUpRight size={16} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-amber/20 border border-amber flex items-center justify-center mx-auto mb-4 text-amber">
                  <Check size={24} />
                </div>
                <h4 className="font-serif text-2xl font-semibold text-paper mb-2">
                  Dispatch Confirmation
                </h4>
                <p className="text-sm text-paper-dim mb-6 max-w-sm mx-auto">
                  Access instructions for <strong className="text-paper">{selectedProduct.title}</strong> have been prepared for <strong className="text-paper">{orderEmail}</strong>.
                </p>
                <div className="p-3 bg-ink border border-hairline font-mono text-xs text-paper-dim mb-6">
                  Reference: MD-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-2.5 bg-panel-secondary hover:bg-panel text-paper font-mono text-xs uppercase border border-hairline"
                >
                  Return to Store
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
