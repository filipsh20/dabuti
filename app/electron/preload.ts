/*
import { contextBridge, ipcRenderer } from "electron";
 
contextBridge.exposeInMainWorld("electronAPI", {
  onmouseup: (callback) => ipcRenderer.on("mouseup", callback),
});
*/

const loadingElement = document.createElement("div");
loadingElement.id = "loading-screen";
loadingElement.innerHTML = `
  <div class="loading-spinner"></div>
  <p>Loading...</p>
`;

document.addEventListener("DOMContentLoaded", () => {
  // Agregar estilos CSS para la pantalla de carga
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    #loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      z-index: 9999;
    }

    .loading-spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  //document.head.appendChild(styleElement);
  //document.body.appendChild(loadingElement);
});
