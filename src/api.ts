import { Client } from "./models/client";
import { Provider } from "./models/provider";

export const getAllProviders = () => {
  return JSON.parse(localStorage.getItem("providers")!) as Provider[];
};

export const updateProvider = (provider: Provider) => {
  const allProviders = getAllProviders();
  const updatedProviders = allProviders.map((p) => {
    if (p.id === provider.id) {
      return provider;
    }
    return p;
  });
  localStorage.setItem("providers", JSON.stringify(updatedProviders));
};

export const getProvider = (providerId: string) => {
  const allProviders = getAllProviders();
  return allProviders.find((p) => p.id === providerId);
};

export const getClient = () => {
  return JSON.parse(localStorage.getItem("client")!) as Client;
};

export const updateClient = (client: Client) => {
  localStorage.setItem("client", JSON.stringify(client));
};
