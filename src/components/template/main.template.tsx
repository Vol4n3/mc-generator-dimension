import {FC} from 'react';
import Head from 'next/head';
import styled from 'styled-components';

interface MainTemplateProps {
  title: string
}
const Main = styled.main`
  font-family: 'Open Sans', sans-serif;
  input::placeholder{
    font-family: 'Open Sans', sans-serif;
  }
  * {
    font-family: 'Open Sans', sans-serif;
    box-sizing: border-box;
  }
`;
export const MainTemplate: FC<MainTemplateProps> = props => {
  const {title, children} = props;
  return <>
    <Head>
      <title>{title}</title>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Main>
      {children}
    </Main>
  </>
}