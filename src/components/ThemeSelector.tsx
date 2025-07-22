import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material';
import WiftIcon from './WiftIcon';
import type { ThemeNames } from '../themes';

interface ThemeSelectorProps {
  currentTheme: ThemeNames;
  onThemeChange: (themeName: ThemeNames) => void;
}

const themeConfig = {
  wift: {
    label: 'WIFT',
    icon: <WiftIcon />,
    description: 'WIFT brand theme with modern aesthetics',
  },
};

export default function ThemeSelector({
  currentTheme,
  onThemeChange,
}: ThemeSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (themeName: ThemeNames) => {
    onThemeChange(themeName);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Change theme">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'theme-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          color="inherit"
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {(Object.keys(themeConfig) as ThemeNames[]).map((themeName) => {
          const config = themeConfig[themeName];
          const isSelected = currentTheme === themeName;
          const hasMultipleThemes = Object.keys(themeConfig).length > 1;

          return (
            <MenuItem
              key={themeName}
              onClick={() => handleThemeSelect(themeName)}
              selected={isSelected && hasMultipleThemes}
              sx={{
                minWidth: 200,
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    isSelected && hasMultipleThemes
                      ? 'primary.main'
                      : 'inherit',
                }}
              >
                {config.icon}
              </ListItemIcon>
              <ListItemText
                primary={config.label}
                secondary={config.description}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: isSelected && hasMultipleThemes ? 600 : 400,
                    color:
                      isSelected && hasMultipleThemes
                        ? 'primary.main'
                        : 'inherit',
                  },
                }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
