import { agent } from './agent';
import { handleAgentDecision } from './handleAgentDecision';

const userQuery = 'Can you show me my cart?';
const userId = 1234;

const main = async () => {
  const decision = await agent({ query: userQuery, userId });
  await handleAgentDecision(decision, userId);
};

main();
