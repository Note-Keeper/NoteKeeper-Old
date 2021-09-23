import React, { useState } from 'react'
import styled from "styled-components";

function Login (props: any) {

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    const changeLoginHandler = (event: any) => {
        const value = event.target.value
        setLogin(value)
    }

    const changePassHandler = (event:any) => {
        const value = event.target.value
        setPass(value)
    }

    const loginMe = () => {
        const data = {
            login: login,
            pass: pass
        }
        console.log(data)
    }
  
      return (
        <Container>
            <Form>
                <Title>
                    Zaloguj się
                </Title>
                <Input value={login} onChange={changeLoginHandler} placeholder="Login" />
                <Input value={pass} onChange={changePassHandler}  type="password" placeholder="Hasło" />
                <Button onClick={() => loginMe()}>Zaloguj</Button>
            </Form>
        </Container>
      );
}

const Title = styled.div`
    text-align: center;
    font-size:calc(30px + 0.4vw);
    font-weight:bold;
    margin:10px;
    text-transform:uppercase;
`

const Container = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

const Form = styled.div`
    background:#e3e3e3;
    width:600px;
    height:800px;
    max-height:90vh;
    max-width:90vw;
    border-radius:20px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Input = styled.input`
    display:block;
    width:500px;
    max-width:90%;
    margin:10px;
    padding:10px;
    border:none;
    outline:none;
    border-radius:10px;
    font-size:20px;
    text-align:center;
`

const Button = styled.button`
    display:block;
    width:400px;
    max-width:80%;
    margin:10px;
    padding:10px;
    border:none;
    outline:none;
    border-radius:10px;
    font-size:20px;
    text-align:center;
    cursor:pointer;
    background:#00647d;
    font-weight:bold;
    color:#e3e3e3;
`

export default Login