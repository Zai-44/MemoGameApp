'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SoundController from '../components/SoundController';

const Page = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const playSound = () => {
    const audio = new Audio('/sounds/bubblePop.mp3');
    audio.play();
  };

  const programadores = [
    { nombre: "Karina Noemí Pastrana Gil", rol: "Desarrolladora", imagen: "/images/noemi.jpg" },
    { nombre: "Matthew Daniel Jiménez Silva", rol: "Desarrollador", imagen: "https://i.imgflip.com/620o0v.png?a487008" },
    { nombre: "Vania Castrejón Crescencio", rol: "Desarrolladora", imagen: "/images/vania.jpg" },
    { nombre: "Zaira Sandoval Olivera", rol: "Desarrolladora", imagen: "/images/chihiro.jpg" },
  ];

  const disenadores = [
    { nombre: "Alvarez Arizmendi Grecia", rol: "Diseñadora", imagen: "/images/Grecia.jpg" },
    { nombre: "Alvines Candela Mercedes", rol: "Diseñador", imagen: "/images/Mercedes.jpg" },
    { nombre: "Jiménez Luna Mia Sherlyn", rol: "Diseñadora", imagen: "/images/Sherly.jpg" },
    { nombre: "Hernández Piza Víctor", rol: "Diseñador", imagen: "/images/Victor.jpg" },
    { nombre: "Badillo Guerra Diana Paola", rol: "Diseñador", imagen: "/images/Diana.jpg" },
  ];

  const renderTarjetas = (equipo: { nombre: string; rol: string; imagen: string }[]) =>
    equipo.map((persona, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-md text-center w-full max-w-[200px] overflow-hidden transform transition-all duration-500 ease-in-out hover:scale-105 group"
      >
        <div className="relative w-full pt-[100%] overflow-hidden">
          <img
            src={persona.imagen}
            alt={persona.nombre}
            onClick={() => {
              setSelectedImage(persona.imagen);
              playSound();
            }}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rounded-md"
          />
        </div>
        <div className="p-2 transition-all duration-500 ease-in-out group-hover:border-t group-hover:border-gray-300">
          <h2 className="text-sm font-semibold">{persona.nombre}</h2>
          <p className="text-gray-600 text-xs">{persona.rol}</p>
        </div>
      </div>
    ));

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-gray-800 py-12 px-4 bg-scroll-up-down"
      style={{ backgroundImage: "url('/images/bg-13.jpg')" }}
    >
      <SoundController />

      <button
        onClick={() => {
          playSound();
          router.push('/');
        }}
        className="absolute top-4 left-4 w-16 h-16 border-4 border-red-700 rounded-full transition-transform transform hover:scale-110 hover:brightness-90 duration-300 ease-in-out"
        aria-label="Volver"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/9138/9138369.png"
          alt="Volver"
          className="w-full h-full object-contain"
        />
      </button>

      {/* Programadores */}
      <h1 className="text-2xl font-bold mb-4 bg-white/70 px-4 py-2 rounded-lg shadow">
        Integrantes del Equipo de Programación
      </h1>
      <div className="w-full max-w-3xl bg-white/70 p-4 rounded-lg shadow mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
          {renderTarjetas(programadores.slice(0, 3))}
        </div>
        <div className="flex justify-center mt-4 flex-wrap gap-4">
          {renderTarjetas(programadores.slice(3))}
        </div>
      </div>

      {/* Diseñadores */}
      <h1 className="text-2xl font-bold mb-4 bg-white/70 px-4 py-2 rounded-lg shadow">
        Integrantes del Equipo de Diseño
      </h1>
      <div className="w-full max-w-3xl bg-white/70 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
          {renderTarjetas(disenadores.slice(0, 3))}
        </div>
        <div className="flex justify-center mt-4 gap-4 flex-wrap">
          {renderTarjetas(disenadores.slice(3))}
        </div>
      </div>

      {/* Modal imagen */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 cursor-pointer"
          onClick={() => {
            setSelectedImage(null);
            playSound();
          }}
        >
          <img
            src={selectedImage}
            alt="Vista completa"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Page;
