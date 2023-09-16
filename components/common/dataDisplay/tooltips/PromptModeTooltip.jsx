import { Tooltip } from '@mui/material';
import { isValidElement } from 'react';

export const PromptModeTooltip = ({ promptMode, children }) => {
  function getTooltipText(promptMode) {
    if (promptMode === 'author') {
      return "Only the post's author can submit comments as prompt";
    } else {
      return 'Comments are submitted as prompt when they get enough score';
    }
  }
  return (
    <Tooltip title={getTooltipText()}>
      {isValidElement(children) ? children : <div>{children}</div>}
    </Tooltip>
  );
};
