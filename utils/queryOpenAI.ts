import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

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
  action?: 'add' | 'remove' | 'view';
  items?: { name: string; quantity: number }[];
  question?: string;
}

export const queryOpenAI = async (prompt: string): Promise<AgentDecision> => {
  try {
    const model = new ChatOpenAI({
      temperature: 0.0,
      modelName: "gpt-4o-mini",
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Create the prompt template
    const chatPrompt = ChatPromptTemplate.fromTemplate("{input}");

    // Pipe the prompt template to the OpenAI model
    const stringPrompt = typeof prompt === "string" ? prompt : JSON.stringify(prompt);
    const chain = chatPrompt.pipe(model);
    const response = await chain.invoke({ input: stringPrompt });

    // Ensure response content is extracted as a string
    let responseText = typeof response?.content === 'string' 
      ? response.content 
      : JSON.stringify(response.content);

    if (!responseText) {
      throw new Error("Response content is empty or undefined.");
    }

    // Remove triple backticks from the response
    responseText = responseText.replace(/```json|```/g, '').trim();

    // Attempt to parse the response as JSON
    let parsedResponse: AgentDecision;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (jsonError) {
      console.warn("Response is not valid JSON, returning raw response:", responseText);
      throw new Error("Failed to parse response as JSON.");
    }

    // Validate parsedResponse structure
    if (!parsedResponse.tool) {
      throw new Error("Invalid response format: Missing 'tool' property.");
    }

    return parsedResponse;
  } catch (error: any) {
    console.error("Error querying OpenAI:", error.message);
    throw new Error("Failed to process agent decision.");
  }
};

