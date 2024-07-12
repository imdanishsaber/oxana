import React, { useState, useEffect } from 'react'
import Widget from './Widget'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Xlogo, Oxanalogo, standards, w1, w2, w3, table, chart, oxanablack,
    Coinbase, Gate, nomics, DappRader, CryptoCompare, MN, MEXC, nodehub, CoinGecko,
    KUCOIN, question, facebookwhite, twitterwhite, discordwhite, sharewhite, youtubewhite,
    team1, team2, team3, team4,
} from '../assets'

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


const Main = () => {
    AOS.init();

    const data = {
        datasets: [
            {
                data: [15, 10, 25, 10, 25, 10, 5],
                backgroundColor: ["#72F1C8", "#F7931A", "#317800", "#CB89F0", "#64C8FF", "#627EEA", "#0B131C"],
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                color: '#fff',
                formatter: (value) => {
                    return `${value}%`;
                },
                font: {
                    weight: 'bold',
                    size: 16
                },
                align: 'end',
                anchor: 'end',
                clamp: true,
                clip: false
            }
        },
        layout: {
            padding: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 30
            }
        },
        elements: {
            arc: {
                width: 20,
                borderWidth: 0
            }
        },
        cutout: '60%'
    };


    const [account, setAccount] = useState(null);

    const handleConnect = () => {
        document.getElementById('connectButton').click();
    };

    const handleDisconnect = () => {
        document.getElementById('disconnectButton').click();
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img alt='' src={Oxanalogo} />

                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" href="#about">ABOUT</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#usecase">USE CASE</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#roadmap">ROAD MAP</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#team">TEAM</a>
                            </li>
                        </ul>
                        <div id="google_translate_element"></div>
                        {/* <div className="dropdown">
                            <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <mask id="mask0_2087_4598" maskUnits="userSpaceOnUse" x="0" y="0" width="10" height="10">
                                        <path d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_2087_4598)">
                                        <path d="M0 0L0.15625 0.429688L0 0.878906V1.32812L0.625 2.38281L0 3.4375V4.0625L0.625 5L0 5.9375V6.5625L0.625 7.61719L0 8.67188V10L0.429688 9.84375L0.878906 10H1.32812L2.38281 9.375L3.4375 10H4.0625L5 9.375L5.9375 10H6.5625L7.61719 9.375L8.67188 10H10L9.84375 9.57031L10 9.12109V8.67188L9.375 7.61719L10 6.5625V5.9375L9.375 5L10 4.0625V3.4375L9.375 2.38281L10 1.32812V0L9.57031 0.15625L9.12109 0H8.67188L7.61719 0.625L6.5625 0H5.9375L5 0.625L4.0625 0H3.4375L2.38281 0.625L1.32812 0H0Z" fill="#EEEEEE" />
                                        <path d="M6.5625 0V2.10938L8.67188 0H6.5625ZM10 1.32812L7.89062 3.4375H10V1.32812ZM0 3.4375H2.10938L0 1.32812V3.4375ZM1.32812 0L3.4375 2.10938V0H1.32812ZM3.4375 10V7.89062L1.32812 10H3.4375ZM0 8.67188L2.10938 6.5625H0V8.67188ZM10 6.5625H7.89062L10 8.67188V6.5625ZM8.67188 10L6.5625 7.89062V10H8.67188Z" fill="#0052B4" />
                                        <path d="M0 0V0.878906L2.55859 3.4375H3.4375L0 0ZM4.0625 0V4.0625H0V5.9375H4.0625V10H5.9375V5.9375H10V4.0625H5.9375V0H4.0625ZM9.12109 0L6.5625 2.55859V3.4375L10 0H9.12109ZM3.4375 6.5625L0 10H0.878906L3.4375 7.44141V6.5625ZM6.5625 6.5625L10 10V9.12109L7.44141 6.5625H6.5625Z" fill="#D80027" />
                                    </g>
                                </svg>
                                EN

                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">German</a></li>
                                <li><a className="dropdown-item" href="#">Dutch</a></li>
                                <li><a className="dropdown-item" href="#">Japanes</a></li>
                            </ul>
                        </div> */}
                        {
                            account ?
                                <button className="btn btn-primary" onClick={handleDisconnect}>Disconnect  ({account.substring(0, 6)}...{account.substring(account.length - 4)})</button>
                                :
                                <button className="btn btn-primary" onClick={handleConnect}>CONNECT WALLET</button>
                        }
                    </div>
                </div>
            </nav>

            <section id='hero' className='hero'>
                <div className="container">
                    <div className="row" data-aos="fade-down" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                        <div className="col-12 col-lg-6">
                            <div className="hero-left">
                                <ul className='social-icons'>
                                    <li><img alt='' src={facebookwhite} /></li>
                                    <li><img alt='' src={twitterwhite} /></li>
                                    <li><img alt='' src={discordwhite} /></li>
                                    <li><img alt='' src={sharewhite} /></li>
                                    <li><img alt='' src={youtubewhite} /></li>
                                </ul>
                                <div className='hero-text'>
                                    <h1 className='text-center-local'>
                                        Empowering <br />
                                        Sustainability through
                                        <br />
                                        AI and Blockchain
                                    </h1>
                                    <p className='text-center-local'>Welcome to Oxana, where innovation meets sustainability. We invite you to join us in our ambitious mission to fight climate change, reduce the carbon footprint, and make the world a more sustainable </p>
                                    <div className='text-center-local'>
                                        <button className='btn btn-primary' >
                                            WHITEPAPER
                                        </button>
                                        <button className='btn btn-secondary' >
                                            AUDIT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-1"></div>
                        <div className="col-12 col-lg-5">
                            <Widget setMetamaskAccount={setAccount} />
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <section id='about' className='standards' data-aos="fade-up" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                    <div className="standards-left">
                        <img alt='' src={standards} />
                    </div>
                    <div className="standards-right">
                        <h1>
                            Standards <br />
                            Advancing the Oxana <br />
                            IBlockchain Experience
                        </h1>
                        <p>At Oxana, we envision a future where energy is both sustainable and decentralized, harnessing the power of AI to enhance renewable energy resources, distributed energy systems, and mini grids, thereby making clean energy more accessible and efficient.  The Oxana Token ($OX), built on the Ethereum blockchain, is central to our AI-powered renewable energy ecosystem, driving the development and deployment of AI solutions to mitigate the impacts of climate change.</p>
                        <div>

                            <button className='btn btn-primary' >
                                Whitepaper
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <path d="M23.1771 0.351543L23.1531 0.353543H15.0851L7.5431 7.89554L16.4091 16.7625L24.0001 9.17254V1.15554C24.0003 1.04839 23.979 0.942287 23.9375 0.843487C23.896 0.744686 23.8352 0.655187 23.7586 0.580261C23.682 0.505335 23.5912 0.446499 23.4915 0.407218C23.3918 0.367938 23.2842 0.349008 23.1771 0.351543ZM1.9311 0.353543C1.77371 0.355211 1.62027 0.403101 1.48987 0.491258C1.35947 0.579415 1.25786 0.703953 1.19766 0.84939C1.13746 0.994826 1.12133 1.15475 1.15128 1.30928C1.18123 1.4638 1.25593 1.60612 1.3661 1.71854L6.8351 7.18854L13.6701 0.353543H1.9311ZM16.8241 2.67954C16.8943 2.67961 16.9637 2.69361 17.0284 2.72074C17.0932 2.74786 17.1518 2.78756 17.2011 2.83754L18.1391 3.77254C18.189 3.82225 18.2286 3.88131 18.2556 3.94635C18.2826 4.01139 18.2965 4.08112 18.2965 4.15154C18.2965 4.22197 18.2826 4.2917 18.2556 4.35674C18.2286 4.42177 18.189 4.48084 18.1391 4.53054L17.2011 5.46654C17.1516 5.51637 17.0927 5.55591 17.0278 5.5829C16.9629 5.60988 16.8934 5.62377 16.8231 5.62377C16.7528 5.62377 16.6833 5.60988 16.6184 5.5829C16.5535 5.55591 16.4946 5.51637 16.4451 5.46654L15.5081 4.53054C15.4582 4.48084 15.4186 4.42177 15.3916 4.35674C15.3646 4.2917 15.3507 4.22197 15.3507 4.15154C15.3507 4.08112 15.3646 4.01139 15.3916 3.94635C15.4186 3.88131 15.4582 3.82225 15.5081 3.77254L16.4451 2.83754C16.5459 2.73678 16.6825 2.67999 16.8251 2.67954M13.4431 6.06754C13.5801 6.06754 13.7171 6.11854 13.8221 6.22354L14.7571 7.16154C14.8069 7.21108 14.8465 7.26997 14.8735 7.33485C14.9004 7.39972 14.9143 7.46928 14.9143 7.53954C14.9143 7.6098 14.9004 7.67937 14.8735 7.74424C14.8465 7.80911 14.8069 7.86801 14.7571 7.91754L13.8221 8.85454C13.7724 8.90443 13.7133 8.94402 13.6483 8.97103C13.5833 8.99804 13.5135 9.01194 13.4431 9.01194C13.3727 9.01194 13.3029 8.99804 13.2379 8.97103C13.1729 8.94402 13.1138 8.90443 13.0641 8.85454L12.1281 7.91754C12.0783 7.86801 12.0387 7.80911 12.0117 7.74424C11.9848 7.67937 11.9709 7.6098 11.9709 7.53954C11.9709 7.46928 11.9848 7.39972 12.0117 7.33485C12.0387 7.26997 12.0783 7.21108 12.1281 7.16154L13.0641 6.22354C13.1138 6.17368 13.1728 6.13421 13.2379 6.10743C13.303 6.08064 13.3727 6.06708 13.4431 6.06754ZM20.2161 6.06954C20.3562 6.07181 20.49 6.12847 20.5891 6.22754L21.5191 7.15754C21.5693 7.20737 21.6092 7.26664 21.6364 7.33195C21.6636 7.39726 21.6776 7.4673 21.6776 7.53804C21.6776 7.60879 21.6636 7.67883 21.6364 7.74414C21.6092 7.80944 21.5693 7.86872 21.5191 7.91854L20.5891 8.84854C20.5393 8.89891 20.4799 8.9389 20.4145 8.96619C20.3491 8.99348 20.279 9.00753 20.2081 9.00753C20.1372 9.00753 20.0671 8.99348 20.0017 8.96619C19.9363 8.9389 19.8769 8.89891 19.8271 8.84854L18.8971 7.91854C18.8469 7.86872 18.807 7.80944 18.7798 7.74414C18.7526 7.67883 18.7386 7.60879 18.7386 7.53804C18.7386 7.4673 18.7526 7.39726 18.7798 7.33195C18.807 7.26664 18.8469 7.20737 18.8971 7.15754L19.8271 6.22754C19.8781 6.17657 19.9388 6.13632 20.0056 6.10919C20.0724 6.08205 20.144 6.06857 20.2161 6.06954ZM16.8301 9.44854C16.9003 9.44861 16.9697 9.46261 17.0344 9.48973C17.0992 9.51686 17.1579 9.55656 17.2071 9.60654L18.1451 10.5415C18.195 10.5912 18.2346 10.6503 18.2616 10.7154C18.2886 10.7804 18.3025 10.8501 18.3025 10.9205C18.3025 10.991 18.2886 11.0607 18.2616 11.1257C18.2346 11.1908 18.195 11.2498 18.1451 11.2995L17.2071 12.2365C17.1576 12.2864 17.0987 12.3259 17.0338 12.3529C16.9689 12.3799 16.8994 12.3938 16.8291 12.3938C16.7588 12.3938 16.6893 12.3799 16.6244 12.3529C16.5595 12.3259 16.5006 12.2864 16.4511 12.2365L15.5141 11.2995C15.4642 11.2498 15.4246 11.1908 15.3976 11.1257C15.3706 11.0607 15.3567 10.991 15.3567 10.9205C15.3567 10.8501 15.3706 10.7804 15.3976 10.7154C15.4246 10.6503 15.4642 10.5912 15.5141 10.5415L16.4511 9.60654C16.5519 9.50578 16.6875 9.44899 16.8301 9.44854ZM5.8161 10.1705C5.76593 10.1705 5.71624 10.1803 5.6699 10.1995C5.62356 10.2188 5.58148 10.247 5.5461 10.2825L0.118101 15.7115C0.0825749 15.7469 0.0543814 15.7888 0.0351428 15.8351C0.0159042 15.8814 0.006 15.931 0.006 15.981C0.006 16.0311 0.0159042 16.0807 0.0351428 16.127C0.0543814 16.1732 0.0825749 16.2152 0.118101 16.2505L1.2741 17.4065C1.34535 17.4777 1.44192 17.5176 1.5426 17.5176C1.64329 17.5176 1.73985 17.4777 1.8111 17.4065L7.2431 11.9755C7.31424 11.9043 7.3542 11.8077 7.3542 11.707C7.3542 11.6064 7.31424 11.5098 7.2431 11.4385L6.0861 10.2825C6.05072 10.247 6.00864 10.2188 5.9623 10.1995C5.91596 10.1803 5.86627 10.1705 5.8161 10.1705ZM24.0001 10.5865L17.1171 17.4695L22.5901 22.9395C22.6992 23.066 22.8451 23.1552 23.0073 23.1949C23.1696 23.2345 23.3401 23.2226 23.4953 23.1608C23.6504 23.0989 23.7824 22.9903 23.8729 22.8499C23.9634 22.7095 24.0079 22.5444 24.0001 22.3775V10.5865ZM9.1801 13.5985C9.12986 13.5986 9.08013 13.6086 9.03378 13.628C8.98744 13.6474 8.9454 13.6758 8.9101 13.7115L0.112101 22.5085C0.0765749 22.5439 0.0483814 22.5858 0.0291428 22.6321C0.00990418 22.6784 0 22.728 0 22.778C0 22.8281 0.00990418 22.8777 0.0291428 22.924C0.0483814 22.9702 0.0765749 23.0122 0.112101 23.0475L1.2681 24.2035C1.30343 24.2392 1.34549 24.2675 1.39183 24.2869C1.43817 24.3062 1.48789 24.3161 1.5381 24.3161C1.58831 24.3161 1.63803 24.3062 1.68437 24.2869C1.73071 24.2675 1.77277 24.2392 1.8081 24.2035L10.6041 15.4045C10.6396 15.3692 10.6678 15.3272 10.6871 15.281C10.7063 15.2347 10.7162 15.1851 10.7162 15.135C10.7162 15.085 10.7063 15.0354 10.6871 14.9891C10.6678 14.9428 10.6396 14.9009 10.6041 14.8655L9.4501 13.7115C9.4148 13.6758 9.37276 13.6474 9.32642 13.628C9.28007 13.6086 9.23034 13.5986 9.1801 13.5985ZM12.5451 16.9465C12.4951 16.9462 12.4455 16.9557 12.3991 16.9746C12.3528 16.9935 12.3106 17.0213 12.2751 17.0565L6.8451 22.4885C6.77396 22.5598 6.734 22.6564 6.734 22.757C6.734 22.8577 6.77396 22.9543 6.8451 23.0255L8.0001 24.1815C8.03542 24.2171 8.07741 24.2453 8.12366 24.2645C8.16991 24.2837 8.21951 24.2936 8.2696 24.2936C8.31969 24.2936 8.36929 24.2837 8.41554 24.2645C8.46179 24.2453 8.50379 24.2171 8.5391 24.1815L13.9681 18.7505C14.0392 18.6793 14.0792 18.5827 14.0792 18.482C14.0792 18.3814 14.0392 18.2848 13.9681 18.2135L12.8121 17.0575C12.7411 16.9862 12.6447 16.9459 12.5441 16.9455" fill="white" />
                                </svg>
                            </button>
                            <button className='btn btn-primary' >
                                Buy Now
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" viewBox="0 0 25 27" fill="none">
                                    <path d="M22.9571 25.3971L22.957 25.373L23.5762 17.3288L16.6354 9.23018L7.11402 17.3894L14.099 25.5406L22.0923 26.156C22.1992 26.1643 22.3066 26.1513 22.4083 26.1175C22.51 26.0837 22.6039 26.0299 22.6845 25.9593C22.765 25.8887 22.8307 25.8027 22.8775 25.7063C22.9243 25.6099 22.9514 25.5041 22.9571 25.3971ZM24.5859 4.21362C24.5963 4.05657 24.5603 3.89991 24.4824 3.76313C24.4046 3.62635 24.2882 3.51547 24.1478 3.44429C24.0074 3.3731 23.8492 3.34475 23.6928 3.36275C23.5365 3.38074 23.3888 3.4443 23.2683 3.54552L17.3946 8.57853L23.6849 15.918L24.5859 4.21362ZM21.1236 18.8842C21.1182 18.9541 21.0989 19.0223 21.0669 19.0847C21.0349 19.1472 20.9908 19.2026 20.9372 19.2479L19.9329 20.1114C19.8795 20.1573 19.8176 20.1922 19.7507 20.2142C19.6838 20.2361 19.6132 20.2446 19.543 20.2392C19.4727 20.2338 19.4043 20.2146 19.3415 20.1827C19.2787 20.1508 19.2229 20.1068 19.1772 20.0532L18.3159 19.0461C18.27 18.9929 18.2351 18.9312 18.2132 18.8644C18.1913 18.7977 18.1828 18.7272 18.1882 18.6572C18.1936 18.5871 18.2127 18.5188 18.2446 18.4562C18.2765 18.3936 18.3205 18.3379 18.3739 18.2924L19.3791 17.43C19.4325 17.384 19.4944 17.3491 19.5613 17.3272C19.6283 17.3052 19.6988 17.2967 19.7691 17.3021C19.8393 17.3075 19.9077 17.3267 19.9705 17.3587C20.0333 17.3906 20.0891 17.4346 20.1349 17.4881L20.9952 18.4941C21.0879 18.6024 21.134 18.743 21.1235 18.8852M18.0051 15.2531C17.9946 15.3897 17.9333 15.5224 17.8205 15.619L16.8135 16.4792C16.7603 16.5251 16.6985 16.56 16.6318 16.5819C16.565 16.6039 16.4946 16.6124 16.4245 16.607C16.3545 16.6016 16.2862 16.5824 16.2236 16.5505C16.161 16.5186 16.1053 16.4747 16.0597 16.4212L15.1973 15.417C15.1513 15.3637 15.1164 15.3017 15.0945 15.2348C15.0725 15.1679 15.064 15.0973 15.0694 15.0271C15.0748 14.9569 15.094 14.8884 15.126 14.8256C15.1579 14.7629 15.2019 14.707 15.2554 14.6613L16.2615 13.8C16.3147 13.7541 16.3765 13.7192 16.4432 13.6973C16.51 13.6753 16.5804 13.6668 16.6505 13.6722C16.7205 13.6776 16.7888 13.6968 16.8514 13.7287C16.914 13.7606 16.9697 13.8045 17.0153 13.858L17.8787 14.8632C17.9246 14.9166 17.9594 14.9785 17.9811 15.0454C18.0028 15.1124 18.011 15.183 18.0051 15.2531ZM17.4833 22.0059C17.4703 22.1455 17.4035 22.2745 17.2971 22.3657L16.2985 23.2216C16.2449 23.2678 16.1828 23.303 16.1156 23.3251C16.0484 23.3472 15.9775 23.3558 15.9069 23.3504C15.8364 23.345 15.7676 23.3256 15.7046 23.2935C15.6416 23.2614 15.5855 23.2171 15.5397 23.1632L14.6838 22.1645C14.6374 22.111 14.6021 22.0487 14.5799 21.9814C14.5577 21.9141 14.5491 21.8431 14.5546 21.7725C14.56 21.7018 14.5794 21.6329 14.6116 21.5698C14.6439 21.5067 14.6883 21.4506 14.7423 21.4048L15.741 20.5489C15.7945 20.5027 15.8567 20.4675 15.9239 20.4454C15.9911 20.4233 16.062 20.4147 16.1325 20.4201C16.203 20.4255 16.2718 20.4449 16.3348 20.477C16.3979 20.5091 16.4539 20.5534 16.4997 20.6073L17.3556 21.606C17.4025 21.6607 17.438 21.7243 17.4599 21.793C17.4818 21.8617 17.4898 21.9341 17.4833 22.0059ZM14.3741 18.3706C14.3687 18.4405 14.3494 18.5087 14.3174 18.5712C14.2854 18.6336 14.2413 18.6891 14.1877 18.7343L13.1834 19.5978C13.13 19.6437 13.0681 19.6787 13.0012 19.7006C12.9343 19.7225 12.8637 19.7311 12.7935 19.7256C12.7232 19.7202 12.6548 19.701 12.592 19.6691C12.5292 19.6372 12.4734 19.5932 12.4277 19.5396L11.5654 18.5325C11.5195 18.4793 11.4846 18.4175 11.4627 18.3507C11.4408 18.284 11.4323 18.2136 11.4377 18.1435C11.4431 18.0735 11.4623 18.0052 11.4941 17.9426C11.526 17.88 11.57 17.8243 11.6234 17.7787L12.6296 16.9164C12.683 16.8705 12.7449 16.8355 12.8118 16.8136C12.8788 16.7916 12.9494 16.7831 13.0196 16.7885C13.0898 16.7939 13.1582 16.8132 13.221 16.8451C13.2838 16.877 13.3396 16.921 13.3854 16.9746L14.2457 17.9806C14.3384 18.0889 14.3846 18.2284 14.3741 18.3706ZM14.4997 7.33365C14.5036 7.28364 14.4976 7.23334 14.482 7.18566C14.4663 7.13798 14.4415 7.09386 14.4087 7.05585L9.41235 1.22716C9.37987 1.18903 9.34017 1.15769 9.29553 1.13496C9.25089 1.11223 9.2022 1.09855 9.15225 1.0947C9.10231 1.09086 9.05209 1.09692 9.0045 1.11256C8.95691 1.12819 8.91288 1.15308 8.87494 1.18579L7.63362 2.24965C7.55722 2.31522 7.50997 2.40844 7.50224 2.50883C7.49451 2.60921 7.52694 2.70856 7.5924 2.78506L12.5904 8.6179C12.656 8.6943 12.7492 8.74155 12.8496 8.74928C12.95 8.75701 13.0494 8.72458 13.1259 8.65912L14.3673 7.59426C14.4054 7.56171 14.4368 7.52192 14.4595 7.47719C14.4822 7.43247 14.4959 7.38368 14.4997 7.33365ZM12.6892 25.4321L6.35477 18.0411L0.480817 23.0781C0.346381 23.1772 0.246194 23.3157 0.194204 23.4745C0.142214 23.6332 0.14101 23.8042 0.190759 23.9636C0.240508 24.123 0.338732 24.263 0.471759 24.364C0.604787 24.465 0.765991 24.522 0.932934 24.527L12.6892 25.4321ZM10.8236 10.4246C10.8274 10.3745 10.8212 10.3242 10.8054 10.2765C10.7896 10.2288 10.7645 10.1847 10.7316 10.1467L2.63586 0.699466C2.60338 0.661334 2.56368 0.630001 2.51904 0.607269C2.4744 0.584537 2.42571 0.570855 2.37576 0.56701C2.32582 0.563165 2.27561 0.569233 2.22801 0.584865C2.18042 0.600497 2.13639 0.625384 2.09845 0.658095L0.857134 1.72195C0.81885 1.75444 0.787385 1.7942 0.764558 1.83892C0.741731 1.88365 0.727992 1.93245 0.724138 1.98252C0.720283 2.03258 0.726391 2.08291 0.742104 2.1306C0.757817 2.17829 0.782826 2.22239 0.815685 2.26036L8.91359 11.7058C8.94607 11.7439 8.98577 11.7753 9.03041 11.798C9.07505 11.8207 9.12374 11.8344 9.17369 11.8382C9.22363 11.8421 9.27384 11.836 9.32143 11.8204C9.36903 11.8048 9.41306 11.7799 9.451 11.7472L10.6902 10.6851C10.7285 10.6527 10.7601 10.613 10.783 10.5682C10.8058 10.5235 10.8196 10.4747 10.8236 10.4246ZM7.22715 13.5227C7.23133 13.4728 7.22563 13.4227 7.21036 13.375C7.1951 13.3274 7.17057 13.2832 7.1382 13.2451L2.13901 7.41414C2.07343 7.33774 1.98021 7.29049 1.87983 7.28276C1.77944 7.27503 1.68009 7.30746 1.60359 7.37292L0.36235 8.43578C0.324218 8.46827 0.292885 8.50797 0.270153 8.55261C0.24742 8.59725 0.233737 8.64594 0.229892 8.69588C0.226047 8.74583 0.232116 8.79604 0.247749 8.84363C0.263381 8.89122 0.288268 8.93525 0.320979 8.97319L5.31925 14.803C5.38483 14.8794 5.47804 14.9267 5.57843 14.9344C5.67882 14.9421 5.77817 14.9097 5.85467 14.8443L7.09598 13.7804C7.17257 13.7151 7.22013 13.6221 7.22822 13.5218" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
                <section id='usecase' className='why' data-aos="fade-up" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                    <h1>
                        <img alt='' src={Xlogo} />
                        Why $OXANA
                    </h1>
                    <p>
                        <b>
                            Leading the Charge Against Climate Change
                        </b> <br />
                        In a world increasingly threatened by climate change, Oxana stands at the forefront of innovation and sustainability. We are committed to deploying cutting-edge technologies, particularly artificial intelligence (AI) and blockchain, to create a greener and more sustainable future.
                    </p>
                    <div className="boxes">

                        <div className="box">
                            <img alt='' src={w1} />
                            <h2>Investment</h2>
                            <p>
                                Oxana is not just a project; it is a strategic initiative designed to tackle one of humanity's most pressing challenges. Our approach integrates AI to optimize renewable energy solutions, ensuring that resources are used effectively and sustainably. This commitment to innovation positions Oxana as a leader in the renewable energy sector, paving the way for a significant reduction in global carbon footprints.</p>
                        </div>
                        <div className="box">
                            <img alt='' src={w2} />
                            <h2>Rewarding</h2>
                            <p>
                                Joining Oxana offers more than the satisfaction of contributing to an essential environmental cause. Participants are also poised to receive substantial financial rewards. Our unique model combines environmental stewardship with economic incentives, making it an attractive opportunity for investors who are passionate about sustainability and eager for profitable returns.</p>
                        </div>
                        <div className="box">
                            <img alt='' src={w3} />
                            <h2>Power of Oxana Token</h2>
                            <p>
                                At the heart of our initiative is the Oxana Token ($OX), an Ethereum blockchain-based token designed to drive our AI-powered renewable energy ecosystem. The $OX token facilitates the development and deployment of innovative AI solutions that directly address the impacts of climate change. As a participant, you will be part of a forward-thinking community leveraging blockchain technology to create real-world environmental benefits.</p>
                        </div>
                    </div>
                </section>
            </div>

            <section id='roadmap' className='roadmap' data-aos="fade-up" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                <h1>Road Map</h1>
                <div className="container">
                    <p>Our Goal for the near & Long Term</p>
                </div>
                <div className="boxes">
                    <div className="container">

                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="box">
                                    <h3>Q1</h3>
                                    <ul>
                                        <li>Web Wallet V2 Launched</li>
                                        <li>Android Wallet Launched</li>
                                        <li>Electron Desktop Wallet Launched</li>
                                        <li>OXANA Listed with Secondard Data Providers</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="box">
                                    <h3>Q3</h3>
                                    <ul>
                                        <li>Web Wallet V2 Launched</li>
                                        <li>Android Wallet Launched</li>
                                        <li>Electron Desktop Wallet Launched</li>
                                        <li>OXANA Listed with Secondard Data Providers</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="box">
                                    <h3>Q2</h3>
                                    <ul>
                                        <li>Web Wallet V2 Launched</li>
                                        <li>Android Wallet Launched</li>
                                        <li>Electron Desktop Wallet Launched</li>
                                        <li>OXANA Listed with Secondard Data Providers</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="box">
                                    <h3>Q4</h3>
                                    <ul>
                                        <li>Web Wallet V2 Launched</li>
                                        <li>Android Wallet Launched</li>
                                        <li>Electron Desktop Wallet Launched</li>
                                        <li>OXANA Listed with Secondard Data Providers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <section id='tokenomics' className='tokenomics' data-aos="fade-up" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                    <h1>Tokenomics</h1>
                    <div className="row">
                        <div className="col-12 col-lg-6 d-flex justify-content-center">
                            <div className="t-table">
                                <div className="box">
                                    <h3>OXANA HAS A TOTAL SUPPLY OF 200,000,000,000 TOKENS</h3>
                                    <p>The $OXANA token is minted on Ethereum and is unique in that it can also be claimed, stored and traded on Solana, BNB Chain, Base, Polygon, or Avalanche using Wormhole and Portal Bridge tech.</p>
                                    <ul>
                                        <li><span className='t-name'>Presale Allocation </span><span className='t-per'>15%</span><span className='t-val'> 30,000,000,000</span> </li>
                                        <li><span className='t-name'>Staking </span><span className='t-per'>10%</span><span className='t-val'> 20,000,000,000</span> </li>
                                        <li><span className='t-name'>Project Funds </span><span className='t-per'>25%</span><span className='t-val'> 50,000,000,000</span> </li>
                                        <li><span className='t-name'>Liquidity </span><span className='t-per'>10%</span><span className='t-val'> 20,000,000,000</span> </li>
                                        <li><span className='t-name'>Marketing </span><span className='t-per'>25%</span><span className='t-val'> 50,000,000,000</span> </li>
                                        <li><span className='t-name'>Ecosystem Funds </span><span className='t-per'>10%</span><span className='t-val'> 20,000,000,000</span> </li>
                                        <li><span className='t-name'>Exchanges </span><span className='t-per'>5%</span><span className='t-val'> 10,000,000,000</span> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-1'></div>
                        <div className="col-12 col-lg-4">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <Doughnut data={data} options={options} />
                            </div>
                        </div>
                        <div className='col-12 col-lg-1'></div>
                    </div>
                </section>
                <section className="partner" data-aos="fade-up" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                    <h1>Partner</h1>
                    <div className="partners">
                        <a href=""><img alt='' src={Coinbase} />Coinbase</a>
                        <a href=""><img alt='' src={Gate} />Gate.io</a>
                        <a href=""><img alt='' src={nomics} />nomics</a>
                        <a href=""><img alt='' src={DappRader} />DappRader</a>
                        <a href=""><img alt='' src={CryptoCompare} />CryptoCompare</a>
                        <a href=""><img alt='' src={MN} />MN</a>
                        <a href=""><img alt='' src={MEXC} />MEXC Global</a>
                        <a href=""><img alt='' src={nodehub} />nodehub.io</a>
                        <a href=""><img alt='' src={CoinGecko} />CoinGecko</a>
                        <a href=""><img alt='' src={KUCOIN} />KUCOIN</a>
                    </div>
                    <div className="box">
                        <p>Audit by:</p>
                        <img alt='' src={oxanablack} />
                    </div>
                </section>
                {/* <section id='team' className='team' data-aos="zoom-in" data-aos-offset="500" data-aos-duration="600" data-aos-easing="ease-in-out">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <h1>Team</h1>
                            <p>Meet the Team Members</p>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="member">
                                <div>
                                    <img alt='' src={team1} />
                                </div>
                                <div className='text-start'>
                                    <h2>Gem, BEANS</h2>
                                    <small>Gem, is an investor and a Crypto Economist with more than 8years of Experience in Traditional  Finance & Investment. He searves as the Chairman of Oxana.</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="member">
                                <div>
                                    <img alt='' src={team2} />
                                </div>
                                <div className='text-start'>
                                    <h2>Kim, VOK</h2>
                                    <small>Kim, is an investor and a Crypto Economist with more than 8years of Experience in Traditional  Finance & Investment. He searves as the Chairman of Oxana.</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="member">
                                <div>
                                    <img alt='' src={team3} />
                                </div>
                                <div className='text-start'>
                                    <h2>Nance, MONK</h2>
                                    <small>Nance, is an investor and a Crypto Economist with more than 8years of Experience in Traditional  Finance & Investment. He searves as the Chairman of Oxana.</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="member">
                                <div>
                                    <img alt='' src={team4} />
                                </div>
                                <div className='text-start'>
                                    <h2>Tim, FRANCE</h2>
                                    <small>Tim, is an investor and a Crypto Economist with more than 8years of Experience in Traditional  Finance & Investment. He searves as the Chairman of Oxana.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>
            <section id="faq" className="faq" data-aos="fade-up" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                <div className="outer-container" data-aos="zoom-in" data-aos-offset="500" data-aos-duration="600" data-aos-easing="ease-in-out">
                    <div className='content-container'>
                        <h1>FAQ</h1>
                        <p>Oxana is more than just an investment opportunity; it is a commitment to a sustainable future. By choosing Oxana, you are supporting a project that combines the best of technology and environmental science to create lasting positive change. Join us in our mission to fight climate change, reduce carbon footprints, and make the world a more sustainable place.</p>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        What’s Oxana?
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Oxana is more than just an investment opportunity; it is a commitment to a sustainable future. By choosing Oxana, you are supporting a project that combines the best of technology and environmental science to create lasting positive change. Join us in our mission to fight climate change, reduce carbon footprints, and make the world a more sustainable place.</div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        Why Oxana?
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">Oxana is more than just an investment opportunity; it is a commitment to a sustainable future. By choosing Oxana, you are supporting a project that combines the best of technology and environmental science to create lasting positive change. Join us in our mission to fight climate change, reduce carbon footprints, and make the world a more sustainable place.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='image-container'>
                        <a href="#"> <img alt='' src={question} /></a>
                    </div>
                </div>
            </section>
            <footer>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img alt='' className='logo' src={Xlogo} />
                    <ul>
                        <li><a href="#">Merchandise</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Cookies</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                    <p>
                        Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The price of Cryptocurrencies may fluctuate.
                    </p>
                    <p className='mb-4'>Profit may be subject to capital gains or other taxes application in your jurisdiction.</p>
                    <div className="line"></div>
                    <p className='mb-2'>
                        2024@ OXANA | All right Reserved
                    </p>
                    <p className='mb-4'>
                        Toronto, Reg. No: 1175860, Marshall Islands, <a href="">info@oxana.com</a>
                    </p>
                    <div className="social-icons">
                        <a href="#"> <img alt='' src={facebookwhite} /></a>
                        <a href="#"> <img alt='' src={twitterwhite} /></a>
                        <a href="#"> <img alt='' src={discordwhite} /></a>
                        <a href="#"> <img alt='' src={sharewhite} /></a>
                        <a href="#"> <img alt='' src={youtubewhite} /></a>
                    </div>
                </div>
            </footer>
        </>

    )
}

export default Main
