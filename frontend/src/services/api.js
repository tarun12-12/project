const API_URL = import.meta.env.VITE_API_URL ?? "/api/atm";

export const signup = async (name, accountNumber, pin) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, accountNumber, pin }),
    });
    return await response.json();
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const login = async (accountNumber, pin) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountNumber, pin }),
    });
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const checkBalance = async (accountNumber) => {
  try {
    const response = await fetch(`${API_URL}/balance/${accountNumber}`);
    return await response.json();
  } catch (error) {
    console.error("Check balance error:", error);
    throw error;
  }
};

export const deposit = async (accountNumber, amount) => {
  try {
    const response = await fetch(`${API_URL}/deposit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountNumber, amount }),
    });
    return await response.json();
  } catch (error) {
    console.error("Deposit error:", error);
    throw error;
  }
};

export const withdraw = async (accountNumber, amount) => {
  try {
    const response = await fetch(`${API_URL}/withdraw`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountNumber, amount }),
    });
    return await response.json();
  } catch (error) {
    console.error("Withdraw error:", error);
    throw error;
  }
};
