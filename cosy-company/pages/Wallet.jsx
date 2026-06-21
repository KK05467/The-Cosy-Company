// src/pages/Wallet.jsx
//
// REDESIGN NOTES:
// - Visual: flat ticket surfaces replacing glass cards, balance card keeps
//   the one solid-fill treatment (forest gradient) matching Profile's
//   membership card and Pricing's featured plan — consistent "this block
//   is the important one" signal across the app.
// - DATA: your original had walletBalance, stats, and transactions all
//   hardcoded. Your backend HAS real models for this (Wallet, Transaction)
//   but NO route/controller exposes them yet — there's no GET /api/wallet
//   or GET /api/transactions endpoint in your backend currently.
//
//   I've wired this page to call them anyway (api.get("/wallet/me") and
//   api.get("/wallet/transactions")) so the frontend is ready the moment
//   you add those two backend routes. Until then this will show the
//   loading/error state rather than fabricated numbers — silently
//   hardcoding ₹12,480 again would just reintroduce the same problem.
//
//   Backend routes you'd need to add:
//     GET /api/wallet/me            → { success, wallet: { balance } }
//     GET /api/wallet/transactions  → { success, transactions: [...] }
//   sourced from your existing Wallet.js and Transaction.js models.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaCreditCard, FaLeaf } from "react-icons/fa";
import Sidebar from "../components/dashboard/Sidebar";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = "http://localhost:5000/api";

function Wallet({ darkMode }) {
  const s = surface(darkMode);

  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [walletRes, txRes] = await Promise.all([
        fetch(`${API_BASE}/wallet/me`, { headers }),
        fetch(`${API_BASE}/wallet/transactions`, { headers }),
      ]);

      // These endpoints don't exist on the backend yet — handle gracefully
      // instead of crashing, so the page is ready the day they're added.
      if (!walletRes.ok || !txRes.ok) {
        setError(
          "Wallet endpoints aren't available yet — add GET /api/wallet/me and /api/wallet/transactions to your backend."
        );
        return;
      }

      const walletData = await walletRes.json();
      const txData = await txRes.json();

      if (walletData.success) setWallet(walletData.wallet);
      if (txData.success) setTransactions(txData.transactions || []);
    } catch (err) {
      console.error(err);
      setError("Could not connect to the wallet service.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", background: s.bg }}>
        <Sidebar darkMode={darkMode} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: s.textMuted, fontFamily: fonts.mono, fontSize: "13px" }}>Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: s.bg, fontFamily: fonts.body }}>
      <Sidebar darkMode={darkMode} />

      <div style={{ flex: 1, padding: "150px 50px 60px" }}>
        {/* HEADER */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{ fontFamily: fonts.mono, color: s.accent, letterSpacing: "2.5px", fontSize: "11px", textTransform: "uppercase", marginBottom: "14px" }}>
            DIGITAL WALLET
          </p>
          <h1 style={{ fontFamily: fonts.display, color: s.text, fontSize: "44px", fontWeight: "600", marginBottom: "8px" }}>
            Wallet Overview
          </h1>
          <p style={{ color: s.textMuted, fontSize: "16px" }}>Manage payments and earnings with clarity.</p>
        </div>

        {error && (
          <div style={{ padding: "20px 24px", borderRadius: "14px", background: `${colors.rust}12`, border: `1px solid ${colors.rust}33`, marginBottom: "30px" }}>
            <p style={{ color: colors.rust, fontSize: "14px", margin: 0 }}>{error}</p>
          </div>
        )}

        {/* BALANCE CARD — the one solid fill */}
        <motion.div
          whileHover={{ y: -4 }}
          style={{
            padding: "38px",
            borderRadius: "22px",
            background: darkMode
              ? `linear-gradient(135deg, ${colors.forestDeep}, ${colors.forest})`
              : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
            marginBottom: "28px",
          }}
        >
          <p style={{ color: "rgba(246,242,232,0.7)", fontFamily: fonts.mono, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            Available Balance
          </p>
          <h1 style={{ fontFamily: fonts.display, color: colors.paper, fontSize: "58px", fontWeight: "600", margin: "0 0 24px" }}>
            {wallet ? `₹${wallet.balance}` : "—"}
          </h1>

          <div style={{ display: "flex", gap: "14px" }}>
            <button style={{
              padding: "13px 24px", borderRadius: "12px", border: "none",
              background: colors.paper, color: colors.forestDeep, fontWeight: "600", cursor: "pointer", fontSize: "14px",
            }}>
              Add Money
            </button>
            <button style={{
              padding: "13px 24px", borderRadius: "12px", cursor: "pointer", fontSize: "14px",
              background: "rgba(246,242,232,0.12)", color: colors.paper, border: "1px solid rgba(246,242,232,0.25)",
            }}>
              Withdraw
            </button>
          </div>
        </motion.div>

        {/* GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "24px" }}>
          {/* TRANSACTIONS */}
          <div style={{ padding: "32px", borderRadius: "20px", background: s.bgSoft, border: `1px solid ${s.line}` }}>
            <h2 style={{ fontFamily: fonts.display, color: s.text, fontSize: "22px", fontWeight: "600", marginBottom: "24px" }}>
              Recent Transactions
            </h2>

            {transactions.length === 0 ? (
              <p style={{ color: s.textMuted, fontSize: "14px" }}>No transactions yet.</p>
            ) : (
              transactions.map((t, i) => (
                <motion.div
                  key={t._id || i}
                  whileHover={{ x: 3 }}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 0", borderBottom: i < transactions.length - 1 ? `1px solid ${s.line}` : "none",
                  }}
                >
                  <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "10px", display: "flex",
                      justifyContent: "center", alignItems: "center",
                      background: t.type === "credit" ? `${colors.forest}18` : `${colors.rust}18`,
                      color: t.type === "credit" ? (darkMode ? colors.goldSoft : colors.forest) : colors.rust,
                    }}>
                      {t.type === "credit" ? <FaArrowDown size={13} /> : <FaArrowUp size={13} />}
                    </div>
                    <div>
                      <h4 style={{ color: s.text, fontSize: "14.5px", fontWeight: "600", margin: 0, marginBottom: "3px" }}>{t.title}</h4>
                      <p style={{ color: s.textMuted, fontSize: "12px", margin: 0 }}>
                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "—"}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    fontWeight: "700", fontSize: "14.5px",
                    color: t.type === "credit" ? (darkMode ? colors.goldSoft : colors.forest) : colors.rust,
                  }}>
                    {t.amount}
                  </span>
                </motion.div>
              ))
            )}
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ padding: "26px", borderRadius: "18px", background: s.bgSoft, border: `1px solid ${s.line}` }}>
              <FaCreditCard color={s.accent} size={26} />
              <h3 style={{ color: s.text, marginTop: "18px", fontSize: "16px", fontWeight: "600" }}>•••• •••• •••• 2048</h3>
              <p style={{ color: s.textMuted, fontSize: "13px" }}>Linked card</p>
            </div>

            <div style={{ padding: "26px", borderRadius: "18px", background: s.bgSoft, border: `1px solid ${s.line}` }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                <FaLeaf color={s.accent} size={15} />
                <h3 style={{ color: s.text, fontSize: "15px", fontWeight: "600", margin: 0 }}>Eco Impact</h3>
              </div>
              <h1 style={{ fontFamily: fonts.display, color: s.accent, fontSize: "40px", fontWeight: "600", margin: "8px 0" }}>
                —
              </h1>
              <p style={{ color: s.textMuted, fontSize: "13px" }}>
                Sourced from your profile's co2Saved once wired up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;