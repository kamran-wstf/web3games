export class RpcRoundRobin {
    private rpcList: string[];
    private index: number;

    constructor(rpcList: string[]) {
        this.rpcList = rpcList;
        this.index = 0;
    }

    getNextRpc(): string {
        const rpc = this.rpcList[this.index];
        this.index = (this.index + 1) % this.rpcList.length; // Move to the next RPC
        return rpc;
    }
}

 const RPCLIST = ['https://monad-testnet.g.alchemy.com/v2/gceCkxrHTUs0p2fdpNM2X_ccsqzHDOsj','https://testnet-rpc2.monad.xyz/52227f026fa8fac9e2014c58fbf5643369b3bfc6','https://monad-testnet.g.alchemy.com/v2/_oFb9wGjt1IEf5FOdV9SpEvx-bGwTKWb','https://monad-testnet.g.alchemy.com/v2/MRosKeJ2NDz0lHlu4dQkYQuynulmopyN']



export const getRandomRPC = () => {
    return RPCLIST[Math.floor(Math.random() * RPCLIST.length)];
};