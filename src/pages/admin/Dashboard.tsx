import { Card, CardBody } from "@material-tailwind/react";
import Lottie from "lottie-react";
import BlockChain from "@/assets/lottie/blockchain.json"

const Dashboard = () => {

    return (
        <Card shadow={true} className="w-full">
            <CardBody className="w-full py-[5rem] flex justify-center items-center">
                <div className="w-full md:w-1/2">
                    <Lottie animationData={BlockChain} loop={true}/>
                </div>
            </CardBody>
        </Card>
    )
}

export default Dashboard;