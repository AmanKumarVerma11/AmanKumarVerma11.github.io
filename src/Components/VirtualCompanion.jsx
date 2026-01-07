import { useState, useEffect, useRef } from 'react';

const VirtualCompanion = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [weather, setWeather] = useState('clear'); // clear, clear-night, rain, clouds, snow, thunder
    const timeoutRef = useRef(null);

    // Weather fetching logic
    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
                );
                const data = await response.json();
                const code = data.current_weather.weathercode;
                const isDay = data.current_weather.is_day; // 1 for Day, 0 for Night

                // Map WMO codes to our states
                // 0 (Clear sky), 1 (Mainly clear) -> Clear
                if (code <= 1) setWeather(isDay ? 'clear' : 'clear-night');
                // 2 (Partly cloudy), 3 (Overcast) -> Clouds
                else if (code <= 3) setWeather('clouds');
                // 51-67, 80-82: Rain
                else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) setWeather('rain');
                // 71-77, 85-86: Snow
                else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) setWeather('snow');
                // 95-99: Thunderstorm
                else if (code >= 95) setWeather('thunder');
                else setWeather('clouds'); // Default fallback
            } catch (error) {
                console.error("Error fetching weather:", error);
                setWeather('clear'); // Fallback on error
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.log("Geolocation denied or error:", error);
                    setWeather('clear'); // Fallback if denied
                }
            );
        }
    }, []);

    // Handle idle animation timing (Hide message bubble)
    useEffect(() => {
        if (showMessage) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    }, [showMessage]);

    const handleClick = () => {
        setClickCount(prev => prev + 1);

        // Cat interactions
        const interactions = [
            "Meow! 🐱",
            "Purr... 🧶",
            "Feed me code! 🐟",
            "Zzz... �",
            "Hunting bugs... 🐞"
        ];

        // Weather specific comments
        if (clickCount % 3 === 0) {
            if (weather === 'rain') setMessage("Don't like water! 🌧️");
            else if (weather === 'clear') setMessage("Sunbathing... ☀️");
            else if (weather === 'snow') setMessage("Chilly paws! ❄️");
            else if (weather === 'thunder') setMessage("Scary noise! 🙀");
            else setMessage(interactions[Math.floor(Math.random() * interactions.length)]);
        } else {
            setMessage(interactions[Math.floor(Math.random() * interactions.length)]);
        }

        setShowMessage(true);
    };

    // Pixel Cat SVG Parts
    const CatBody = () => (
        <svg width="60" height="60" viewBox="0 0 100 100" className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'} ${clickCount % 2 !== 0 ? 'animate-bounce' : ''}`}>
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="rgba(0,0,0,0.3)" />
                </filter>
            </defs>

            {/* Tail (Animated) */}
            <path
                d="M 20 70 Q 10 50 15 40"
                stroke="#F97316" // Orange-500
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="origin-bottom-right animate-[wiggle_1s_ease-in-out_infinite]"
                style={{ transformOrigin: '20px 70px' }}
            />

            {/* Body */}
            <rect x="20" y="50" width="40" height="30" rx="4" fill="#F97316" filter="url(#shadow)" /> {/* Main body Orange */}
            <rect x="25" y="75" width="8" height="10" fill="#EA580C" /> {/* Leg L */}
            <rect x="47" y="75" width="8" height="10" fill="#EA580C" /> {/* Leg R */}

            {/* Head */}
            <g className={isHovered ? 'animate-none' : 'animate-[bounce_3s_infinite]'}>
                <rect x="30" y="25" width="36" height="30" rx="4" fill="#F97316" filter="url(#shadow)" /> {/* Head Box */}

                {/* Ears */}
                <path d="M 30 25 L 30 15 L 40 25 Z" fill="#F97316" />
                <path d="M 66 25 L 66 15 L 56 25 Z" fill="#F97316" />

                {/* Face Details */}
                {/* Eyes */}
                {weather === 'clear-night' ? (
                    // Sleeping Eyes
                    <g>
                        <path d="M 38 40 L 44 40" stroke="#374151" strokeWidth="2" />
                        <path d="M 52 40 L 58 40" stroke="#374151" strokeWidth="2" />
                    </g>
                ) : (
                    // Open/Blinking Eyes
                    <g className={isHovered ? '' : 'animate-[blink_4s_infinite]'}>
                        <rect x="38" y="38" width="6" height="6" fill="#1F2937" />
                        <rect x="52" y="38" width="6" height="6" fill="#1F2937" />
                    </g>
                )}

                {/* Nose & Whiskers */}
                <rect x="46" y="46" width="4" height="3" fill="#FECACA" /> {/* Pink Nose */}
                <line x1="32" y1="48" x2="42" y2="48" stroke="#374151" strokeWidth="1" opacity="0.5" />
                <line x1="54" y1="48" x2="64" y2="48" stroke="#374151" strokeWidth="1" opacity="0.5" />
            </g>


            {/* Weather Accessories */}
            {weather === 'rain' && (
                // Umbrella (Simplified Pixel Style)
                <g transform="translate(55, 30) rotate(15)">
                    <path d="M 0 15 L 0 35 Q 0 40 5 40" stroke="#60A5FA" strokeWidth="3" fill="none" />
                    <path d="M -15 15 Q 0 0 15 15 Z" fill="#3B82F6" />
                </g>
            )}

            {(weather === 'clear') && (
                // Sunglasses
                <g transform="translate(36, 36)">
                    <rect x="0" y="0" width="24" height="8" fill="black" />
                    <rect x="10" y="2" width="4" height="2" fill="#333" />
                </g>
            )}

            {weather === 'snow' && (
                // Scarf
                <path d="M 28 55 L 68 55" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
            )}

            {/* ZZZ for Night */}
            {weather === 'clear-night' && (
                <g className="animate-pulse opacity-70">
                    <text x="70" y="20" fontSize="12" fill="#8B5CF6" style={{ fontFamily: 'monospace' }}>z</text>
                    <text x="80" y="10" fontSize="10" fill="#8B5CF6" style={{ fontFamily: 'monospace' }}>z</text>
                </g>
            )}

        </svg>
    );

    return (
        <>
            <style>
                {`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-5deg); }
                    50% { transform: rotate(5deg); }
                }
                @keyframes blink {
                    0%, 48%, 52%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(0.1); }
                }
            `}
            </style>
            <div
                className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 select-none cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
            >
                {/* Message Bubble */}
                <div className={`
                bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                px-3 py-2 rounded-lg shadow-lg mb-2 text-sm font-medium text-gray-700 dark:text-gray-200
                transition-all duration-300 transform origin-bottom-left
                ${showMessage ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
            `}>
                    {message}
                    <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div>
                </div>

                {/* Cat Container */}
                <div className="relative filter drop-shadow-lg hover:drop-shadow-xl transition-all">
                    <CatBody />
                    {/* Weather icon badge */}
                    <div className="absolute -top-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-100 dark:border-gray-700 scale-75">
                        {weather === 'rain' && '🌧️'}
                        {weather === 'clear' && '☀️'}
                        {weather === 'clear-night' && '🌙'}
                        {weather === 'clouds' && '☁️'}
                        {weather === 'snow' && '❄️'}
                        {weather === 'thunder' && '⚡'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VirtualCompanion;
