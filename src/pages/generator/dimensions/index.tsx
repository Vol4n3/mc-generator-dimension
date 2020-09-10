import {FormEvent, useMemo, useState} from 'react';
import {Button} from '../../../components/button';
import {DimensionType, MinecraftDimensionTypes} from '../../../interface/dimension-type';
import {exportFiles} from '../../../utils/export-zip';
import styled from 'styled-components';
import {MainTemplate} from '../../../components/template/main.template';
import {Biome, biomes, SurfaceBuilders} from '../../../interface/biome';
import {NoiseSettings, noiseSettingsDefault} from '../../../interface/noise-settings';
import {InputLabel} from '../../../components/input/input-label';
import {NavTabBar} from '../../../components/tab/nav-tab-bar';
import {Flex} from '../../../components/flex';
import {DimensionPanels} from '../../../components/forms/dimension/dimension-panels';
import {Dimension} from '../../../interface/dimension';
import {BiomesPanels} from '../../../components/forms/biome/biomes-panels';
import {DimensionTypePanels} from '../../../components/forms/dimension-type/dimension-type-panels';

const FixedBottomLeft = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const FixedTopRight = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
`;
const HorizontalScroll = styled.div`
  overflow-x: auto;
  display:flex;
`;
const ExtendedDiv = styled.div`
width: 100vw;
padding:25px;
position: relative;
flex:none;
`;
const DimensionsPage = () => {
  const [getDimensions, setDimensions] = useState<Dimension[]>([]);
  const [getDimensionType, setDimensionType] = useState<DimensionType[]>([]);
  const [getNoiseSettings] = useState<NoiseSettings[]>([]);
  const [getBiomes, setBiomes] = useState<Biome[]>([]);
  const [getNamespace, setNamespace] = useState<string>('generator');
  const [getSelectedTab, setSelectedTab] = useState<number>(0);
  const submitData = (event: FormEvent) => {
    event.preventDefault();
    exportFiles({
      dimensions: getDimensions,
      dimensionType: getDimensionType,
      noiseSettings: getNoiseSettings,
      biomes: getBiomes,
      namespace: getNamespace
    });
  };
  const scrollTab = (value: number) => {
    setSelectedTab(value);
    document.getElementById('scroll' + value)?.scrollIntoView({behavior: "smooth"});
  };
  const scrollTop = () => {
    document.getElementById('scroll_top')?.scrollIntoView({behavior: "smooth"});
  };
  return <MainTemplate title={'Minecraft Generator dimension 1.16.2'}>
    <form onSubmit={submitData}>
      <div id={'scroll_top'}>
        <NavTabBar
          tabs={['Dimension', 'Dimension Type', 'Noise settings', 'Biome']}
          selectedTabs={getSelectedTab}
          onChange={(value) => {
            scrollTab(value)
          }}/>
      </div>
      <InputLabel
        label={'Namespace'}
        caption={'Namespace is used to found custom dimension , dimension_type , noise_settings or biomes'}
        required
        value={getNamespace}
        onChange={(ev) => setNamespace(ev.target.value)}/>
      <HorizontalScroll>
        <ExtendedDiv id={'scroll0'}>
          {useMemo(() => <DimensionPanels
            dimensions={getDimensions}
            onChange={dims => setDimensions(dims)}
            customBiomes={getBiomes.map(b => `${getNamespace}:${b.name}`)}/>, [getDimensions, getBiomes])}
        </ExtendedDiv>
        <ExtendedDiv id={'scroll1'}>
          {useMemo(() => <DimensionTypePanels onChange={dts => setDimensionType(dts)}
                                              dimensionTypes={getDimensionType}/>, [getDimensionType])}
        </ExtendedDiv>
        <ExtendedDiv id={'scroll2'}>
          <Flex justifyContent={['center']}>
            <Button style={{marginTop: '10px'}}>+ Add noise settings +</Button>
          </Flex>
        </ExtendedDiv>
        <ExtendedDiv id={'scroll3'}>
          {useMemo(() => <BiomesPanels biomes={getBiomes} onChange={b => setBiomes(b)}/>, [getBiomes])}
        </ExtendedDiv>
      </HorizontalScroll>
      <FixedBottomLeft>
        <Button onClick={scrollTop}>▲</Button>
      </FixedBottomLeft>
      <FixedTopRight>
        <Button type={'submit'}>Export</Button>
      </FixedTopRight>
    </form>
    <datalist id={'biomes'}>
      {[...biomes, ...getBiomes.map(b => `${getNamespace}:${b.name}`)].map((b, i) => <option key={b + i}
                                                                                             value={b}/>)}
    </datalist>
    <datalist id={'noise_settings'}>
      {[...noiseSettingsDefault, ...getNoiseSettings.map(ns => `${getNamespace}:${ns.name}`)].map(nsn =>
        <option key={nsn} value={nsn}/>)}
    </datalist>
    <datalist id={'dimension_type'}>
      {[...MinecraftDimensionTypes, ...getDimensionType.map(dt => `${getNamespace}:${dt.name}`)].map(dtn =>
        <option key={dtn} value={dtn}/>)}
    </datalist>
    <datalist id={'surface_builders'}>
      {[...SurfaceBuilders].map(sb =>
        <option key={sb} value={sb}/>)}
    </datalist>
  </MainTemplate>
};
export default DimensionsPage;
