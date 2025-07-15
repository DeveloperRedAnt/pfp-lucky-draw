import React, { useState, useRef } from "react";
import WheelComponent from "./wheel-component";
import ButtonSpin from "./button-spin";
import { fetchPrizeFromBackend } from "../../services/prizeAPI";

interface Prize {
    text: string;
    color: string;
    textColor: string; // Added text color property
    width: number; // Percentage of wheel (0-100)
}

interface GameResult {
    visualResult: string;
    backendResult: string;
    isLucky: boolean;
    message: string;
    responseTime: number;
}

export default function App() {
    const [result, setResult] = useState("");
    const [gameResult, setGameResult] = useState<GameResult | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isFetchingPrize, setIsFetchingPrize] = useState(false);
    const [hasSpun, setHasSpun] = useState(false);
    const [activeTab, setActiveTab] = useState("play");
    const [wheelKey, setWheelKey] = useState(0);
    const [fetchStartTime, setFetchStartTime] = useState<number>(0);
    const [remainingSpins, setRemainingSpins] = useState(5); // Start with 5 spins
    const [totalSpins, setTotalSpins] = useState(0);
  
    // Ref to access wheel component methods
    const wheelRef = useRef(null);
  
    const [prizes, setPrizes] = useState<Prize[]>([
      { text: "🎁 Prize 1", color: "#EF4444", textColor: "#FFFFFF", width: 12.5 },
      { text: "💰 $100", color: "#F97316", textColor: "#FFFFFF", width: 12.5 },
      { text: "🎯 Try Again", color: "#EAB308", textColor: "#000000", width: 12.5 },
      { text: "🏆 Grand Prize", color: "#22C55E", textColor: "#FFFFFF", width: 12.5 },
      { text: "🎪 Bonus Round", color: "#06B6D4", textColor: "#FFFFFF", width: 12.5 },
      { text: "💎 Jackpot", color: "#3B82F6", textColor: "#FFFFFF", width: 12.5 },
      { text: "🎈 Free Spin", color: "#8B5CF6", textColor: "#FFFFFF", width: 12.5 },
      { text: "⭐ Lucky Star", color: "#EC4899", textColor: "#FFFFFF", width: 12.5 }
    ]);
  
    // Extract segments, colors, and text colors for the wheel component
    const segments = prizes.map(prize => prize.text);
    const segColors = prizes.map(prize => prize.color);
    const segTextColors = prizes.map(prize => prize.textColor);
    const segmentWidths = prizes.map(prize => prize.width);
  
    const onFinished = async (winner: string) => {
      // This will be called when wheel stops spinning visually
      // We'll wait for backend response before showing final result
      console.log("Visual result:", winner);
      
      // Don't set result immediately, wait for backend comparison
      if (!isFetchingPrize) {
        // This shouldn't happen, but as a fallback
        setResult(winner);
        setIsSpinning(false);
        setHasSpun(true);
      }
    };
  
    const onRotate = async () => {
      // Check if user has remaining spins
      if (remainingSpins <= 0) {
        return;
      }
  
      setIsSpinning(true);
      setIsFetchingPrize(true);
      setResult("");
      setGameResult(null);
      setActiveTab("play");
      setFetchStartTime(Date.now());
      setRemainingSpins(prev => prev - 1);
      setTotalSpins(prev => prev + 1);
  
      try {
        // Start backend call immediately when spinning starts
        const backendResponse = await fetchPrizeFromBackend(prizes);
        
        // Backend response received
        setIsFetchingPrize(false);
        
        // The wheel will continue spinning until this point
        // Now we need to wait for the visual wheel to finish and compare results
        
        // Store backend result temporarily
        window.backendPrizeResult = backendResponse;
        
      } catch (error) {
        console.error("Error fetching prize from backend:", error);
        setIsFetchingPrize(false);
        setIsSpinning(false);
        // Restore the spin if there was an error
        setRemainingSpins(prev => prev + 1);
        setTotalSpins(prev => prev - 1);
        setResult("Error occurred. Please try again.");
      }
    };
  
    // Handle spin button click
    const handleSpinButtonClick = () => {

      if (canSpin && wheelRef.current) {
        wheelRef.current.spin();
      }
    };
  
    // This function will be called by the wheel component when it finishes
    const handleWheelFinished = (visualResult: string) => {
      const backendResponse = window.backendPrizeResult;
      
      if (backendResponse) {
        // Compare results
        const isMatch = visualResult === backendResponse.wonPrize;
        
        // Check if user won a free spin
        const isFreeSpinResult = visualResult.toLowerCase().includes('free spin') || 
                                backendResponse.wonPrize.toLowerCase().includes('free spin');
        
        if (isFreeSpinResult) {
          setRemainingSpins(prev => prev + 1);
        }
        
        const finalResult: GameResult = {
          visualResult,
          backendResult: backendResponse.wonPrize,
          isLucky: isMatch && backendResponse.isLucky,
          message: isMatch && backendResponse.isLucky 
            ? `🎉 Lucky! You got exactly what you landed on: ${visualResult}!`
            : isMatch && !backendResponse.isLucky
            ? `😔 You landed on ${visualResult}, but luck wasn't on your side today.`
            : !isMatch && backendResponse.isLucky
            ? `🎲 Lucky! Even though you landed on ${visualResult}, you won ${backendResponse.wonPrize}!`
            : `😔 You landed on ${visualResult}, but you got ${backendResponse.wonPrize}. Better luck next time!`,
          responseTime: backendResponse.responseTime
        };
        
        setGameResult(finalResult);
        setResult(finalResult.isLucky ? finalResult.backendResult : "Try Again");
        
        // Clear the temporary storage
        delete window.backendPrizeResult;
      }
      
      setIsSpinning(false);
      setHasSpun(true);
    };
  
    const resetWheel = () => {
      // Clear all game state
      setResult("");
      setGameResult(null);
      setIsSpinning(false);
      setIsFetchingPrize(false);
      setHasSpun(false);
      setFetchStartTime(0);
      
      // Force wheel component to re-render with new key
      setWheelKey(prev => prev + 1);
      
      // Clear any pending backend result
      if (window.backendPrizeResult) {
        delete window.backendPrizeResult;
      }
    };
  
    const resetSpins = () => {
      setRemainingSpins(5);
      setTotalSpins(0);
      resetWheel();
    };
  
    const handlePrizesUpdate = (newPrizes: Prize[]) => {
      setPrizes(newPrizes);
      if (newPrizes.length !== prizes.length) {
        resetWheel();
      }
    };
  
    const totalPercentage = prizes.reduce((sum, prize) => sum + prize.width, 0);
  
    // Calculate elapsed time for fetching
    const elapsedTime = fetchStartTime > 0 ? Math.floor((Date.now() - fetchStartTime) / 1000) : 0;
  
    // Check if wheel can be spun
    const canSpin = remainingSpins > 0 && !isSpinning && !isFetchingPrize;
  
    return (
        <div className="grid gap-8 items-start">
            <div className="flex flex-col items-center">
                  <WheelComponent
                    ref={wheelRef}
                    key={wheelKey}
                    segments={segments}
                    segColors={segColors}
                    segTextColors={segTextColors}
                    segmentWidths={segmentWidths}
                    onFinished={handleWheelFinished}
                    onRotate={onRotate}
                    primaryColor="#1f2937"
                    primaryColoraround="#f3f4f6"
                    contrastColor="#ffffff"
                    buttonText="SPIN"
                    isOnlyOnce={false}
                    size={136.425}
                    upDuration={1000}
                    downDuration={2000}
                    fontFamily="Arial, sans-serif"
                    keepSpinning={isFetchingPrize} // New prop to control continuous spinning
                  />

            {/* Spin Button */}
                <div className="mt-6 w-full max-w-xs">
                  <div 
                    className={`cursor-pointer transition-all duration-200 ${
                      canSpin 
                        ? 'hover:scale-105 hover:shadow-lg active:scale-95' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={handleSpinButtonClick}
                  >
                    <ButtonSpin />
                  </div>
                  {!canSpin && remainingSpins === 0 && (
                    <p className="text-sm text-red-600 text-center mt-2">
                      🚫 No spins remaining
                    </p>
                  )}
                  {!canSpin && remainingSpins > 0 && (isSpinning || isFetchingPrize) && (
                    <p className="text-sm text-blue-600 text-center mt-2">
                      🎲 Spinning in progress...
                    </p>
                  )}
                </div>
            </div>
        </div>
    );
}

// Declare global interface for temporary storage
declare global {
    interface Window {
        backendPrizeResult?: any;
    }
}