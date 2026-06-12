const App = () => {
    const [currentComponent, setCurrentComponent] = React.useState('Login');

    const components = {
        'Login': typeof Login !== 'undefined' ? <Login /> : <div>Login Loading...</div>,
        'Admin_Dashboard': typeof Admin_Dashboard !== 'undefined' ? <Admin_Dashboard /> : <div>Loading...</div>,
        'Management_Registry': typeof Management_Registry !== 'undefined' ? <Management_Registry /> : <div>Loading...</div>,
        'Users': typeof Users !== 'undefined' ? <Users /> : <div>Loading...</div>,
        'Departments': typeof Departments !== 'undefined' ? <Departments /> : <div>Loading...</div>,
        'Clubs': typeof Clubs !== 'undefined' ? <Clubs /> : <div>Loading...</div>,
        'Reports': typeof Reports !== 'undefined' ? <Reports /> : <div>Loading...</div>,
        'Settings': typeof Settings !== 'undefined' ? <Settings /> : <div>Loading...</div>,
        'User_Dashboard': typeof User_Dashboard !== 'undefined' ? <User_Dashboard /> : <div>Loading...</div>,
        'Create_Requisition': typeof Create_Requisition !== 'undefined' ? <Create_Requisition /> : <div>Loading...</div>,
        'My_Requisitions': typeof My_Requisitions !== 'undefined' ? <My_Requisitions /> : <div>Loading...</div>,
        'Requisition_Detail': typeof Requisition_Detail !== 'undefined' ? <Requisition_Detail /> : <div>Loading...</div>,
        'User_Profile': typeof User_Profile !== 'undefined' ? <User_Profile /> : <div>Loading...</div>,
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <div style={{ padding: '10px', backgroundColor: '#333', color: 'white', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {Object.keys(components).map(key => (
                    <button 
                        key={key} 
                        onClick={() => setCurrentComponent(key)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: currentComponent === key ? '#16a34a' : '#555',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {key.replace('_', ' ')}
                    </button>
                ))}
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
                {components[currentComponent]}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
