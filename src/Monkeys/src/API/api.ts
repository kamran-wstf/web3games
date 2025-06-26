export const LeaderBoard = async () => {
    const res = await fetch("https://monad-api.blockvision.org/testnet/api/tokenHolders?contractAddress=0x21568459854Adcda462F6D9C11ce4F157Dc70f93", {
        method: 'GET',
    })
    const response = await res.json();
    return response.result.data
}

