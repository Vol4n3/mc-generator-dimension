import {FC} from 'react';
import styled from 'styled-components';
const Caption = styled.div`
  font-size: 0.80rem;
  color: #333;
`;
export const LabelWrapperCaption:FC = props => {
  const {children} = props;
  return <Caption>
    {children}
  </Caption>
}