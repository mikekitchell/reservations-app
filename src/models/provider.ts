import { ProviderAvailability } from "./providerAvailability";

export type Provider = {
    id: string
    name: string
    availability: ProviderAvailability[];
} 