import React, { useReducer, memo } from 'react';
import User from '../presentational/content/User';

const UserContainer = () => {
  return <User />;
}

export default memo(UserContainer);
