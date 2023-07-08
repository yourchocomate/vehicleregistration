import { Button, Spinner, Typography } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import PlatePNG from "@/assets/images/plate.png"
import { plateTranslator } from "@/utils/Helpers";

const PlateCanvasImage = ({ plateNumber, title } : { plateNumber: string; title: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<string | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        if(!plateNumber) return;
        setLoading(true);
        setError(false);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if(!ctx) return;
        const image = new Image();
        image.onload = () => {
            ctx.drawImage(image, 0, 0, 500, 250);
            ctx.font = "bold 25px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText(title, 180, 60);
            ctx.font = "bold 80px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(plateTranslator(plateNumber), 70, 170);
            setImage(canvas?.toDataURL("image/png"));
            setLoading(false);
        }
        image.onerror = () => {
            setError(true);
            setLoading(false);
        }
        image.src = PlatePNG;
    }, [plateNumber]);
    return (
        <div className="w-full flex flex-col">
            <canvas ref={canvasRef} width={500} height={250} />
            {
                loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <Spinner color="amber" />
                        <Typography variant="small" color="blue-gray">Loading</Typography>
                    </div>
                ) : error && (
                    <div className="flex items-center justify-center gap-2">
                        <Typography variant="small" color="blue-gray">Error</Typography>
                    </div>
                )
            }
            {
                image && (
                    <div className="flex items-center justify-center gap-2">
                        <a href={image} download={`${plateNumber}.png`}>
                            <Button>Download</Button>
                        </a>
                    </div>
                )
            }
        </div>
    )
}

export default PlateCanvasImage