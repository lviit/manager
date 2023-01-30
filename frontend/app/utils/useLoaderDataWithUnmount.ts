import { useRef } from "react";
import { useLoaderData } from "@remix-run/react";
import { type SerializeFrom } from "@remix-run/node";

// loader data is not available when the component is unmounting, needed for AnimatePresence
export const useLoaderDataWithUnmount = <T,>(): SerializeFrom<T> => {
    const loaderData = useLoaderData<T>();
    const exitData = useRef<SerializeFrom<T>>(loaderData);

    return loaderData || exitData.current;
};
