import { Pagination } from "../models/Pagination";
import { FluxTransaction } from "../models/FluxTransaction";
import { queryGraph } from "./GraphQLService";
import { SdkConfig } from "../models/SdkConfig";

export interface GetTransactionsParams {
    accountId: string;
    marketId?: string;
    offset?: number;
    limit?: number;
}

export async function getTransactions(sdkConfig: SdkConfig, params: GetTransactionsParams): Promise<Pagination<FluxTransaction>> {
    const response = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'Transactions',
        query: `
            query Transactions($accountId: String!, $marketId: String, $limit: Int, $offset: Int) {
                transactions: getTransactions(input: { accountId: $accountId, marketId: $marketId offset: $offset, limit: $limit }) {
                    total
                    items {
                        market_id
                        amount_in
                        amount_out
                        outcome_id
                        type
                    }
                }
            }
        `,
        variables: {
            accountId: params.accountId,
            marketId: params.marketId,
            limit: params.limit,
            offset: params.offset,
        },
    });

    return response?.data?.transactions;
}
