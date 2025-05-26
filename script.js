let paises = [];

document.addEventListener("DOMContentLoaded", () => {
  const resultado = document.getElementById("resultado");
  const inputBuscar = document.getElementById("buscar");

  fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
      paises = data;
      mostrarPaises(paises);
    });

  inputBuscar.addEventListener("input", () => {
    const texto = inputBuscar.value.toLowerCase();
    const filtrados = paises.filter(pais =>
      pais.name.official.toLowerCase().includes(texto)
    );
    mostrarPaises(filtrados);
  });

  function mostrarPaises(lista) {
    resultado.innerHTML = ""; // Limpiar resultados anteriores
    lista.forEach(pais => {
      const div = document.createElement("div");
      div.classList.add("pais");
      div.innerHTML = `
        <h2>${pais.name.official}</h2>
        <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
        <p><strong>Región:</strong> ${pais.region}</p>
        <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
      `;
      resultado.appendChild(div);
    });
  }
});
