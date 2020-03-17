import React, {useState} from "react";
import {Modal, Button, Form, Input} from 'antd';
import {connect} from "react-redux";
import {addContact} from "../../state/contacts";

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
const ModalAddContact = ({userId, addContact, contacts}) => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = form => {

    };

    const handleCancel = e => {
        setVisible(false)
    };

    const [form] = Form.useForm();

    const onFinish = values => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Добавить контакт
            </Button>
            <Modal
                title="Добавление контакта"
                visible={visible}
                onOk={()=> {
                    form
                        .validateFields()
                        .then(values => {
                            let newContacts = [...contacts, values];
                            addContact(userId, newContacts);
                            setVisible(false)
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
                onCancel={handleCancel}
            >
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
                </Form>
            </Modal>
        </div>
    );
}

const mapDispatchToProps = state => ({
    userId: state.auth.user.id,
    contacts: state.contacts.contacts
});

export default connect(mapDispatchToProps, {addContact})(ModalAddContact);
