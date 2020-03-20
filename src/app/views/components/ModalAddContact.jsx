import React, {useState} from "react";
import {Modal, Button, Form, Input} from 'antd';
import {connect} from "react-redux";
import {addContact} from "../../state/contacts";
import InputNumber from "antd/es/input-number";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ModalAddContact = ({user, addContact, contacts}) => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = e => {
        setVisible(false)
    };

    const [form] = Form.useForm();

    return (
        <div>
            <Button type="primary" style={{marginBottom: '10px'}} onClick={showModal}>
                Добавить контакт
            </Button>
            <Modal
                title="Добавление контакта"
                visible={visible}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            let newContacts = [...contacts, values];
                            addContact(user, newContacts);
                            setVisible(false);
                            form.resetFields();

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
                        name="phone"
                        label="Телефон"
                        rules={[
                            {
                                required: false,
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
                        <InputNumber min={1} maxLength={2}/>
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
};

const mapDispatchToProps = state => ({
    user: state.auth.user,
    contacts: state.contacts.contacts
});

export default connect(mapDispatchToProps, {addContact})(ModalAddContact);
