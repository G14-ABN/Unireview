'use client'
export {LogIn}
import { Form, Button } from "antd"


function LogIn() {
    return (
        <div>
        <Form className='w-[500px] gap-5' layout='vertical' >
        <h1 className='text-2x1 font-bold'>LogIn</h1>
        <hr />
        <br />
        <Form.Item label="Email">
        <input type='email' />
        </Form.Item>
        <Form.Item label="password">
        <input type='password' />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
            Login
        </Button>
        </Form>
        </div>
        
    )
    }
export default LogIn