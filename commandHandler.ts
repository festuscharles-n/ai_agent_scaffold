//This is a dummy command handler module for a  bot.

export const commandHandlers: { [key: string]: (userId: number, data?: any) => Promise<void> } = {
    '/search': async (userId, data) => {
      console.log(`Searching for: ${data?.question}`);
    },
    '/balance': async (userId) => {
      console.log(`Showing balance for user ${userId}`);
    },
    '/deposit': async (userId) => {
      console.log(`Depositing money for user ${userId}`);
    },
    '/help': async (userId) => {
      console.log(`Helping user ${userId}`);
    },
    '/confirm_deposit': async (userId) => {
      console.log(`Confirming deposit for user ${userId}`);
    },
    '/cancel': async (userId) => {
      console.log(`Cancelling action for user ${userId}`);
    },
    '/view_cart': async (userId) => {
      console.log(`Viewing cart for user ${userId}`);
    },
    '/checkout': async (userId) => {
      console.log(`Checking out for user ${userId}`);
    },
    '/track_order': async (userId) => {
      console.log(`Tracking order for user ${userId}`);
    },
    '/set_otp_number': async (userId) => {
      console.log(`Setting OTP number for user ${userId}`);
    },
    '/profile': async (userId) => {
      console.log(`Showing profile for user ${userId}`);
    },
    '/referrals': async (userId) => {
      console.log(`Showing referrals for user ${userId}`);
    },
    '/rates': async (userId) => {
      console.log(`Showing rates`);
    },
    '/quotes': async (userId) => {
      console.log(`Getting quotes`);
    }
  };
  