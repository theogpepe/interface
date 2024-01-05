const params = {
    id: 1,
    name: "Ethereum Mainnet",
    label: "Ethereum Mainnet",
    image: "Ethereum.png",
    wrappedNativeToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    params: {
        chainId: "0x1",
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://eth.llamarpc.com/"],
        blockExplorerUrls: ["https://etherscan.io"],
    },
}

const _SwitchNetwork = async () => {
    try {

        await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: params.params.chainId }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await (window as any).ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [params.params],
                });
            } catch (addError) {
                // handle "add" error
            }
        }
        // handle other "switch" errors
    }

}

const SwitchNetwork = () => {
    _SwitchNetwork()
}



export default SwitchNetwork