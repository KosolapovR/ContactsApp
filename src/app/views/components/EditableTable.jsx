import "antd/dist/antd.css";
import React from "react";
import {Table, Input, Popconfirm, Button} from "antd";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {deleteContact, getContactList, updateContact} from "../../state/contacts";
import UserAvatar from "./UserAvatar";


const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable ? (
            <Input
                style={{margin: "-5px 0"}}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        ) : (
            value
        )}
    </div>
);

class EditableTable extends React.Component {
    state = {
        searchText: "",
        searchedColumn: ""
    };

    constructor(props) {
        super(props);
        this.columns = [
            {
                dataIndex: "avatar",
                width: "10%",
                render: (text, record) => this.renderColumns(text, record, "ava")
            },
            {
                title: "Имя",
                dataIndex: "name",
                width: "15%",
                ...this.getColumnSearchProps("name"),
                render: (text, record) => this.renderColumns(text, record, "name")
            },
            {
                title: "Телефон",
                dataIndex: "phone",
                width: "20%",
                render: (text, record) => this.renderColumns(text, record, "phone")
            },
            {
                title: "Возраст",
                dataIndex: "age",
                width: "5%",
                render: (text, record) => this.renderColumns(text, record, "age")
            },
            {
                title: "Адрес",
                dataIndex: "address",
                width: "25%",
                render: (text, record) => this.renderColumns(text, record, "address")
            },
            {
                dataIndex: "operation",
                render: (text, record) => {
                    const {editable} = record;
                    return (
                        <>
                            <div className="editable-row-operations">
                                {editable ? (
                                    <span>
                    <a onClick={() => this.save(record.id)} style={{marginRight: '5px'}}>Сохранить</a>
                      <a onClick={() => this.cancel(record.id)}>Отмена</a>
                  </span>
                                ) : (
                                    <a onClick={() => this.edit(record.id)}>Редактировать</a>
                                )}
                            </div>
                            <Popconfirm title="Уверены?" onConfirm={() => {
                                this.handleDelete(record.id)
                            }}>
                                <a className="editable-row-operations">Удалить</a>
                            </Popconfirm>
                        </>
                    );
                }
            }
        ];
        this.cacheData = this.props.contacts.map(item => ({...item}));
    }

    componentDidMount() {
        this.props.getContactList(this.props.user);
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Поиск по имени`}
                    value={selectedKeys[0]}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{width: 188, marginBottom: 8, display: "block"}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Искать
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Сбросить
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined style={{color: filtered ? "#1890ff" : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            )
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ""});
    };

    renderColumns(text, record, column) {
        if (column === 'ava') {
            return <UserAvatar contacts={record}/>
        } else {
            return (
                <EditableCell
                    editable={record.editable}
                    value={text}
                    imgPath={record.img}
                    column
                    onChange={value => this.handleChange(value, record.id, column)}
                />
            );
        }

    }

    handleChange(value, id, column) {
        const newData = [...this.props.contacts];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({data: newData});
        }
    }

    handleDelete(id) {
        this.props.deleteContact(this.props.user, this.props.contacts, id);
    }

    edit(id) {
        const newData = [...this.props.contacts];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target.editable = true;
            this.setState({data: newData});
        }
    }

    save(id) {
        const newData = [...this.props.contacts];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.props.updateContact(this.props.user, newData);
            this.setState({data: newData});
            this.cacheData = newData.map(item => ({...item}));
        }
    }

    cancel(id) {
        const newData = [...this.props.contacts];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
            delete target.editable;
            this.setState({data: newData});
        }
    }

    render() {
        return (
            <Table bordered size="small" dataSource={this.props.contacts} columns={this.columns}/>
        )
    }
}

const mapDispatchToProps = state => ({
    user: state.auth.user,
    contacts: state.contacts.contacts
});

export default connect(mapDispatchToProps, {getContactList, updateContact, deleteContact})(EditableTable);
