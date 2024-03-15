import { useCallback } from "react";
import { getProvider } from "../Constant/provider";
import { getProposalsContract } from "../Constant/contracts";
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

    const contract = getProposalsContract(signer);

    try {
      const transaction = await contract.giveRightToVote(
        signer.address,
        address,
        edition
      );
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast.success("giveRightToVote successful!");
      }

      console.log("giveRightToVote failed!");
    } catch (error) {
      toast.error(error);
    }
  }, [address, chainId, walletProvider]);
};

export default useTransferNft;
