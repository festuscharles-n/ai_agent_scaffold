import { queryOpenAI } from './utils/queryOpenAI';
import { createMemory, loadFromMemory, saveToMemory } from './utils/memoryUtils';

interface AgentDecision {
  tool:
    | 'cart_manager'
    | 'knowledge_base'
    | 'search'
    | 'balance'
    | 'deposit'
    | 'help'
    | 'confirm_deposit'
    | 'cancel'
    | 'view_cart'
    | 'checkout'
    | 'track_order'
    | 'set_otp_number'
    | 'profile'
    | 'referrals'
    | 'rates'
    | 'quotes';
  action?: 'add' | 'remove' | 'view' | 'clear'; 
  items?: { name: string; quantity: number }[]; 
  question?: string;
}

export const agent = async ({ query, userId }: { query: string; userId: number }): Promise<AgentDecision> => {
  const memory = createMemory(userId);
  const chatHistory = await loadFromMemory(memory);

  const decisionPrompt = `
    You are an intelligent assistant helping users with two primary functions:
    1. "cart_manager" for managing shopping cart operations:
       - "add" an item to cart
       - "remove" an item from cart
       - "view" the cart
       - "clear" the cart
    2. "knowledge_base" for answering general or product-related questions.

    3. Direct commands:
       - "search": Search for a product.
       - "balance": Show account balance.
       - "deposit": Deposit money.
       - "help": Help and support.
       - "confirm_deposit": Confirm a deposit.
       - "cancel": Cancel an action.
       - "view_cart": View shopping cart.
       - "checkout": Complete purchase.
       - "track_order": Track an order.
       - "set_otp_number": Set phone number for OTP.
       - "profile": View/edit profile.
       - "referrals": Referral info.
       - "rates": Current rates.
       - "quotes": Price quotes.

    Conversation so far:
    ${chatHistory}

    User Query: "${query}"

    Strict JSON Response:
    {
      "tool": "cart_manager" or "knowledge_base" or one of the above commands,
      "action": "add" | "remove" | "view" | "clear" (only for cart_manager),
      "items": [{ "name": "item name", "quantity": number }] (for cart_manager),
      "question": "..." (only for knowledge_base)
    }
  `;

  try {
    const response = await queryOpenAI(decisionPrompt);
    await saveToMemory(memory, query, response);
    return response;
  } catch (error) {
    console.error('Error in agent decision-making:', error);
    throw new Error('Failed to process agent decision.');
  }
};
