import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';


export default function DropdownMenu({ onProfile, onUploadCVs, onLogout }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadCVs = () => {
        if (selectedFile) {
            onUploadCVs(selectedFile);
        }
        handleClose();
    };

    return (
        <div>
            <input
                type="file"
                style={{ display: 'none' }}
                id="upload-cvs-input"
                onChange={handleFileChange}
            />
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); onProfile(); }}>Profile</MenuItem>
                <MenuItem onClick={() => document.getElementById('upload-cvs-input').click()}>Upload CVs</MenuItem>
                <MenuItem onClick={() => { handleClose(); onLogout(); }}>Logout</MenuItem>
            </Menu>
        </div>
    );
}