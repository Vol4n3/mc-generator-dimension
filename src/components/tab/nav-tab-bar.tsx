import {FC} from 'react';
import {Flex} from '../flex';
import {Button} from '../button';
import styled from 'styled-components';

interface NavTabBarProps {
  tabs: string[];
  selectedTabs: number;
  onChange: (selected: number) => void;
}
const Wrapper = styled.div`
  padding: 10px 0;
  background-color: #333;
  color: white;
`;
export const NavTabBar: FC<NavTabBarProps> = props => {
  const {tabs, selectedTabs, onChange} = props;

  return <Wrapper><Flex alignItems={['center']}>
    {tabs.map((t, index) => <Flex col key={t}>
      <Button onClick={_ => onChange(index)} active={selectedTabs === index}>{t}</Button>
    </Flex>)}
  </Flex></Wrapper>
};
