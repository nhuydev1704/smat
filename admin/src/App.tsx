import { Button } from 'antd';
import { useState } from 'react';
import 'antd/dist/reset.css';
import PrivateLayout from './layout/Private.Layout';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <PrivateLayout />
        </>
    );
}

export default App;
