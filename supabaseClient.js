// supabaseClient.js - Simple Supabase Client & Helper Functions
// Handles saving new users and fetching registered members from Supabase.

let supabaseClient = null;

// Initialize the Supabase client
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const config = (typeof window !== "undefined" && window.SUPABASE_CONFIG) 
    ? window.SUPABASE_CONFIG 
    : (typeof SUPABASE_CONFIG !== "undefined" ? SUPABASE_CONFIG : null);

  if (!config || !config.url || !config.anonKey) {
    console.log("Supabase config not loaded yet.");
    return null;
  }

  // If using browser with CDN loaded
  if (typeof window !== "undefined" && window.supabase && window.supabase.createClient) {
    try {
      supabaseClient = window.supabase.createClient(config.url, config.anonKey);
      console.log("Connected to Supabase:", config.url);
      return supabaseClient;
    } catch (err) {
      console.warn("Could not initialize Supabase client:", err.message);
      return null;
    }
  }

  return null;
}

// Save or update a user in the Supabase 'users' table
async function saveUserToSupabase(user) {
  const client = getSupabaseClient();
  if (!client) {
    console.log("Supabase not active, saved locally.");
    return { success: true, saved: false, reason: "Supabase client not active" };
  }

  try {
    const payload = {
      name: user.name,
      email: user.email.toLowerCase().trim(),
      phone: user.phone || "",
      goal: user.goal || "General Fitness",
      role: user.role || "member",
      last_login: new Date().toISOString()
    };

    const { data, error } = await client
      .from("users")
      .upsert(payload, { onConflict: "email" })
      .select();

    if (error) {
      console.warn("Supabase save note:", error.message);
      return { success: false, error: error.message };
    }

    console.log("User successfully saved to Supabase:", user.email);
    return { success: true, saved: true, data };
  } catch (err) {
    console.warn("Supabase save error:", err.message);
    return { success: false, error: err.message };
  }
}

// Fetch all registered users from Supabase
async function fetchUsersFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from("users")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Could not fetch users from Supabase:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn("Fetch users error:", err.message);
    return [];
  }
}

// Find a single user by email in Supabase
async function findUserInSupabase(email) {
  const client = getSupabaseClient();
  if (!client || !email) return null;

  try {
    const { data, error } = await client
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (error) {
      console.warn("Find user note:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.warn("Find user error:", err.message);
    return null;
  }
}

// Expose helpers globally on window
if (typeof window !== "undefined") {
  window.getSupabaseClient = getSupabaseClient;
  window.saveUserToSupabase = saveUserToSupabase;
  window.fetchUsersFromSupabase = fetchUsersFromSupabase;
  window.findUserInSupabase = findUserInSupabase;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getSupabaseClient,
    saveUserToSupabase,
    fetchUsersFromSupabase,
    findUserInSupabase
  };
}
