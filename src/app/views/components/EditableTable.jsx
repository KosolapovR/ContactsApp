import "antd/dist/antd.css";
import React from "react";
import {Table, Input, Popconfirm, Button} from "antd";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {getContactList, updateContact} from "../../state/contacts";


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
                title: "name",
                dataIndex: "name",
                width: "25%",
                ...this.getColumnSearchProps("name"),
                render: (text, record) => this.renderColumns(text, record, "name")
            },
            {
                title: "age",
                dataIndex: "age",
                width: "15%",
                ...this.getColumnSearchProps("age"),
                render: (text, record) => this.renderColumns(text, record, "age")
            },
            {
                title: "address",
                dataIndex: "address",
                width: "40%",
                ...this.getColumnSearchProps("address"),
                render: (text, record) => this.renderColumns(text, record, "address")
            },
            {
                title: "operation",
                dataIndex: "operation",
                render: (text, record) => {
                    ;
                    const {editable} = record;
                    return (
                        <>
                            <div className="editable-row-operations">
                                {editable ? (
                                    <span>
                    <div onClick={() => this.save(record.id)}>Save</div>
                    <Popconfirm
                        title="Sure to cancel?"
                        onConfirm={() => this.cancel(record.id)}
                    >
                      <div>Cancel</div>
                    </Popconfirm>
                  </span>
                                ) : (
                                    <div onClick={() => this.edit(record.id)}>Edit</div>
                                )}
                            </div>
                            <div className="editable-row-operations">Delete</div>
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
                    placeholder={`Search ${dataIndex}`}
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
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
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
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }

    handleChange(value, id, column) {
        const newData = [...this.props.contacts];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({data: newData});
        }
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
            this.props.updateContact(this.props.user.contacts, newData);
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
            <Table bordered dataSource={this.props.contacts} columns={this.columns}/>
        )
    }
}

const mapDispatchToProps = state => ({
    user: state.auth.user,
    contacts: state.contacts.contacts
});

export default connect(mapDispatchToProps, {getContactList, updateContact})(EditableTable);
