import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Xlogo, eth, usdt, busd, bnb, card } from '../assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    WALLET_CONNECT_PROJECT_ID,
    INFURA_RPC_URL_ETHEREUM, INFURA_RPC_URL_BINANCE,
    OXANA_ETHEREUM_CONTRACT_ABI, OXANA_BINANCE_CONTRACT_ABI,
    OXANA_ETHEREUM_CONTRACT_ADDRESS, OXANA_BINANCE_CONTRACT_ADDRESS,
    USDT_DECIMALS, BUSD_DECIMALS,
    USDT_CONTRACT_ABI, BUSD_CONTRACT_ABI,
    USDT_CONTRACT_ADDRESS, BUSD_CONTRACT_ADDRESS,
} from '../config';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { useWeb3Modal, useDisconnect } from '@web3modal/ethers5/react'

// 1. Your WalletConnect Cloud project ID
const projectId = WALLET_CONNECT_PROJECT_ID

// 2. Set chains
const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: INFURA_RPC_URL_ETHEREUM
}
const Binance = {
    chainId: 56,
    name: 'Binance',
    currency: 'BNB',
    explorerUrl: 'https://bscscan.com/',
    rpcUrl: INFURA_RPC_URL_BINANCE
}

// 3. Create a metadata object
const metadata = {
    name: 'Oxana Project',
    description: 'Oxana Wallet Connect Modal',
    url: 'https://oxana.francismiho.pro/', // origin must match your domain & subdomain
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
    chains: [mainnet, Binance],
    projectId,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const Widget = ({ setMetamaskAccount }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const [web3, setWeb3] = useState();
    const bscWeb3 = new Web3(INFURA_RPC_URL_BINANCE);
    const ethWeb3 = new Web3(INFURA_RPC_URL_ETHEREUM);

    const [endTime, seEndTime] = useState(0);
    const [salePrice, setSalePrice] = useState(0.02);
    const [nextPrice, setNextPrice] = useState(0.05);

    const { open } = useWeb3Modal()
    const { disconnect } = useDisconnect()
    const { walletProvider } = useWeb3ModalProvider()

    const [account, setAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);

    const [currency, setCurrency] = useState('ETH');
    const [amount, setAmount] = useState('');
    const [oxanaAmount, setOxanaAmount] = useState(0);

    const [ETHPrice, setETHPrice] = useState(0);
    const [BNBPrice, setBNBPrice] = useState(0);
    const [userDeposits, setUserDeposits] = useState(0);
    const [totalSold, setTotalSold] = useState(0);
    const [totalForSale, setTotalForSale] = useState(0);
    const [claimStart, setClaimStart] = useState(false);

    const progressPercentage = ((totalSold / totalForSale) * 100).toFixed(2);

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
            setMetamaskAccount(accounts[0]);

            const oxanaContract = new web3Instance.eth.Contract(
                networkId === 1 ? OXANA_ETHEREUM_CONTRACT_ABI : OXANA_BINANCE_CONTRACT_ABI,
                networkId === 1 ? OXANA_ETHEREUM_CONTRACT_ADDRESS : OXANA_BINANCE_CONTRACT_ADDRESS
            );

            const userDepositsBN = await oxanaContract.methods.userDeposits(accounts[0]).call();
            const userDeposits = Number(userDepositsBN)
            console.log('userDeposits:', convertWeiToEther(userDeposits));

            if (userDeposits > 0) {
                setUserDeposits(convertWeiToEther(userDeposits))
            } else {
                setUserDeposits(userDeposits)
            }

        }
    };

    const approveToken = async (tokenContract, spender, amountInWei) => {
        try {
            const allowanceBN = await tokenContract.methods.allowance(account, spender).call();
            const allowance = Number(allowanceBN);
            if (currency === 'USDT') {
                console.log('allowance:', web3.utils.fromWei(allowance, 'mwei'));
            }
            else {
                console.log('allowance:', web3.utils.fromWei(allowance, 'ether'));
            }

            if (allowance > amountInWei) {
                return true; // Return true if sufficient allowance is already granted
            }
            await tokenContract.methods.approve(spender, amountInWei).send({ from: account })
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
                    throw new Error('Approval transaction failed!');
                });
            return true; // Return true if approval was successful
        } catch (error) {
            console.log('error:', error);
            toast.error('Transaction failed!');
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
        if (Number(oxanaAmount) < 50) {
            toast.info('The minimum purchase amount is 50 tokens.');
            return;
        }

        let currentNetworkId = networkId; // Use a local variable to track network ID

        try {
            if ((currency === 'ETH' || currency === 'USDT') && currentNetworkId !== 1) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x1' }], // chainId for Ethereum mainnet
                    });
                    currentNetworkId = 1;
                    setNetworkId(1); // Update state
                    toast.success('Switched to Ethereum network');
                } catch (switchError) {
                    console.log('switchError:', switchError);
                    if (switchError.code === 4902) {
                        // Chain not added, add it
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x1',
                                chainName: 'Ethereum Mainnet',
                                nativeCurrency: {
                                    name: 'Ether',
                                    symbol: 'ETH',
                                    decimals: 18,
                                },
                                rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
                                blockExplorerUrls: ['https://etherscan.io'],
                            }],
                        });
                        currentNetworkId = 1;
                        setNetworkId(1); // Update state
                        toast.success('Ethereum network added to MetaMask');
                    } else {
                        toast.error('Failed to switch network');
                        return;
                    }
                }
            } else if ((currency === 'BNB' || currency === 'BUSD') && currentNetworkId !== 56) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x38' }], // chainId for Binance Smart Chain
                    });
                    currentNetworkId = 56;
                    setNetworkId(56); // Update state
                    toast.success('Switched to Binance Smart Chain network');
                } catch (switchError) {
                    console.log('switchError:', switchError);
                    if (switchError.code === 4902) {
                        // Chain not added, add it
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
                        setNetworkId(56); // Update state
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
        let amountInWei = 0;
        if (currency === 'USDT') {
            amountInWei = web3.utils.toWei(amount, 'mwei');
        } else {
            amountInWei = web3.utils.toWei(amount, 'ether');
        }

        if (currency === 'USDT') {
            const tokenContract = new web3.eth.Contract(USDT_CONTRACT_ABI, USDT_CONTRACT_ADDRESS);
            approvalSuccess = await approveToken(tokenContract, OXANA_ETHEREUM_CONTRACT_ADDRESS, amountInWei);
        } else if (currency === 'BUSD') {
            const tokenContract = new web3.eth.Contract(BUSD_CONTRACT_ABI, BUSD_CONTRACT_ADDRESS);
            approvalSuccess = await approveToken(tokenContract, OXANA_BINANCE_CONTRACT_ADDRESS, amountInWei);
        }

        if (approvalSuccess) {
            const oxanaContract = new web3.eth.Contract(
                currentNetworkId === 1 ? OXANA_ETHEREUM_CONTRACT_ABI : OXANA_BINANCE_CONTRACT_ABI,
                currentNetworkId === 1 ? OXANA_ETHEREUM_CONTRACT_ADDRESS : OXANA_BINANCE_CONTRACT_ADDRESS
            );

            try {
                let method;
                switch (currency) {
                    case 'ETH':
                        method = oxanaContract.methods.buyWithETH(oxanaAmount.toString());
                        break;
                    case 'USDT':
                        method = oxanaContract.methods.buyWithUSD(oxanaAmount.toString(), 0);
                        break;
                    case 'BNB':
                        method = oxanaContract.methods.buyWithBNB(oxanaAmount.toString());
                        break;
                    case 'BUSD':
                        method = oxanaContract.methods.buyWithUSD(oxanaAmount.toString(), 0);
                        break;
                    default:
                        throw new Error('Unsupported currency');
                }
                await method.send({ from: account, value: currency === 'ETH' || currency === 'BNB' ? amountInWei : 0 })
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


    const claimTokens = async () => {
        if (!claimStart) {
            toast.info('Claim is paused for now, please try later!');
            return;
        }
        if (!web3 || !account) {
            toast.info('Please connect your wallet!');
            return;
        }
        if (!userDeposits) {
            toast.info('Nothing to claim yet!');
            return;
        }

        const oxanaContract = new web3.eth.Contract(
            networkId === 1 ? OXANA_ETHEREUM_CONTRACT_ABI : OXANA_BINANCE_CONTRACT_ABI,
            networkId === 1 ? OXANA_ETHEREUM_CONTRACT_ADDRESS : OXANA_BINANCE_CONTRACT_ADDRESS
        );

        try {
            await oxanaContract.methods.claim().send({ from: account })
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
        let localWeb3 = web3 || ethWeb3
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
            let oxanaAmount = 0;
            if (salePrice > 0) {
                if (currency === 'USDT' || currency === 'BUSD') {
                    oxanaAmount = Math.floor(value / salePrice);
                } else if (currency === 'ETH' && ETHPrice > 0) {
                    oxanaAmount = Math.floor((value * ETHPrice) / salePrice);
                } else if (currency === 'BNB' && BNBPrice > 0) {
                    oxanaAmount = Math.floor((value * BNBPrice) / salePrice);
                }
            }

            if (isNaN(oxanaAmount) || !isFinite(oxanaAmount)) {
                oxanaAmount = 0; // Set to 0 if the result is not a valid number
            }

            setOxanaAmount(oxanaAmount);
        }
    };


    const handleCurrencyChange = (selectedCurrency) => {
        setCurrency(selectedCurrency);
        handleAmountChange(selectedCurrency, amount); // Recalculate oxanaAmount on currency change
    };

    const disconnectWallet = () => {
        disconnect()

        setAccount(null);
        setMetamaskAccount(null);
        setUserDeposits(0);
        setAmount('');
        setOxanaAmount(0);
        toast.info('Wallet disconnected');
    };

    useEffect(() => {
        const fetchContractData = async () => {
            const ethContract = new ethWeb3.eth.Contract(OXANA_ETHEREUM_CONTRACT_ABI, OXANA_ETHEREUM_CONTRACT_ADDRESS);
            const bscContract = new bscWeb3.eth.Contract(OXANA_BINANCE_CONTRACT_ABI, OXANA_BINANCE_CONTRACT_ADDRESS);

            try {
                const [
                    endTime,
                    salePrice,
                    nextPrice,
                    ETHPrice,
                    BNBPrice,
                    ETHSOLD,
                    BNBSOLD,
                    totalUsdValueForPresale
                ] = await Promise.all([
                    ethContract.methods.endTime().call(),
                    ethContract.methods.salePrice().call(),
                    ethContract.methods.nextPrice().call(),
                    ethContract.methods.getETHLatestPrice().call(),
                    bscContract.methods.getBNBLatestPrice().call(),
                    ethContract.methods.inSaleUSDvalue().call(),
                    bscContract.methods.inSaleUSDvalue().call(),
                    ethContract.methods.totalUsdValueForPresale().call(),
                    ethContract.methods.claimStart().call(),
                ]);

                console.log('endTime', endTime.toString());
                console.log('salePrice', convertWeiToEther(salePrice));
                console.log('nextPrice', convertWeiToEther(nextPrice));
                console.log('ETHPrice', convertWeiToEther(ETHPrice));
                console.log('BNBPrice', convertWeiToEther(BNBPrice));
                console.log('ETHSOLD', convertWeiToEther(ETHSOLD));
                console.log('BNBSOLD', convertWeiToEther(BNBSOLD));
                console.log('totalUsdValueForPresale', Number(totalUsdValueForPresale));
                console.log('claimStart:', !!claimStart);

                seEndTime(endTime.toString());
                setSalePrice(convertWeiToEther(salePrice));
                setNextPrice(convertWeiToEther(nextPrice));
                setETHPrice(convertWeiToEther(ETHPrice));
                setBNBPrice(convertWeiToEther(BNBPrice));
                setClaimStart(!!claimStart)

                let ETHSOLDUSD = convertWeiToEther(ETHSOLD);
                let BNBSOLDUSD = convertWeiToEther(BNBSOLD);
                let totalForSale = Number(totalUsdValueForPresale);

                let soldInETH = Number(totalForSale) - Number(ETHSOLDUSD);
                let soldInBNB = Number(totalForSale) - Number(BNBSOLDUSD);
                let totalSold = (Number(soldInETH) + Number(soldInBNB)).toFixed(2);

                setTotalSold(totalSold);
                setTotalForSale(totalForSale);
            } catch (error) {
                console.error("Error fetching contract data:", error);
            }
        };

        fetchContractData();
    }, []);

    return (
        <div className='widget'>
            <ToastContainer />
            <div className="price">
                <b>Listing Price</b>
                <b>$0.075</b>
            </div>
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
                    Until Next Price ${nextPrice}
                </div>
            </div>
            <div className="raised">
                USD Raised:&nbsp; <b>${totalSold} / ${totalForSale}</b>

            </div>
            <div className="balance">
                <b>My Wallet Balance</b>
                <div className='claim-wrapper'>
                    <div className='claim-text'>
                        <b>{userDeposits}</b> <span>Oxana</span>
                    </div>
                    <div className="btn btn-claim" onClick={claimTokens}>Claim</div>
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
                    1 OXANA = ${salePrice}
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
                <div className={`currency ${currency === 'ETH' ? 'active' : ''}`} onClick={() => handleCurrencyChange('ETH')}>
                    <img alt='' src={eth} /> ETH
                </div>
                <div className={`currency ${currency === 'USDT' ? 'active' : ''}`} onClick={() => handleCurrencyChange('USDT')}>
                    <img alt='' src={usdt} /> USDT
                </div>
                <div className={`currency ${currency === 'BNB' ? 'active' : ''}`} onClick={() => handleCurrencyChange('BNB')}>
                    <img alt='' src={bnb} /> BNB
                </div>
                <div className={`currency ${currency === 'BUSD' ? 'active' : ''}`} onClick={() => handleCurrencyChange('BUSD')}>
                    <img alt='' src={busd} className='rounded' /> BUSD
                </div>

                <div className={`currency ${currency === 'CARD' ? 'active' : ''}`} onClick={() => handleCurrencyChange('CARD')}>
                    <img alt='' src={card} /> Card
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
                    <img className={currency} alt='' src={currency === 'ETH' ? eth : currency === 'USDT' ? usdt : currency === 'BNB' ? bnb : currency === 'BUSD' ? busd : card} />
                </div>
            </div>
            <div>
                <label htmlFor="oxanaAmountInput" className="form-label">Amount To Buy OXANA:</label>
                <div className="input-wrapper">
                    <input
                        type="text"
                        className="form-control"
                        id="oxanaAmountInput"
                        value={oxanaAmount}
                        readOnly
                    />
                    <img alt='' src={Xlogo} />
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
