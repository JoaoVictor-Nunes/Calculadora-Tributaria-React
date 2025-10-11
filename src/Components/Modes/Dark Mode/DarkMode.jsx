import * as React from "react";
import "./DarkMode.css"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const DarkMode = () => {
    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark');
    }
    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'light');
    }
    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDarkMode();
        }
        else {
            setLightMode();
        }
    }
    return (
        <div className="dark-mode">
            <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                onChange={toggleTheme} />
            <label className="dark_mode_label"
                for="darkmode-toggle">
                <LightModeIcon sx={{ color: '#f0e68cff', fontSize: 30 }} />
                <DarkModeIcon sx={{ color: '#555555', fontSize: 30 }} />
            </label>
        </div>
    )
}
export default DarkMode;
