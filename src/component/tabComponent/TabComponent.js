import React, { useState } from 'react';
import "./TabComponent.css"

function TabComponent() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <ul className="tabComponent">
            {tabs.map((tab, index) => (
                <li
                    key={index}
                    className={index === activeTab ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick(index)}>
                    {tab.label}
                </li>
            ))}
        </ul>

    );
}

// 예시 탭 데이터
const tabs = [
    { label: '전체' },
    { label: '모집중' },
    { label: '모집 완료' }
];

export default TabComponent;
