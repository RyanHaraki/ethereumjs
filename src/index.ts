import { ethers, providers } from "ethers";

// todo: add network change listener
// todo: abstract into multiple classes in their own files then use index.ts to export them all

declare let window: any;

export class Ethereum {
	provider: providers.Web3Provider;
	signer: providers.JsonRpcSigner;

	 
	constructor() {
		this.provider = new providers.Web3Provider(window.ethereum, "any");
	}
	
	test() {
		console.log('hello');
	}
	
	async connectMetamask(): Promise<providers.JsonRpcSigner> {
		await this.provider.send("eth_requestAccounts", []);
		this.signer = this.provider.getSigner();

		return this.signer;
	}	

	switchNetworks(chainID?: number) {
		window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [{ chainId: chainID }]
		});
	}

	getCurrentAddress(): Promise<string> {
		return this.signer.getAddress();
	}
	
	async getBalanceInWei(account: string): Promise<string> {
		const balance = await this.provider.getBalance(account).toString();
	
		return balance;
	}
		
	async getBalanceInEther(account: string): Promise<string> {
		return ethers.utils.formatEther(await this.provider.getBalance(account))
	}
	
	getAccountInfo(): object {
		return this.provider.getSigner();;
	}
	
	sendEther(toAddress: string, amount: string)  {
		const signer = this.provider.getSigner();
		const tx = signer.sendTransaction({
			to: toAddress,
			value: ethers.utils.parseEther(amount),
		})

		return tx;
	}
}

export default Ethereum;