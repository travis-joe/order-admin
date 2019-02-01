/**
 *  Router:
 *    - src/routes/PrivateRoute.tsx
 */

import React from 'react';
import { Redirect } from 'react-router';

import styles from './index.less';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>

      <Redirect to="/orders/list" />
    </div>
  );
}
