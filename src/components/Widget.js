import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { smrtlogo, usdt, bnb } from '../assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    WALLET_CONNECT_PROJECT_ID, INFURA_RPC_URL_BINANCE,
    PRESALE_CONTRACT_ABI, PRESALE_CONTRACT_ADDRESS,
    USDT_CONTRACT_ABI, USDT_CONTRACT_ADDRESS,
} from '../config';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { useWeb3Modal, useDisconnect } from '@web3modal/ethers5/react'

// 1. Your WalletConnect Cloud project ID
const projectId = WALLET_CONNECT_PROJECT_ID

// 2. Set chains
const Binance = {
    chainId: 56,
    name: 'Binance',
    currency: 'BNB',
    explorerUrl: 'https://bscscan.com/',
    rpcUrl: INFURA_RPC_URL_BINANCE
}

// 3. Create a metadata object
const metadata = {
    name: 'SMRT Project',
    description: 'SMRT Wallet Connect Modal',
    url: 'https://SMRT.danishsaber.com/', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [Binance],
    projectId,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const Widget = ({ setMetamaskAccount }) => {

    const [referral, setReferral] = useState(null);
    const [currentStage, setCurrentStage] = useState(1);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const [web3, setWeb3] = useState();
    const bscWeb3 = new Web3(INFURA_RPC_URL_BINANCE);

    const [totalSold, setTotalSold] = useState(0);
    const [endTime, seEndTime] = useState(0);
    const [rateStageBNB, setRateStageBNB] = useState(0);
    const [rateStageUSDT, setRateStageUSDT] = useState(0);
    const [rateNextStageUSDT, setRateNextStageUSDT] = useState(0);
    const [buyBalance, setBuyBalance] = useState(0);


    const { open } = useWeb3Modal()
    const { disconnect } = useDisconnect()
    const { walletProvider } = useWeb3ModalProvider()

    const [account, setAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);

    const [currency, setCurrency] = useState('BNB');
    const [amount, setAmount] = useState('');
    const [smrtAmount, setSMRTAmount] = useState(0);


    const progressPercentage = ((totalSold / 220000000) * 100).toFixed(2);

    useEffect(() => {
        if (walletProvider) {
            onConnect()
        }
    }, [walletProvider]);

    const onConnect = async () => {
        const web3Instance = new Web3(walletProvider);
        setWeb3(web3Instance);

        const id = await web3Instance.eth.net.getId();
        const network_id = Number(id)
        setNetworkId(network_id);
        if (network_id !== 1 && network_id !== 56) {
            toast.error('Please switch your wallet to Ethereum or Binance Network!');
        } else {
            const accounts = await web3Instance.eth.getAccounts();
            setAccount(accounts[0]);
            setReferral(accounts[0])
            setMetamaskAccount(accounts[0]);

            const presaleContract = new web3Instance.eth.Contract(PRESALE_CONTRACT_ABI, PRESALE_CONTRACT_ADDRESS);

            const userDepositsBN = await presaleContract.methods.buyBalance(accounts[0]).call();
            const buyBalance = Number(userDepositsBN)
            console.log('buyBalance:', convertWeiToEther(buyBalance));

            if (buyBalance > 0) {
                setBuyBalance(convertWeiToEther(buyBalance))
            } else {
                setBuyBalance(buyBalance)
            }

        }
    };

    const approveToken = async (amountInWei) => {
        try {
            const tokenContract = new web3.eth.Contract(USDT_CONTRACT_ABI, USDT_CONTRACT_ADDRESS);
            const allowanceBN = await tokenContract.methods.allowance(account, PRESALE_CONTRACT_ADDRESS).call();
            const allowance = Number(allowanceBN);
            console.log('allowance:', web3.utils.fromWei(allowance, 'ether'));

            if (allowance > amountInWei) {
                return true;
            }
            await tokenContract.methods.approve(PRESALE_CONTRACT_ADDRESS, amountInWei).send({ from: account })
                .on('transactionHash', (hash) => {
                    console.log('Transaction Hash:', hash);
                    toast.info('Approve transaction sent!');
                })
                .on('receipt', (receipt) => {
                    console.log('receipt:', receipt);
                    toast.success('USDT Approved successfully!');
                })
                .on('error', (error, receipt) => {
                    console.log('error, receipt:', error, receipt);
                    toast.error('Approve transaction failed!');
                    throw new Error('Approve transaction failed!');
                });
            return true; // Return true if approval was successful
        } catch (error) {
            console.log('error:', error);
            toast.error('Approve transaction failed!');
            return false; // Return false if any error occurs

        }
    };


    const buyTokens = async () => {
        if (!web3 || !account) {
            toast.info('Please connect your wallet!');
            return;
        }
        if (!Number(amount)) {
            toast.info('Enter amount to buy!');
            return;
        }
        if (currency == 'BNB') {
            if (Number(amount) < 0.000017) {
                toast.info('The minimum purchase amount is 0.000017 BNB.');
                return;
            }
        } else {
            if (Number(amount) < 0.01) {
                toast.info('The minimum purchase amount is 0.01 USDT.');
                return;
            }
        }

        let currentNetworkId = networkId;

        try {
            if (currentNetworkId !== 56) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x38' }],
                    });
                    currentNetworkId = 56;
                    setNetworkId(56);
                    toast.success('Switched to Binance Smart Chain network');
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x38',
                                chainName: 'Binance Smart Chain',
                                nativeCurrency: {
                                    name: 'Binance Coin',
                                    symbol: 'BNB',
                                    decimals: 18,
                                },
                                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                blockExplorerUrls: ['https://bscscan.com'],
                            }],
                        });
                        currentNetworkId = 56;
                        setNetworkId(56);
                        toast.success('Binance Smart Chain network added to MetaMask');
                    } else {
                        toast.error('Failed to switch network');
                        return;
                    }
                }
            }
        } catch (error) {
            console.error('Error adding or switching network:', error);
            toast.error('An error occurred while switching the network');
            return;
        }

        let approvalSuccess = true;
        let amountInWei = web3.utils.toWei(amount, 'ether');

        if (currency === 'USDT') {
            approvalSuccess = await approveToken(amountInWei);
        }

        if (approvalSuccess) {
            const presaleContract = new web3.eth.Contract(PRESALE_CONTRACT_ABI, PRESALE_CONTRACT_ADDRESS);

            try {
                let method;
                switch (currency) {
                    case 'BNB':
                        method = presaleContract.methods.buyFromNative(referral);
                        break;
                    case 'USDT':
                        method = presaleContract.methods.buyFromUSDT(referral.amountInWei, 1);
                        break;
                    default:
                        throw new Error('Unsupported currency');
                }
                await method.send({ from: account, value: currency === 'BNB' ? amountInWei : 0 })
                    .on('transactionHash', (hash) => {
                        console.log('Transaction Hash:', hash);
                        toast.info('Transaction sent!');
                    })
                    .on('receipt', (receipt) => {
                        console.log('receipt:', receipt);
                        toast.success('Transaction completed successfully!');
                    })
                    .on('error', (error, receipt) => {
                        console.log('error, receipt:', error, receipt);
                        toast.error('Transaction failed!');
                    });
            } catch (error) {
                console.log('error:', error);
                toast.error('Transaction failed!');
            }
        }
    };

    useEffect(() => {
        if (endTime) {
            const targetDate = new Date(endTime * 1000); // Convert the timestamp to a Date object
            const countdown = setInterval(() => {
                const now = new Date();
                const difference = targetDate - now;

                if (difference <= 0) {
                    clearInterval(countdown);
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                    return;
                }

                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [endTime]);

    // Function to convert Wei to Ether
    const convertWeiToEther = (weiAmount) => {
        let localWeb3 = web3 || bscWeb3
        try {
            const etherAmount = localWeb3.utils.fromWei(weiAmount.toString(), 'ether');
            return etherAmount;
        } catch (error) {
            console.error('Error converting Wei to Ether:', error);
        }
    };
    const handleAmountChange = (currency, value) => {
        const regex = /^[0-9]*\.?[0-9]*$/;

        if (regex.test(value)) {
            setAmount(value);
            let smrtAmount = 0;
            if (rateStageBNB > 0) {
                if (currency === 'USDT') {
                    smrtAmount = Math.floor(value / rateStageUSDT);
                } else if (currency === 'BNB' && rateStageBNB > 0) {
                    smrtAmount = Math.floor(value / rateStageBNB);
                }
            }

            if (isNaN(smrtAmount) || !isFinite(smrtAmount)) {
                smrtAmount = 0;
            }

            setSMRTAmount(smrtAmount);
        }
    };

    const handleCurrencyChange = (selectedCurrency) => {
        setCurrency(selectedCurrency);
        handleAmountChange(selectedCurrency, amount); // Recalculate smrtAmount on currency change
    };

    const disconnectWallet = () => {
        disconnect()

        setAccount(null);
        setMetamaskAccount(null);
        setBuyBalance(0);
        setAmount('');
        setSMRTAmount(0);
        toast.info('Wallet disconnected');
    };

    useEffect(() => {
        const fetchContractData = async () => {
            const presaleContract = new bscWeb3.eth.Contract(PRESALE_CONTRACT_ABI, PRESALE_CONTRACT_ADDRESS);

            try {
                const currentStageValue = await presaleContract.methods.currentStage().call();
                const currentStageValueNumber = Number(currentStageValue)
                setCurrentStage(currentStageValueNumber);

                const [
                    totalSold,
                    endTime,
                    rateStageBNB,
                    rateStageUsdt,
                    rateNextStageUsdt
                ] = await Promise.all([
                    presaleContract.methods.totalSold().call(),
                    presaleContract.methods[`endTime${currentStageValueNumber}`]().call(),
                    presaleContract.methods[`rateStage${currentStageValueNumber}BNB`]().call(),
                    presaleContract.methods[`rateStage${currentStageValueNumber}Usdt`]().call(),
                    presaleContract.methods[`rateStage${currentStageValueNumber + 1}Usdt`]().call(),
                ]);

                // Convert BigInt to strings or numbers as needed
                const endTimeNumber = Number(endTime);
                const totalSoldNumber = Number(totalSold);
                const rateStageBNBNumber = Number(rateStageBNB);
                const rateStageUsdtNumber = Number(rateStageUsdt);
                const rateNextStageUsdtNumber = Number(rateNextStageUsdt);

                console.log('endTime:', endTimeNumber);
                console.log('totalSold:', convertWeiToEther(totalSoldNumber));
                console.log('rateStageBNB:', convertWeiToEther(rateStageBNBNumber));
                console.log('rateStageUsdt:', convertWeiToEther(rateStageUsdtNumber));
                console.log('rateNextStageUsdt:', convertWeiToEther(rateNextStageUsdtNumber));

                seEndTime(endTimeNumber)
                setTotalSold(convertWeiToEther(totalSoldNumber))
                setRateStageBNB(convertWeiToEther(rateStageBNBNumber))
                setRateStageUSDT(convertWeiToEther(rateStageUsdtNumber))
                setRateNextStageUSDT(convertWeiToEther(rateNextStageUsdtNumber))

            } catch (error) {
                console.error("Error fetching contract data:", error);
            }
        };

        fetchContractData();
    }, []);

    return (
        <div className='widget'>
            <ToastContainer />
            {/* <div className="stage">
                Presale Stage#&nbsp; <b>{currentStage}</b>
            </div> */}
            <div className="price">
                <b>Presale Stage# {currentStage}</b>
            </div>

            {/* <div className="price">
                <b>Listing Price</b>
                <b>$0.04</b>
            </div> */}
            <div className="timer">
                <div className="time">
                    <div className="digits">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="unit">DAYS</div>
                </div>
                <div className="dots">:</div>
                <div className="time">
                    <div className="digits">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="unit">HOURS</div>
                </div>
                <div className="dots">:</div>
                <div className="time">
                    <div className="digits">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="unit">MINUTES</div>
                </div>
                <div className="dots">:</div>
                <div className="time">
                    <div className="digits">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="unit">SECONDS</div>
                </div>
            </div>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: `${progressPercentage}%` }} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
                <div className="text">
                    Until Next Price ${rateNextStageUSDT}
                </div>
            </div>
            <div className="raised">
                Tokens Sold:&nbsp; <b>${totalSold} / ${220000000}</b>

            </div>
            <div className="balance">
                <b>Your Purchased $SMRT</b>
                <div className='claim-wrapper'>
                    <div className='claim-text'>
                        <b>{buyBalance}</b> <span>SMRT</span>
                    </div>
                    {/* <div className="btn btn-claim" onClick={claimTokens}>Claim</div> */}
                </div>
            </div>

            <div className="equal">
                <svg xmlns="http://www.w3.org/2000/svg" width="122" height="3" viewBox="0 0 122 3" fill="none">
                    <path d="M0 1.28809L121.044 1.28808" stroke="url(#paint0_linear_2065_3602)" strokeWidth="2" />
                    <defs>
                        <linearGradient id="paint0_linear_2065_3602" x1="11.5893" y1="1.78808" x2="176.415" y2="1.78807" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#72F1C8" />
                            <stop offset="0.445" stopColor="#627EEA" />
                            <stop offset="1" stopColor="#1A5853" />
                        </linearGradient>
                    </defs>
                </svg>
                <span className='text-nowrap'>
                    1 $SMRT = ${rateStageUSDT}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="122" height="3" viewBox="0 0 122 3" fill="none">
                    <path d="M0.955078 1.28806L121.999 1.28805" stroke="url(#paint0_linear_2065_3602)" strokeWidth="2" />
                    <defs>
                        <linearGradient id="paint0_linear_2065_3602" x1="-236.411" y1="1.78808" x2="-71.5847" y2="1.78807" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#72F1C8" />
                            <stop offset="0.445" stopColor="#627EEA" />
                            <stop offset="1" stopColor="#1A5853" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="currencies">
                <div className={`currency ${currency === 'BNB' ? 'active' : ''}`} onClick={() => handleCurrencyChange('BNB')}>
                    <img alt='' src={bnb} /> BNB
                </div>
                <div className={`currency ${currency === 'USDT' ? 'active' : ''}`} onClick={() => handleCurrencyChange('USDT')}>
                    <img alt='' src={usdt} className='rounded' /> USDT
                </div>
            </div>
            <div>
                <label htmlFor="amountInput" className="form-label">Amount You Pay in {currency}:</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        className="form-control"
                        id="amountInput"
                        value={amount}
                        onChange={(e) => handleAmountChange(currency, e.target.value)}
                    />
                    <img className={currency} alt='' src={currency === 'BNB' ? bnb : usdt} />
                </div>
            </div>
            <div>
                <label htmlFor="smrtAmountInput" className="form-label">Amount To Buy SMRT:</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        className="form-control"
                        id="smrtAmountInput"
                        value={smrtAmount}
                        readOnly
                    />
                    <img alt='' src={smrtlogo} />
                </div>
            </div>
            {
                account ?
                    <div>
                        <button className="btn btn-buy " onClick={buyTokens}>Buy Now ({account.substring(0, 6)}...{account.substring(account.length - 4)})</button>
                        <button id="disconnectButton" className="btn btn-buy" style={{ display: 'none' }} onClick={disconnectWallet}>Disconnect ({account.substring(0, 6)}...{account.substring(account.length - 4)})</button>
                    </div>
                    :
                    <div>
                        <button id="connectButton" className="btn btn-buy" onClick={open}>Connect Wallet</button>
                    </div>
            }
        </div>
    );
};

export default Widget;
