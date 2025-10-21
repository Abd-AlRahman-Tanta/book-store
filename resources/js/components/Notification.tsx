import { usePage } from "@inertiajs/react";
import { memo, useEffect, useState } from "react";

const Notification = () => {
    const [disApear, setDisapear] = useState<boolean>(false);
    const { flash } = usePage<{ flash: { error?: string[], success?: string } }>().props
    useEffect(() => {
        if (flash["success"] || flash["error"]) {
            setDisapear(true);
            setTimeout(() => {
                setDisapear(false);
            }, 2000)
        }
    }, [flash])
    return (
        <>
            {
                flash["success"] && disApear && <p className={`  fixed top-5 right-1/2  translate-x-1/2 z-50 bg-green-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg transition-transform`}>
                    {flash["success"]}
                </p>
            }
            {
                flash["error"] && disApear && <div className={` fixed top-5 right-1/2  translate-x-1/2 z-50 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-in`}>
                    {
                        flash["error"].map((error) => {
                            return (
                                <p key={error} className={` m-1`}>{error}</p>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}

export default memo(Notification)
