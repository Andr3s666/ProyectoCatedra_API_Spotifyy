"use client";
import { useState } from "react";

export default function Home() {
  const [cancion, setCancion] = useState("");
  const [canciones, setCanciones] = useState([]);

  function Busqueda(e) {
    e.preventDefault();
    if (cancion.trim() === "") {
      alert("Debes rellenar los campos");
      return;
    }
    setCancion("");
    getCancion(cancion);
  }

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "26a3208ce8msh0723e6f6b400b7ep19b7bcjsn36d68e547a4b",
      "x-rapidapi-host": "spotify23.p.rapidapi.com",
    },
  };

  async function getCancion(cancion) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
      let data = await fetch(url, options);
      let res = await data.json();
      setCanciones(res.tracks?.items || []);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <>
      {/* Cargar la fuente Kanit */}
      <link
        href="https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          padding: "20px",
          width: "100%",
          fontFamily: "'Kanit', sans-serif", // Aplicando la fuente
        }}
      >
        <h2 style={{ fontWeight: "600" }}>Spotify API</h2>
        <form onSubmit={Busqueda} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
            style={{
              padding: "10px",
              width: "250px",
              borderRadius: "9px",
              border: "1px solid #ccc",
              fontFamily: "'Kanit', sans-serif", // Fuente aplicada
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              border: "none",
              borderRadius: "9px",
              backgroundColor: "#1DB954",
              color: "white",
              cursor: "pointer",
              fontFamily: "'Kanit', sans-serif", // Fuente aplicada
            }}
          >
            Buscar
          </button>
        </form>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px",
            width: "100%",
          }}
        >
          {canciones.map((cancion, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                width: "200px",
                backgroundColor: "#f9f9f9",
                fontFamily: "'Kanit', sans-serif", // Fuente aplicada
              }}
            >
              <img
                src={cancion.data?.albumOfTrack?.coverArt?.sources?.[0]?.url || ""}
                alt="Cover Art"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "5px",
                }}
              />
              <h3 style={{ fontSize: "16px", marginTop: "10px", fontWeight: "500" }}>
                {cancion.data?.name || "Nombre no disponible"}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
