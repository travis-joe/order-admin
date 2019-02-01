import React, { Component } from 'react';
import { Authorized as RenderAuthorized, Exception } from 'ant-design-pro';

const Authorized = RenderAuthorized('user');

interface AuthorizedProps {
  route: {
    authority: string[],
  }
  noMatch: any,
  children: Component
}

export default (props: AuthorizedProps) => {
  console.log(props)
  const { children, route: { authority } } = props
  return (
    <Authorized
      authority={authority}
      noMatch={<Exception type="403" />}>
      {children}
    </Authorized>
  );
}
