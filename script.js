// ==========================================================================
// REAL SLIDING MARQUEE ENGINE FOR BROWSER TAB TITLE
// ==========================================================================
(function() {
    const titlePhrases = [
        "OMAAN PORTFOLIO",
        "HIRE ME NOW",
        "START A PROJECT ?",
        "FULL-STACK DEVELOPER "
    ];
    
    let currentPhraseIndex = 0;
    let tickerInstance = null;
    
    // Config Parameters
    const bufferSize = 20; // Kitni door se text chalta hua enter hoga (spaces)
    let scrollStep = 0;
    let pauseCounter = 0;
    
    const SPEED_MS = 120; // Isko kam karoge to text aur tez chalega
    const PAUSE_TICKS = 15; // Center mein text kitni der rukega (15 ticks = ~1.8 seconds)

    function startMarqueeTracker() {
        const textToDisplay = titlePhrases[currentPhraseIndex];
        
        // Pura running string tayar karte hain jisme aage peeche spaces hon
        // Is se text achanak nahi aata, lagta hai lambi line chal rahi hai
        const fullStream = " ".repeat(bufferSize) + textToDisplay + " ".repeat(bufferSize);
        
        tickerInstance = setInterval(() => {
            // Text ko smoothly frame by frame cut karke sliding motion banate hain
            let frameText = fullStream.substring(scrollStep, scrollStep + bufferSize);
            document.title = frameText;
            
            // Check karo agar text bilkul center mein aa chuka hai
            const isCentered = (scrollStep === bufferSize);
            
            if (isCentered && pauseCounter < PAUSE_TICKS) {
                // Agar center mein hai, to thodi der chalna roko (Pause Effect)
                pauseCounter++;
                return; 
            }
            
            // Frame ko aage badhao
            scrollStep++;
            
            // Jab text poora left side se chalta hua bahar nikal jaye
            if (scrollStep > fullStream.length - bufferSize) {
                clearInterval(tickerInstance);
                
                // Reset saare parameters naye text ke liye
                scrollStep = 0;
                pauseCounter = 0;
                
                // Next text phrase par jao
                currentPhraseIndex = (currentPhraseIndex + 1) % titlePhrases.length;
                
                // Agla text chala do
                startMarqueeTracker();
            }
        }, SPEED_MS);
    }

    // Direct Boot Engine
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startMarqueeTracker);
    } else {
        startMarqueeTracker();
    }
})();