import { Workbox } from "workbox-window";

export function useSWUpdate() {
  const wb = new Workbox("/service-worker.js");

  wb.addEventListener("waiting", () => {
    if (confirm("¡Nueva actualización disponible! ¿Recargar?")) {
      wb.addEventListener("controlling", () => window.location.reload());
      wb.messageSkipWaiting();
    }
  });

  wb.register();
}