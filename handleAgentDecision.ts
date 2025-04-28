import { commandHandlers } from './commandHandler';
import { AgentDecision } from './agent'; 

export const handleAgentDecision = async (decision: AgentDecision, userId: number) => {
  if (decision.tool === 'cart_manager') {
    // Handle cart management
    switch (decision.action) {
      case 'add':
        console.log(`Adding items to cart for user ${userId}:`, decision.items);
        break;
      case 'remove':
        console.log(`Removing items from cart for user ${userId}:`, decision.items);
        break;
      case 'view':
        console.log(`Viewing cart for user ${userId}`);
        break;
      case 'clear':
        console.log(`Clearing cart for user ${userId}`);
        break;
      default:
        throw new Error('Unknown cart_manager action');
    }
  } else if (decision.tool === 'knowledge_base') {
    console.log(`Answering knowledge base question: "${decision.question}"`);
    // (You could send it to your knowledge system here)
  } else {
    // It's a direct command
    const handler = commandHandlers[`/${decision.tool}`];
    if (handler) {
      await handler(userId, decision);
    } else {
      throw new Error(`Unknown command: ${decision.tool}`);
    }
  }
};
