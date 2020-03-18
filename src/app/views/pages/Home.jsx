import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router";
import 'antd/dist/antd.css';
import './home.css';
import {Col, Layout, Row} from "antd";
import TopMenu from "../components/TopMenu";
import EditableTable from "../components/EditableTable";
import ModalAddContact from "../components/ModalAddContact";


const {Header, Footer, Content} = Layout;


const Home = ({user}) => (
    <>
        {!user.isAuth && <Redirect to="/login"/>}
        <Layout className="site-layout" style={{minWidth: '620px'}}>
            <Header className="site-layout-header">
                <Row justify='center'>
                    <Col xs="360px" xl={20} xxl={12}>
                        <TopMenu userName={user.name}/>
                    </Col>
                </Row>
            </Header>
            <Content style={{padding: '25px'}}>
                <Row justify='center'>
                    <Col xs="360px" xl={20} xxl={12}>
                        <ModalAddContact/>
                        <EditableTable/>
                    </Col>
                </Row>

            </Content>
        </Layout>
    </>
);

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {})(Home);
