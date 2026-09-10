import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ShoppingBag, CreditCard, CheckCircle2, RotateCcw, ShieldCheck, Sparkles, History, Smartphone, DollarSign } from 'lucide-react';

export default function EconomyView({ onOpenAuth }) {
  const { activeGame, isAuthenticated, addToast, role } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('GOOGLE_PLAY');

  const isOpsOrAdmin = ['LIVE_OPS_MANAGER', 'ADMIN'].includes(role);

  const STORE_ITEMS = [
    {
      id: 'gems_100',
      name: '100 Cyber Gems',
      amount: '1.99',
      currency: 'USD',
      icon: '💎',
      badge: 'POPULAR',
      description: 'Instant premium currency to unlock loot caches and fast-track research.'
    },
    {
      id: 'gems_550',
      name: '550 Cyber Gems + Crate',
      amount: '9.99',
      currency: 'USD',
      icon: '💎✨',
      badge: '+10% BONUS',
      description: 'Best value gem pack including 1x Mythic Weapon Shard crate.'
    },
    {
      id: 'battle_pass_s4',
      name: 'Season 4 Cyber Pass Elite',
      amount: '19.99',
      currency: 'USD',
      icon: '🎟️',
      badge: 'SEASON PASS',
      description: 'Unlock 80 tiers of exclusive animated avatars, banners, and weapon coatings.'
    },
    {
      id: 'bundle_mecha_skin',
      name: 'Vanguard Quantum Mech Skin',
      amount: '29.99',
      currency: 'USD',
      icon: '🤖',
      badge: 'LEGENDARY',
      description: 'Exclusive holographic cyber mech suit with custom audio fx & kill animation.'
    }
  ];

  const fetchPurchases = async () => {
    if (!isAuthenticated || !activeGame) return;
    setLoadingHistory(true);
    try {
      // Ensure player profile exists
      await api.players.get(activeGame.id).catch(() => null);
      const list = await api.purchases.history(activeGame.id);
      setPurchases(list || []);
    } catch (err) {
      console.warn('Purchases history error:', err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [isAuthenticated, activeGame]);

  const handleBuy = async (item) => {
    if (!isAuthenticated) {
      onOpenAuth();
      return;
    }
    if (!activeGame) {
      addToast('Please select a game from the catalog first', 'warning');
      return;
    }

    setPurchasing(true);
    try {
      // Ensure player enrollment
      await api.players.get(activeGame.id);

      // 1. Initiate purchase
      const purchase = await api.purchases.initiate({
        gameId: activeGame.id,
        productId: item.id,
        productName: item.name,
        purchaseAmount: parseFloat(item.amount),
        currency: item.currency,
        platform: selectedPlatform,
        receiptData: `sandbox-receipt-${Date.now()}`
      });

      // 2. Validate receipt (simulate server-side app store verification)
      await api.purchases.validate(purchase.id);

      addToast(`Purchase complete! "${item.name}" credited to inventory.`, 'success');
      await fetchPurchases();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setPurchasing(false);
    }
  };

  const handleRefund = async (purchaseId) => {
    try {
      await api.purchases.refund(purchaseId);
      addToast('Purchase refunded successfully by Operations', 'info');
      await fetchPurchases();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div style={{ padding: '28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="badge badge-purple">IN-APP ECONOMY</span>
            <span className="badge badge-cyan">{activeGame?.gameName || 'Select Game'}</span>
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Storefront & In-App Purchases</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Browse store SKUs, simulate real receipt validation workflows, and manage order transactions.
          </p>
        </div>

        {/* Platform Selection */}
        <div className="glass-panel" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Smartphone size={16} color="var(--primary)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Billing Gateway:</span>
          <select
            className="form-select"
            style={{ padding: '4px 10px', fontSize: '0.82rem', width: 'auto' }}
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="GOOGLE_PLAY">Google Play Store</option>
            <option value="APP_STORE">Apple App Store</option>
            <option value="DIRECT">Direct Web Checkout</option>
          </select>
        </div>
      </div>

      {/* Store Catalog Items Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, marginBottom: 36 }}>
        {STORE_ITEMS.map((item) => (
          <div
            key={item.id}
            className="glass-panel glass-panel-hover"
            style={{
              padding: 22,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                <span className="badge badge-cyan" style={{ fontSize: '0.66rem' }}>{item.badge}</span>
              </div>

              <h4 style={{ fontSize: '1.1rem', marginBottom: 6 }}>{item.name}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: 18 }}>
                {item.description}
              </p>
            </div>

            <div>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 6,
                marginBottom: 14
              }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'Outfit' }}>
                  ${item.amount}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{item.currency}</span>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => handleBuy(item)}
                disabled={purchasing}
              >
                <CreditCard size={16} />
                <span>{purchasing ? 'Processing...' : 'Instant Purchase'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction History Section */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <History size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem' }}>Transaction History ({purchases.length})</h3>
          </div>
          {isOpsOrAdmin && (
            <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
              <ShieldCheck size={12} /> OPS REFUND PRIVILEGES ACTIVE
            </span>
          )}
        </div>

        {purchases.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 12px', color: 'var(--text-dim)' }}>
            <ShoppingBag size={32} style={{ opacity: 0.5, marginBottom: 8 }} />
            <p>No transactions found for this player account.</p>
            <p style={{ fontSize: '0.78rem' }}>Purchase an item above to test the verification pipeline!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Gateway</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                  <th>Date</th>
                  {isOpsOrAdmin && <th>Ops Action</th>}
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.productName}</td>
                    <td>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        ${p.purchaseAmount?.toFixed(2)} {p.currency}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                        {p.platform}
                      </span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                        {p.transactionId ? p.transactionId.substring(0, 16) : p.id.substring(0, 8)}...
                      </code>
                    </td>
                    <td>
                      <span className={`badge ${
                        p.status === 'COMPLETED' ? 'badge-green' : 
                        p.status === 'REFUNDED' ? 'badge-red' : 'badge-amber'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(p.transactionDate).toLocaleString()}
                    </td>
                    {isOpsOrAdmin && (
                      <td>
                        {p.status === 'COMPLETED' ? (
                          <button
                            onClick={() => handleRefund(p.id)}
                            className="btn btn-danger btn-sm"
                            style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                          >
                            <RotateCcw size={12} /> Refund
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>-</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
