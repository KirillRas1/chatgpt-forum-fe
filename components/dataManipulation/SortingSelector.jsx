import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function SortingMenu({ items = [] }) {
  const [showMenu, setShowMenu] = React.useState(null);
  const open = Boolean(showMenu);
  const handleClick = event => {
    setShowMenu(event.currentTarget);
  };
  const handleClose = itemSideEffect => {
    setShowMenu(null);
    itemSideEffect();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Sort
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={showMenu}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={() => handleClose(item.sideEffect)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
