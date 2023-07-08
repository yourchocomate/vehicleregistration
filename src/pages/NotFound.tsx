import Lottie from 'lottie-react';
import Robot from "@/assets/lottie/robot.json"
export default function NotFound() {
  return (
    <div className="w-1/2">
        <Lottie animationData={Robot} />
    </div>
  )
}