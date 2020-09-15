import {FC} from 'react';
import {BiomeCarvers, CarversAir, CarversLiquid} from '../../../interface/biome';
import {Flex} from '../../flex';
import {MultiSelect} from '../../multi-select/multi-select';

interface BiomeCarversFormProps {
  carvers: BiomeCarvers;
  onChange: (bc: BiomeCarvers) => void;
}

export const BiomeCarversForm: FC<BiomeCarversFormProps> = props => {
  const {carvers, onChange} = props;
  return <>
    <h4>Carvers</h4>
    <Flex>
      <Flex col={[12, 6]}>
        <MultiSelect
          label={'Air'}
          caption={'List of carvers used to fill areas with air.'}
          values={carvers.air || []}
          uid={'carversAir'}
          options={CarversAir}
          onChange={values => onChange({...carvers, air: values})}/>
      </Flex>
      <Flex col={[12, 6]}>
        <MultiSelect
          label={'Liquid'}
          caption={'List of carvers used to fill areas with the liquid.'}
          values={carvers.liquid || []}
          uid={'carversLiquid'}
          options={CarversLiquid}
          onChange={values => onChange({...carvers, liquid: values})}/>
      </Flex>
    </Flex></>
}
