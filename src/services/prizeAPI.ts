interface Prize {
    text: string;
    color: string;
    width: number;
  }
  
  interface PrizeResponse {
    success: boolean;
    wonPrize: string;
    isLucky: boolean;
    message: string;
    responseTime: number;
  }
  
  // Mock API service to simulate backend call
  export const fetchPrizeFromBackend = async (availablePrizes: Prize[]): Promise<PrizeResponse> => {
    // Simulate random response time between 2-5 seconds
    const responseTime = Math.random() * 3000 + 2000;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly select a prize from available prizes
        const randomIndex = Math.floor(Math.random() * availablePrizes.length);
        const wonPrize = availablePrizes[randomIndex].text;
        
        // Simulate 70% chance of being lucky (getting what you land on)
        const isLucky = Math.random() < 0.7;
        
        resolve({
          success: true,
          wonPrize,
          isLucky,
          message: isLucky 
            ? `Congratulations! You're lucky today!` 
            : `Sorry, you're not lucky this time. Better luck next time!`,
          responseTime: Math.round(responseTime)
        });
      }, responseTime);
    });
  };
  
  // Alternative API endpoint simulation with error handling
  export const fetchPrizeWithRetry = async (availablePrizes: Prize[], maxRetries: number = 3): Promise<PrizeResponse> => {
    let attempts = 0;
    
    while (attempts < maxRetries) {
      try {
        // Simulate 90% success rate
        if (Math.random() < 0.9) {
          return await fetchPrizeFromBackend(availablePrizes);
        } else {
          throw new Error('Network error');
        }
      } catch (error) {
        attempts++;
        if (attempts >= maxRetries) {
          return {
            success: false,
            wonPrize: availablePrizes[0].text, // Fallback to first prize
            isLucky: false,
            message: 'Connection error. Please try again later.',
            responseTime: 0
          };
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // This should never be reached, but TypeScript needs it
    throw new Error('Unexpected error');
  };