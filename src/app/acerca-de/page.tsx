import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      {/* Título principal */}
      <h1 className="text-3xl font-bold mb-6">Integrantes del Equipo</h1>

      {/* Contenedor de tarjetas de integrantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
        {/* Tarjeta 1 - Alvarez Arizmendi Grecia */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/150" // Reemplaza con la imagen real
            alt="Alvarez Arizmendi Grecia"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <h2 className="text-xl font-semibold">Alvarez Arizmendi Grecia</h2>
          <p className="text-gray-600">Colaboradora</p>
        </div>

        {/* Tarjeta 2 - Alvines Candela Mercedes */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/150" // Reemplaza con la imagen real
            alt="Alvines Candela Mercedes"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <h2 className="text-xl font-semibold">Alvines Candela Mercedes</h2>
          <p className="text-gray-600">Colaboradora</p>
        </div>

        {/* Tarjeta 3 - Jiménez Luna Mia Sherlyn */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via-placeholder.com/150" // Reemplaza con la imagen real
            alt="Jiménez Luna Mia Sherlyn"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <h2 className="text-xl font-semibold">Jiménez Luna Mia Sherlyn</h2>
          <p className="text-gray-600">Colaboradora</p>
        </div>

        {/* Tarjeta 4 - Hernández Piza Víctor */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/150" // Reemplaza con la imagen real
            alt="Hernández Piza Víctor"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <h2 className="text-xl font-semibold">Hernández Piza Víctor</h2>
          <p className="text-gray-600">Colaborador</p>
        </div>

        {/* Tarjeta 5 - Badillo Guerra Diana Paola */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/150" // Reemplaza con la imagen real
            alt="Badillo Guerra Diana Paola"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <h2 className="text-xl font-semibold">Badillo Guerra Diana Paola</h2>
          <p className="text-gray-600">Colaboradora</p>
        </div>

      </div>
    </div>
  );
};

export default page;
