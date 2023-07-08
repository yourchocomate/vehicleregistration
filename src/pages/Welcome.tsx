import Lottie from 'lottie-react';
import BlockChain from "@/assets/lottie/blockchain.json"
const Welcome = () => {
    return (
        <div className="w-full overflow-hidden px-4 lg:px-8">
            <div className="w-full flex flex-col md:flex-row mx-auto">
                <div className="w-full md:w-1/2">
                    <div className="w-full flex justify-center md:justify-start items-center mb-8">
                        <h1 className="text-5xl md:text-[4rem] font-bold text-center md:text-left">Welcome to the Future</h1>
                    </div>
                    <div className="w-full flex mb-8">
                        <p className="text-center md:text-left text-sm">This is a blockchain based vehicle registration system. It is a decentralized system that is not controlled by any single entity. It is a transparent system that is open to the public. It is a system that is not prone to corruption and bribery. It is a system that is not prone to data manipulation.</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="w-full flex justify-center md:justify-end items-center mb-8">
                        <Lottie animationData={BlockChain} style={ { width: "100%", height: "100%" } } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;