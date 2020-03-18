import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router";
import 'antd/dist/antd.css';
import './home.css';
import {Layout} from "antd";
import TopMenu from "../components/TopMenu";
import EditableTable from "../components/EditableTable";
import ModalAddContact from "../components/ModalAddContact";


const {Header, Footer, Content} = Layout;


function Home({user}) {

    const handleAddContact = () => {
        alert('click');
    }

    return (<>
            {!user.isAuth && <Redirect to="/login"/>}
            <Layout className="site-layout">
                <Header className="site-layout-header">
                <TopMenu userName={user.name}/>
                </Header>
                <Content style={{padding: '50px'}}>
                    <ModalAddContact/>
                    <EditableTable/>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(Home);
