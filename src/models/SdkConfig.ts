import {
    keyStores,
} from "near-api-js";
import { DEFAULT_GRAPH_API_URL, DEFAULT_NETWORK, DEFAULT_PROTOCOL_CONTRACT_ID, NULL_CONTRACT } from "../config";

export interface SdkConfig {
    graphApiUrl: string;
    protocolContractId: string;
    nullContractId: string;
    network: 'testnet' | 'mainnet' | 'custom';
    keyStore: keyStores.BrowserLocalStorageKeyStore | keyStores.UnencryptedFileSystemKeyStore | keyStores.InMemoryKeyStore;
}

export function createSdkConfig(config: Partial<SdkConfig>): SdkConfig {
    return {
        graphApiUrl: config.graphApiUrl ?? DEFAULT_GRAPH_API_URL,
        keyStore: config.keyStore ?? new keyStores.BrowserLocalStorageKeyStore(),
        network: config.network ?? DEFAULT_NETWORK,
        protocolContractId: config.protocolContractId ?? DEFAULT_PROTOCOL_CONTRACT_ID,
        nullContractId: config.nullContractId ?? NULL_CONTRACT,
    }
}
