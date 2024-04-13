// src/components/JSTTimeDisplay.jsx
import React, { useState, useEffect } from 'react';


const JSTTimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date(); // 現在の日時を取得
            const jstOffset = 9 * 60 * 60 * 1000; // JSTはUTC+9時間なので、ミリ秒で計算
            const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // UTC時間に変換
            const jstDate = new Date(utc + jstOffset); // JST時間に変換

            // 日付と時刻のフォーマット
            const options = {
                weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            };
            // 日本のロケールを適用してフォーマット
            setCurrentTime(jstDate.toLocaleTimeString('ja-JP', options));
        }, 1000);

        return () => clearInterval(timer); // コンポーネントのアンマウント時にタイマーをクリア
    }, []);

    return (
        <div>
            現在の日本時間: {currentTime}
        </div>
    );
};

export default JSTTimeDisplay;
