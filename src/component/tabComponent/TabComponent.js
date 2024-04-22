import React, { useState } from 'react';
import "./TabComponent.css"

function TabComponent({ clickStudyRecruitState }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index, value) => {
        setActiveTab(index);
        clickStudyRecruitState(value);
    };

    return (
        <ul className="tabComponent">
            {tabs.map((tab, index) => (
                <li
                    key={index}
                    className={index === activeTab ? 'tab active' : 'tab'}
                    onClick={() => handleTabClick(index, tab.value)}>
                    {tab.label}
                </li>
            ))}
        </ul>

    );
}
const tabs = [
    { label: '전체', value: 'ALL' },
    { label: '모집중', value: 'RECRUITING' },
    { label: '모집 완료', value: 'COMPLETED' }
];


export default TabComponent;
