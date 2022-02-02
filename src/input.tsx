import React from "react";

type PropsType = {
    title: string;
}

export function Input (props: PropsType){
    return(
        <div>
            <h2>{props.title}</h2>
            <input/>
        </div>
    )
}