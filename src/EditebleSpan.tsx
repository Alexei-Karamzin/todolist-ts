import React, {useState, ChangeEvent} from "react";

type EditableSpanPropsType = {
    title: string
    onChangeInputSpan: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditModeHandler = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const terminateEditModeHandler = () => {
        setEditMode(false)
        props.onChangeInputSpan(title)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <input onChange={(e) => onChangeInputHandler(e)}
                 value={title}
                 onBlur={terminateEditModeHandler}
                 autoFocus
        />
        : <span onDoubleClick={activateEditModeHandler}>{props.title}</span>
}