import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {
    Button, ButtonsAndInputWrapper,
    Container, ErrorMessage, ErrorMessageWrapper,
    Input,
} from './FormInputStyle';
import {v1} from 'uuid';

type DataType = {
    id: string,
    title: string
}

export const FormInput = () => {
    const [data, setData] = useState<DataType[]>([])
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.currentTarget.value)
    }
    const onClickSendHandler = (): void => {
        if (message.trim() !== '') {
            setData([{id: v1(), title: message}, ...data])
            onClickClearHandler()
        }
        if (data.length > 4) {
            setData([...data])  // allows you to add only 5 messages
            setError('Limit of message is exceeded.')
        }
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            onClickSendHandler()
        }
    }
    const onClickClearHandler = (): void => {
        setMessage('')
    }
    const onClickDeleteLastMessage = (Id: string): void => {
        const filterList = data.filter(el => el.id !== Id)
        setData(filterList)
    }

    const errorMessage = data.length > 4 && <ErrorMessage>{error}</ErrorMessage>
    const dataMapped = data.map(el => <li key={el.id}>{el.title}</li>)

    return (
      <Container>

          <ErrorMessageWrapper>
              {errorMessage}
          </ErrorMessageWrapper>
          <ButtonsAndInputWrapper>
              <Input onChange={onChangeHandler}
                     onKeyDown={onKeyDownHandler}
                     value={message}/>
              <Button onClick={onClickSendHandler}>send</Button>
              <Button onClick={onClickClearHandler}>clear</Button>
          </ButtonsAndInputWrapper>
          <Button onClick={() => onClickDeleteLastMessage(data[0].id)}>Delete last message</Button>
          <div>
              <ul>
                  {dataMapped}
              </ul>
          </div>
      </Container>
    );
};
