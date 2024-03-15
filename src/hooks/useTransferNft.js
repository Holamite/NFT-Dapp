import { useCallback } from "react";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";

const useTransferNft = (address, edition) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    try {
      const transaction = await contract.transferForm(
        signer.address,
        address,
        edition
      );
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast.success("Transfer Successful!");
      }

      console.log("Transfer failed!");
    } catch (error) {
      toast.error(error);
    }
  }, [address, chainId, walletProvider, edition]);
};

export default useTransferNft;
