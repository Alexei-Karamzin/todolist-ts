import React, {KeyboardEvent, useState} from "react";


type addItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: addItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTaskOnClickHandler()
        }
    }

    const onChangeInputHandler = (newTitle: string) => {
        setTitle(newTitle)
        setError(null)
    }

    const addTaskOnClickHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('error')
        }
    }

    return <div>
        <input
            value={title}
            onKeyPress={(e) => onKeyPressHandler(e)}
            onChange={(e) => onChangeInputHandler(e.currentTarget.value)}
            className={error ? 'error' : ''}
        />
        <button onClick={addTaskOnClickHandler}>+</button>
        {error && <div className={'error-message'}>Field is required</div>}
    </div>
}