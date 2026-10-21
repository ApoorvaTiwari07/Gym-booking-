// supabaseConfig.js - Pulse Athletics Supabase Configuration
// Basic and clean configuration to connect Supabase as the backend database.

const SUPABASE_CONFIG = {
  // Supabase Project URL
  url: "https://xtmajkghfaanuxlmxqil.supabase.co",

  // Supabase Publishable / Anon Key
  anonKey: "sb_publishable_yR5LhXaCki-FlH7bcis7Dg_LC0aCKY9"
};

// Make it available globally for browser and Node.js
if (typeof window !== "undefined") {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = SUPABASE_CONFIG;
}
