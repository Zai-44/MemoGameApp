'use client';
import React, { useEffect, useRef, useState } from 'react';

// Este componente hace 4 cosas:
//1. Reproduce música de fondo al cargar la página.
//2. Permite al usuario silenciar y activar el sonido.
//3. Permite al usuario ajustar el volumen.
//4. Muestra una alerta si la reproducción automática falla, indicando al usuario que debe permitir el sonido en la configuración del sitio.
// Para llamarlo, simplemente importa el componente y colócalo en la página donde quieres que esté: <SoundController />.
// import SoundController from "./components/SoundController"

const SoundController = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState(0.5);
    const [muted, setMuted] = useState(false);
    const [autoplayError, setAutoplayError] = useState(false);
    const [alertVisible, setAlertVisible] = useState(true);

    const playClickSound = () => { 
        const clickSound = new Audio('sounds/bubblePop.mp3');
        clickSound.play();
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
        audio.volume = volume;
        const tryPlay = () => {
            audio.play()
            .then(() => setAutoplayError(false))
            .catch(() => {
                setAutoplayError(true);
                setMuted(true);
            });
        };
        setTimeout(() => tryPlay(), 300);
        }
    }, []);

    const toggleMute = () => {
        const audio = audioRef.current;
        if (audio) {
        audio.muted = !audio.muted;
        setMuted(audio.muted);
        }
        playClickSound();
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
        audioRef.current.volume = newVolume;
        if (audioRef.current.muted && newVolume > 0) {
            audioRef.current.muted = false;
            setMuted(false);
        }
        }
    };

    return (
        <>
        <audio ref={audioRef} src="/sounds/AN-Bubblegum.mp3" autoPlay loop />

        {/* Botón de volumen */}
        <div className="absolute top-4 right-4 group flex flex-col items-center gap-2 z-50">
            <button
            onClick={toggleMute}
            className="p-3 bg-white text-red-600 border-4 border-blue-700 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            aria-label={muted ? 'Activar sonido' : 'Silenciar'}
            >
            <img
                src={
                muted
                    ? 'https://cdn-icons-png.flaticon.com/512/8191/8191682.png'
                    : 'https://cdn-icons-png.flaticon.com/512/8191/8191678.png'
                }
                alt={muted ? 'Activar sonido' : 'Silenciar'}
                className="w-8 h-8"
            />
            </button>

            {/* Slider vertical al hacer hover */}
            <div className="relative opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
            <div className="w-10 h-32 bg-white border border-blue-700 rounded-lg shadow-lg flex items-center justify-center px-2 py-2">
                <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="accent-blue-700 cursor-pointer"
                style={{
                    transform: 'rotate(-90deg)',
                    width: '120px',
                    height: '30px',
                }}
                />
            </div>
            </div>
        </div>

        {/* Alerta si autoplay falló */}
        {autoplayError && alertVisible && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-50 text-black px-6 py-4 rounded-lg shadow-lg border-3 border-red-600 flex flex-col items-center w-[90%] max-w-xl text-center text-base font-medium">
            <p className="mb-4">
                ⚠️ El navegador bloqueó la reproducción de la música automática. Para escucharla, conceda el permiso a la página en la "configuración del sitio". Posteriormente recargue la página.
            </p>
            <button
                onClick={() => setAlertVisible(false)}
                className="bg-red-500 text-white px-7 py-2 rounded-lg border border-red-600 hover:bg-red-400 transition"
            >
                Entendido
            </button>
            </div>
        )}
        </>
    );
};

export default SoundController;
