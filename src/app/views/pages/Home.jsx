import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router";
import 'antd/dist/antd.css';
import './home.css';
import {Layout} from "antd";
import {UserOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
import TopMenu from "../components/TopMenu";

const { Text } = Typography;
const {Header, Footer, Content} = Layout;


function Home({user}) {
    return (<>
            {!user.isAuth && <Redirect to="/login"/>}
            <Layout className="site-layout">
                <Header className="site-layout-header">
                   <TopMenu userName={user.name}/>
                </Header>
                <Content style={{padding: '50px'}}>
                    <div className="site-layout-content">Content</div>
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
