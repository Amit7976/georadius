"use client";

import { useParams } from "next/navigation";
import MainContent from "./MainContent";

function page({ params2 }: any) {
    let params = useParams();

    if (params === undefined || params === null) {
        if (params2 === undefined || params2 === null) {
            return <div>Page not found</div>;
        }
        else {
            params = params2;
        }
    }
    return (
        <div>
            <MainContent params={params} />
        </div>
    );
}

export default page;
