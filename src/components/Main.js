import React, { useState, useEffect } from 'react'
import Widget from './Widget'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    ecosystem, research, investment, engagement,
    smrtlogo, w1, w2, table,
    facebookwhite, twitterwhite, discordwhite, sharewhite, youtubewhite,

} from '../assets'

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Main = () => {
    AOS.init();

    const data = {
        labels: [
            'Presale',
            'Infrastructure',
            'Staking Reward',
            'Research & Development',
            'Airdrop',
            'Team',
            'Advisors',
            'Liquidity',
            'Marketing',
            'Partnerships & Grants'
        ],
        datasets: [
            {
                data: [220000000, 60000000, 200000000, 100000000, 50000000, 120000000, 30000000, 100000000, 70000000, 50000000],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
            },
        ],
    };



    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#fff',
                    font: {
                        size: 14,
                    },
                },
            },
            datalabels: {
                color: '#fff',
                formatter: (value, context) => {
                    const percentage = ((value / 1000000000) * 100).toFixed(2);
                    return `${context.chart.data.labels[context.dataIndex]}: ${percentage}%`;
                },
                font: {
                    weight: 'bold',
                    size: 12,
                },
            },
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
        },
        elements: {
            arc: {
                width: 10,
                borderWidth: 0,
            },
        },
        cutout: '70%',
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
                        <img alt='' src={smrtlogo} />SMRTWAYS
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
                                <a className="nav-link" href="#utility">USE CASE</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#roadmap">ROAD MAP</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/terms.pdf" target="_blank">Terms & Conditions</a>
                            </li>
                        </ul>
                        {/* <div id="google_translate_element"></div> */}
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
                                <h1>
                                    <span>Tired of</span>  <br />
                                    Sepculative Nature
                                    <br />
                                    of Cryptocurrency?
                                </h1>
                                <p>Join us as we embark on this new chapter, driven by our vision of a brighter, more sustainable tomorrow.</p>
                                <a href='/whitepaper.pdf' target='_blank' className='btn btn-primary' >
                                    WHITEPAPER
                                </a >
                                <a href='/audit.pdf' target='_blank' className='btn btn-secondary' >
                                    AUDIT
                                </a >
                                <div className="my-4">
                                    <iframe src="https://www.youtube.com/embed/MVKIcfgB02c?si=ku0TTT7F5E3zyrZf" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
            <div id='about' className="container"  data-aos="fade-up" data-aos-offset="100" data-aos-duration="300" data-aos-easing="ease-in-out">
                <section className='why'>
                    <h1>
                        <img alt='' src={smrtlogo} />
                        What is $SMRT Token
                    </h1>
                    <p>
                        $SMRT is a token with real use case and has constant price pump with multiple rewards mechanism. The token is launched to promote, design, and deploy smart ecosystem to support global initiatives against global warming
                    </p>
                    <div className="boxes">

                        <div className="box">
                            <img alt='' src={w1} />
                            <p>Smart Ecosystem with multiple use cases including  investment opportunities in Renewable  Energy <br /> projects.</p>
                        </div>
                        <div className="box">
                            <img alt='' src={w2} />
                            <p>AI powered Application to support Research and Development of Renewable Energy <br /> solutions.</p>
                        </div>
                        <div className="box">
                            <img alt='' src={smrtlogo} />
                            <p>Renewable energy market is massive (around $1085 Billion) and continues to grow.</p>
                        </div>
                    </div>
                </section>
            </div>
            <div id='utility' className="container"  data-aos="fade-up" data-aos-offset="100" data-aos-duration="300" data-aos-easing="ease-in-out">
                <section className='utility'>
                    <h1>
                        $SMRT Token Utility
                    </h1>
                    <div className="boxes">
                        <div className="box">
                            <img alt='' src={ecosystem} />
                            <h3>Ecosystem <br /> Token</h3>
                            <p> Can be used to buy reliable Renewable Energy products and services at very competitive prices globally</p>
                        </div>
                        <div className="box">
                            <img alt='' src={research} />
                            <h3>Research & <br /> Development</h3>
                            <p>Support R&D initiative to explore new technologies and define new future proof Renewable Energy solutions.</p>
                        </div>
                        <div className="box">
                            <img alt='' src={investment} />
                            <h3>Investment <br /> Pools</h3>
                            <p>Token holders will be encouraged to  invest in Renewable Energy projects  with high Return on Investment.</p>
                        </div>
                        <div className="box">
                            <img alt='' src={engagement} />
                            <h3>Engagement <br /> Rewards</h3>
                            <p>Tokens are used to reward token holders' participation in R&D activities (Surveys, etc).</p>
                        </div>
                    </div>
                </section>
            </div>

            <section id='roadmap' className='roadmap' data-aos="fade-up" data-aos-offset="100" data-aos-duration="300" data-aos-easing="ease-in-out">
                <h1>Road Map</h1>
                <div className="container">
                    <p>Our Goal for the near & Long Term</p>
                    <div className="boxes">
                        <div className="box">
                            <small>Project Phase 1</small>
                            <h3>RESEARCH</h3>
                            <ul>
                                <li> Market Research</li>
                                <li> Project Concept</li>
                                <li> Team formation</li>
                                <li> Tokenomics & Vesting</li>
                                <li> Whitepaper v.1 Release</li>
                            </ul>
                        </div>
                        <div className="box">
                            <small>Project Phase 2</small>
                            <h3>PRESALE</h3>
                            <ul>
                                <li> Token Presale</li>
                                <li> Community Building</li>
                                <li> Community Event</li>
                                <li> PR & Influencer Marketing</li>
                                <li> RE Platform Development</li>
                                <li> Collaborations &</li>
                                <li> Partnerships</li>
                            </ul>
                        </div>
                        <div className="box">
                            <small>Project Phase 3</small>
                            <h3>LISTING</h3>
                            <ul>
                                <li> Token Presale Completion</li>
                                <li> Project Website</li>
                                <li> TGE & DEX Listing</li>
                                <li> CEX Listing</li>
                                <li> Product Development &</li>
                                <li> Test Centre</li>
                            </ul>
                        </div>
                        <div className="box">
                            <small>Project Phase 4</small>
                            <h3>BRAND LAUNCH</h3>
                            <ul>
                                <li> Al Powered Solution</li>
                                <li> Design Website (Beta)</li>
                                <li> Online Store</li>
                                <li> Rewards Program</li>
                                <li> Product Marketing and</li>
                                <li> Branding</li>
                            </ul>
                        </div>
                        <div className="box">
                            <small>Project Phase 5</small>
                            <h3>DEVELOPMENT</h3>
                            <ul>
                                <li> Investment Pool</li>
                                <li> Research Center for New</li>
                                <li> Green Technologies</li>
                                <li> Project Expansion</li>
                                <li> Token Buy Back</li>
                                <li> Performance Metrics</li>
                                <li> Improvement</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <section id='tokenomics' className='tokenomics'  data-aos="fade-up" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                    <h1>Tokenomics</h1>
                    <p>$SMRT Token has total supply of 1,000,000,000</p>
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-4" data-aos="fade-right" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                            <div className="d-flex justify-content-center align-items-center">
                                <img alt='' src={table} />
                            </div>
                        </div>
                        <div className='col-12 col-lg-1'></div>
                        <div className="col-12 col-lg-5" data-aos="fade-left" data-aos-offset="300" data-aos-duration="600" data-aos-easing="ease-in-out">
                            <div className="d-flex justify-content-center align-items-center">
                                <Doughnut data={data} options={options} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section id="faq" className="faq">
                <div className="outer-container" data-aos="zoom-out-down" data-aos-offset="500" data-aos-duration="600" data-aos-easing="ease-in-out">
                    <div className='content-container'>
                        <h1>FAQ</h1>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        What is Smrtways?
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Smrtways is building Renewable Energy ecosystem that will provide a variety of financial tools and services, including online store, staking, Research & Development, and Investment Pools.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        What is $SMRT Token?
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        $SMRT serves as a utility token for the Smrtways platform, enabling token holders to procure Renewable Energy products and engage in investments in Renewable Energy projects. $SMRT token is built upon the Binance Smart Chain (BSC), adhering to the BEP20 standard.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        How and Where can I buy $SMRT token?
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        As of now, Smrtways ($SMRT) is in its presale phase, which means it is not yet available on traditional cryptocurrency exchanges. Beware of potential scams using Smrtways name.
                                        The only legitimate way to participate in the Smrtways presale is through our official website at https://smrtways.io . Please exercise caution and ensure you're on the official platform to avoid fraudulent schemes.
                                        For detailed instructions on how to buy $SMRT tokens, please consult our How to Buy guide at https://smrtways.io/how-to-buy
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                        When and where will I receive my $SMRT tokens?
                                    </button>
                                </h2>
                                <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        $SMRT tokens will be airdropped after the presale concludes. Announcement of the process will be made on Smrtways official website.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingFive">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                        How many presale stages are there?
                                    </button>
                                </h2>
                                <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Smrtways presale consists of 6 stages:
                                        <br /><br /> Stage1 : $0.01
                                        <br /><br /> Stage2 : $0.015
                                        <br /><br /> Stage3 : $0.02
                                        <br /><br /> Stage4 : $0.025
                                        <br /><br /> Stage5 : $0.03
                                        <br /><br /> Stage6 : $0.035
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingSix">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                        When and where will $SMRT launch?
                                    </button>
                                </h2>
                                <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Following the presale, $SMRT will launch on decentralized exchange, including at least two top-tier exchanges.
                                        Stay tuned for official announcements about the specific launch date and trading platforms by following our social media channels.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingSeven">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                                        My wallet is compromised/hacked, what should I do?
                                    </button>
                                </h2>
                                <div id="flush-collapseSeven" className="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        If you suspect that your wallet has been compromised, it's essential to take immediate action to protect your assets.
                                        <br /><br />
                                        Please follow these steps:
                                        <br />
                                        Stay tuned for official announcements about the specific launch date and trading platforms by following our social media channels.
                                        <br /><br />
                                        Never Share Your Seed Phrase or Private Key: Under no circumstances should you share your Seed Phrase or Private Key with anyone. These are sensitive and should be kept secure. Contact Us: Reach out to us at: https://smrtways.io/help to report the issue and seek guidance on how to proceed. Important Note: It's crucial to understand that we cannot recover lost funds. Beware of Scammers: Remember that we will never ask for your private details, such as your Seed Phrase or Private Key. Be cautious of potential scams and always verify the authenticity of the support you're engaging with.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img alt='' className='logo' src={smrtlogo} />
                    <ul>
                        <li><a href="/audit.pdf" target="_blank">Audit</a></li>
                        <li><a href="/terms.pdf" target="_blank">Terms</a></li>
                        <li><a href="/terms.pdf" target="_blank">Privacy</a></li>
                        <li><a href='/whitepaper.pdf' target="_blank">Whitepaper</a></li>
                    </ul>
                    <p>
                        Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The value of cryptocurrencies may fluctuate.
                    </p>
                    <p className='mb-4'>Profit may be subject to capital gains or other taxes application in your jurisdiction.</p>
                    <div className="line"></div>
                    <p className='mb-2'>
                        2024@ $SMRT | All right Reserved
                    </p>
                    <p className='mb-4'>
                        <a href="">info@smrtways.io</a>
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
