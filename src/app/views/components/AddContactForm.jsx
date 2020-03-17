import React from 'react';
import {Form, Input, Button, Select} from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


function AddContactForm(props) {

    const [form] = Form.useForm();

    const onFinish = values => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
                name="name"
                label="Имя"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="age"
                label="Возраст"
                rules={[
                    {
                        required: false,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
                <Form.Item
                    name="address"
                    label="Адрес"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
        </Form>
);
}

export default AddContactForm;