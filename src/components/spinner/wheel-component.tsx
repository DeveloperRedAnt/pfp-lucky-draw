import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import Group25 from "./assets/group-25";
import Group24 from "./assets/group-24";
import Group23 from "./assets/group-23";

interface WheelComponentProps {
  segments: string[];
  segColors: string[];
  segTextColors?: string[];
  segmentWidths?: number[];
  winningSegment?: string;
  onFinished?: (visualResult: string) => void;
  onRotate?: () => void;
  onRotatefinish?: () => void;
  primaryColor?: string;
  primaryColoraround?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  width?: number;
  height?: number;
  keepSpinning?: boolean;
}

const WheelComponent = forwardRef<unknown, WheelComponentProps>(({
  segments,
  segColors,
  segTextColors = [], // New prop for custom text colors
  segmentWidths = [],
  winningSegment,
  onFinished,
  onRotate,
  onRotatefinish,
  primaryColor,
  primaryColoraround,
  contrastColor,
  buttonText,
  isOnlyOnce = true,
  size = 261,
  upDuration = 1000,
  downDuration = 100,
  fontFamily = "Arial",
  width = 90,
  height = 90,
  keepSpinning = false // New prop to control continuous spinning
}, ref) => {
  const [isFinished, setFinished] = useState(false);
  const [finalAngle, setFinalAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Use refs for values that need to persist but don't trigger re-renders
  const currentSegmentRef = useRef("");
  const isStartedRef = useRef(false);
  const timerHandleRef = useRef(0);
  const angleCurrentRef = useRef(0);
  const angleDeltaRef = useRef(0);
  const canvasContextRef = useRef(null);
  const spinStartRef = useRef(0);
  const framesRef = useRef(0);
  const keepSpinningRef = useRef(false);
  const hasReachedSlowPhaseRef = useRef(false);
  
  const timerDelay = segments.length;
  const maxSpeedRef = useRef(Math.PI / segments.length);
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  
  // Scaled dimensions (15% reduction = multiply by 0.85)
  const centerX = 212.5; // 250 * 0.85
  const centerY = 212.5; // 250 * 0.85
  const canvasWidth = 425; // 500 * 0.85
  const canvasHeight = 425; // 500 * 0.85

  // Update keepSpinning ref when prop changes
  useEffect(() => {
    keepSpinningRef.current = keepSpinning;
  }, [keepSpinning]);

  // Calculate segment angles based on widths
  const getSegmentAngles = () => {
    const totalWidth = segmentWidths.length > 0 ? segmentWidths.reduce((sum, width) => sum + width, 0) : 100;
    const PI2 = Math.PI * 2;
    
    const angles = [];
    let cumulativeAngle = 0;
    
    for (let i = 0; i < segments.length; i++) {
      const width = segmentWidths[i] || (100 / segments.length);
      const segmentAngle = (width / totalWidth) * PI2;
      angles.push({
        start: cumulativeAngle,
        end: cumulativeAngle + segmentAngle,
        width: segmentAngle
      });
      cumulativeAngle += segmentAngle;
    }
    
    return angles;
  };

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, [segments.length, segmentWidths, segTextColors]);

  const wheelInit = () => {
    initCanvas();
    angleCurrentRef.current = finalAngle;
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById("canvas");
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", canvasWidth);
      canvas.setAttribute("height", canvasHeight);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }
    canvas.addEventListener("click", spin, false);
    canvasContextRef.current = canvas.getContext("2d");
  };

  const spin = () => {
    if (isSpinning) return;
    
    isStartedRef.current = true;
    setIsSpinning(true);
    setFinished(false);
    hasReachedSlowPhaseRef.current = false;
    
    if (onRotate) onRotate();
    if (timerHandleRef.current === 0) {
      spinStartRef.current = new Date().getTime();
      maxSpeedRef.current = Math.PI / segments.length;
      framesRef.current = 0;
      timerHandleRef.current = setInterval(onTimerTick, timerDelay);
    }
  };

  // Expose spin method to parent component
  useImperativeHandle(ref, () => ({
    spin: spin
  }));

  const onTimerTick = () => {
    framesRef.current++;
    draw();
    const duration = new Date().getTime() - spinStartRef.current;
    let progress = 0;
    let finished = false;
    
    if (duration < upTime) {
      // Speed up phase
      progress = duration / upTime;
      angleDeltaRef.current = maxSpeedRef.current * Math.sin((progress * Math.PI) / 2);
    } else {
      // Slow down phase
      hasReachedSlowPhaseRef.current = true;
      
      if (winningSegment) {
        if (currentSegmentRef.current === winningSegment && framesRef.current > segments.length) {
          progress = duration / upTime;
          angleDeltaRef.current =
            maxSpeedRef.current * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDeltaRef.current =
            maxSpeedRef.current * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        
        // If keepSpinning is true and we've reached the slow phase, maintain minimum speed
        if (keepSpinningRef.current && hasReachedSlowPhaseRef.current) {
          // Keep spinning at a steady slow speed until backend responds
          angleDeltaRef.current = maxSpeedRef.current * 0.3; // 30% of max speed
          progress = 0.5; // Keep progress at middle to maintain steady speed
        } else {
          // Normal slow down
          if (progress >= 0.8) {
            angleDeltaRef.current =
              (maxSpeedRef.current / 1.2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          } else if (progress >= 0.98) {
            angleDeltaRef.current =
              (maxSpeedRef.current / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          } else {
            angleDeltaRef.current =
              maxSpeedRef.current * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          }
        }
      }
      
      // Only finish if keepSpinning is false and we've completed the normal cycle
      if (progress >= 1 && !keepSpinningRef.current) {
        finished = true;
      }
    }

    angleCurrentRef.current += angleDeltaRef.current;
    while (angleCurrentRef.current >= Math.PI * 2) angleCurrentRef.current -= Math.PI * 2;
    
    if (finished) {
      setFinished(true);
      setIsSpinning(false);
      setFinalAngle(angleCurrentRef.current);
      
      if (onFinished) onFinished(currentSegmentRef.current);
      if (onRotatefinish) onRotatefinish();
      clearInterval(timerHandleRef.current);
      timerHandleRef.current = 0;
      angleDeltaRef.current = 0;
    }
  };

  // Effect to handle when keepSpinning changes from true to false
  useEffect(() => {
    if (!keepSpinning && hasReachedSlowPhaseRef.current && isSpinning) {
      // Backend has responded, allow wheel to finish naturally
      // The wheel will complete its cycle in the next few ticks
      setTimeout(() => {
        if (isSpinning) {
          setFinished(true);
          setIsSpinning(false);
          setFinalAngle(angleCurrentRef.current);
          
          if (onFinished) onFinished(currentSegmentRef.current);
          if (onRotatefinish) onRotatefinish();
          clearInterval(timerHandleRef.current);
          timerHandleRef.current = 0;
          angleDeltaRef.current = 0;
        }
      }, 500); // Small delay to make the stop feel natural
    }
  }, [keepSpinning, isSpinning, onFinished, onRotatefinish]);

  const wheelDraw = () => {
    clear();
    drawWheel();
    calculateCurrentSegment();
  };

  const draw = () => {
    clear();
    drawWheel();
    calculateCurrentSegment();
  };

  // Helper function to determine if a color is light or dark
  const isLightColor = (color: string) => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  // Helper function to truncate text with ellipsis if longer than specified length
  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 3) + "...";
  };

  const drawSegment = (key, startAngle, endAngle) => {
    const ctx = canvasContextRef.current;
    const value = segments[key];
    
    // Truncate text if longer than 20 characters
    const displayText = truncateText(value, 20);
    
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, startAngle, endAngle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((startAngle + endAngle) / 2);
    
    // Improved text rendering with custom text colors
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 9px " + fontFamily;
    
    // Get the custom text color or fallback to automatic contrast
    const customTextColor = segTextColors[key];
    let textColor = "#000000"; // Default black
    let strokeColor = "#ffffff"; // Default white stroke
    
    if (customTextColor) {
      textColor = customTextColor;
      // Use contrasting stroke color based on text color
      strokeColor = isLightColor(customTextColor) ? "#000000" : "#ffffff";
    } else {
      // Automatic contrast based on background color
      const bgColor = segColors[key];
      if (isLightColor(bgColor)) {
        textColor = "#000000";
        strokeColor = "#ffffff";
      } else {
        textColor = "#ffffff";
        strokeColor = "#000000";
      }
    }
    
    // Position text more centered within the segment
    const textRadius = size * 0.65; // Move text closer to center
    
    // Draw text stroke (outline) for better contrast
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = strokeColor;
    ctx.strokeText(displayText, textRadius, 0);
    
    // Draw text fill with custom color
    ctx.fillStyle = textColor;
    ctx.fillText(displayText, textRadius, 0);
    
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContextRef.current;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "bold 9px " + fontFamily;
    
    const segmentAngles = getSegmentAngles();
    
    for (let i = 0; i < segments.length; i++) {
      const startAngle = segmentAngles[i].start + angleCurrentRef.current;
      const endAngle = segmentAngles[i].end + angleCurrentRef.current;
      drawSegment(i, startAngle, endAngle);
    }
  };

  const calculateCurrentSegment = () => {
    const needleAngle = Math.PI;
    const segmentAngles = getSegmentAngles();
    
    for (let i = 0; i < segments.length; i++) {
      const startAngle = segmentAngles[i].start + angleCurrentRef.current;
      const endAngle = segmentAngles[i].end + angleCurrentRef.current;
      
      let normalizedStartAngle = startAngle;
      let normalizedEndAngle = endAngle;
      let normalizedNeedleAngle = needleAngle;
      
      const PI2 = Math.PI * 2;
      
      while (normalizedStartAngle < 0) normalizedStartAngle += PI2;
      while (normalizedEndAngle < 0) normalizedEndAngle += PI2;
      while (normalizedNeedleAngle < 0) normalizedNeedleAngle += PI2;
      
      while (normalizedStartAngle >= PI2) normalizedStartAngle -= PI2;
      while (normalizedEndAngle >= PI2) normalizedEndAngle -= PI2;
      while (normalizedNeedleAngle >= PI2) normalizedNeedleAngle -= PI2;
      
      let isInSegment = false;
      
      if (normalizedStartAngle <= normalizedEndAngle) {
        isInSegment = (normalizedNeedleAngle >= normalizedStartAngle && normalizedNeedleAngle < normalizedEndAngle);
      } else {
        isInSegment = (normalizedNeedleAngle >= normalizedStartAngle || normalizedNeedleAngle < normalizedEndAngle);
      }
      
      if (isInSegment) {
        currentSegmentRef.current = segments[i];
        break;
      }
    }
    
    if (!currentSegmentRef.current && segments.length > 0) {
      currentSegmentRef.current = segments[0];
    }
    
    // Show current segment during spinning (optional visual feedback)
    if (isStartedRef.current && isSpinning && keepSpinningRef.current) {
      const ctx = canvasContextRef.current;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#009844";
      ctx.font = "bold 1em " + fontFamily;
      ctx.fillText("Loading...", centerX, centerY + size + 42); // Adjusted for new size
    }
  };

  const clear = () => {
    const ctx = canvasContextRef.current;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  };

  const resetWheel = () => {
    setFinalAngle(0);
    angleCurrentRef.current = 0;
    currentSegmentRef.current = "";
    isStartedRef.current = false;
    hasReachedSlowPhaseRef.current = false;
    setFinished(false);
    setIsSpinning(false);
    wheelDraw();
  };

  useEffect(() => {
    const handleReset = () => resetWheel();
    resetWheel();
  }, [size]);

  // Scaled dimensions for outer circle and center button
  const outerCircleSize = size + 18.7; // (22 * 0.85)
  const outerCircleLeft = centerX - outerCircleSize;
  const outerCircleTop = centerY - outerCircleSize;
  const outerCircleDimensions = outerCircleSize * 2;

  const centerButtonSize = 44.103; // (45.467 * 0.97) - reduced by additional 3%
  const centerButtonLeft = centerX - centerButtonSize / 2;
  const centerButtonTop = centerY - centerButtonSize / 2;

  // Scaled needle dimensions and positioning - moved 1rem (16px) to the right and adjusted vertical position
  const needleWidth = 36.55; // (43 * 0.85)
  const needleHeight = 30.6; // (36 * 0.85)
  const needleLeft = centerX - size - 42.5 + 16; // Added 16px (1rem) to move right
  const needleTop = centerY - 3; // Fine-tuned to be properly centered

  return (
    <div id="wheel" className="relative">
      <div 
        className="absolute pointer-events-none z-0"
        style={{
          left: `${outerCircleLeft}px`,
          top: `${outerCircleTop}px`,
          width: `${outerCircleDimensions}px`,
          height: `${outerCircleDimensions}px`,
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          border: '2px solid #e5e7eb',
        }}
      >
        <Group24 />
      </div>
      
      <canvas
        id="canvas"
        width={canvasWidth}
        height={canvasHeight}
        className="relative z-10"
        style={{
          pointerEvents: (isFinished && isOnlyOnce) || isSpinning ? "none" : "auto"
        }}
      />
      
      <div 
        className="absolute z-30 cursor-pointer hover:scale-105 transition-transform duration-200"
        style={{
          left: `${centerButtonLeft}px`,
          top: `${centerButtonTop}px`,
          width: `${centerButtonSize}px`,
          height: `${centerButtonSize}px`,
        }}
        onClick={spin}
      >
        <Group23 />
      </div>
      
      <div 
        className="absolute pointer-events-none z-20"
        style={{
          left: `${needleLeft}px`,
          top: `${needleTop}px`,
          width: `${needleWidth}px`,
          height: `${needleHeight}px`,
          transform: 'translateY(-50%)'
        }}
      >
        <Group25 />
      </div>
      

    </div>
  );
});

WheelComponent.displayName = "WheelComponent";

export default WheelComponent;