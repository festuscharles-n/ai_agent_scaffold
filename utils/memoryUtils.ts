import { BufferMemory } from "langchain/memory"
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";

export const createMemory = (number: number): BufferMemory => {
    return new BufferMemory({
      memoryKey: "chat_history",
      chatHistory: new UpstashRedisChatMessageHistory({
        sessionId: `session-${number}`,
        config: {
          url: process.env.UPSTASH_REDIS_URL!,
          token: process.env.UPSTASH_REDIS_TOKEN!,
        },
      }),
    });
};
  
export const loadFromMemory = async (memory: BufferMemory): Promise<string> => {
    const memoryVariables = await memory.loadMemoryVariables({});
    return memoryVariables.chat_history || "";
};
  
export const saveToMemory = async (memory: BufferMemory, query: string, response: any): Promise<void> => {
    await memory.saveContext({ input: query }, { output: response });
};