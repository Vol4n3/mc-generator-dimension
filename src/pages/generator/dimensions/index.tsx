import {useState} from 'react';
import {Button} from '../../../components/button';
import {DimensionType, MinecraftDimensionTypes} from '../../../interface/dimension-type';
import {exportFiles} from '../../../utils/export-zip';
import styled from 'styled-components';
import {MainTemplate} from '../../../components/template/main.template';
import {Biome, biomes, SurfaceBuilders} from '../../../interface/biome';
import {NoiseSettings, noiseSettingsDefault} from '../../../interface/noise-settings';
import {InputLabel} from '../../../components/input/input-label';
import {NavTabBar} from '../../../components/tab/nav-tab-bar';
import {DimensionPanels} from '../../../components/forms/dimension/dimension-panels';
import {Dimension} from '../../../interface/dimension';
import {BiomesPanels} from '../../../components/forms/biome/biomes-panels';
import {DimensionTypePanels} from '../../../components/forms/dimension-type/dimension-type-panels';
import {KeyframesConfig, Phase} from '../../../components/phase';
import {TagCloud} from '../../../components/tag-cloud';
import {LabelWrapper} from '../../../components/label-wrapper';

const FixedBottomLeft = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const ExtendedDiv = styled.div`
width: 100%;
padding:25px;
position: relative;
`;
const DimensionsPage = () => {
  const [getDimensions, setDimensions] = useState<Dimension[]>([]);
  const [getDimensionType, setDimensionType] = useState<DimensionType[]>([]);
  const [getNoiseSettings] = useState<NoiseSettings[]>([]);
  const [getBiomes, setBiomes] = useState<Biome[]>([]);
  const [getNamespace, setNamespace] = useState<string>('generator');
  const [getSelectedTab, setSelectedTab] = useState<number>(0);
  const isFill: boolean = !!(getDimensions.length || getBiomes.length || getDimensionType.length);
  const exportData = () => {
    if (!isFill) {
      return;
    }
    exportFiles({
      dimensions: getDimensions,
      dimensionType: getDimensionType,
      noiseSettings: getNoiseSettings,
      biomes: getBiomes,
      namespace: getNamespace
    });
  };
  const scrollTop = () => {
    document.getElementById('scroll_top')?.scrollIntoView({behavior: "smooth"});
  };
  const confirmBeforeChange = (selected: number) => {
    if (getSelectedTab > 0) {
      const canChange = confirm('switch tab will not save changes');
      if (!canChange) {
        return
      }
    }
    setSelectedTab(selected);
  }
  return <MainTemplate title={'Minecraft Generator dimension 1.16.2'}>
    <div id={'scroll_top'}>
      <NavTabBar
        tabs={['home', 'Dimension', 'Dimension Type', 'Noise settings', 'Biome']}
        selectedTabs={getSelectedTab}
        onChange={confirmBeforeChange}/>
    </div>
    <Phase show={getSelectedTab === 0}
           onStarting
           enter={{keyframes: KeyframesConfig.fadeIn, delay: 250}}
           exit={{keyframes: KeyframesConfig.fadeOut}}>
      <InputLabel
        label={'Namespace'}
        caption={'Namespace is used to found custom dimension , dimension_type , noise_settings or biomes'}
        required
        readOnly={isFill ? true : undefined}
        value={getNamespace}
        onChange={(ev) => setNamespace(ev.target.value)}/>
      <div>
        <LabelWrapper label={"created dimensions"}>
          <TagCloud value={getDimensions.map(d => d.name)}
                    onChange={val => setDimensions(getDimensions.filter(item => val.indexOf(item.name) !== -1))}/>
        </LabelWrapper>
        <LabelWrapper label={"created dimensions types"}>
          <TagCloud value={getDimensionType.map(d => d.name)}
                    onChange={val => setDimensionType(getDimensionType.filter(item => val.indexOf(item.name) !== -1))}/>
        </LabelWrapper>
        <LabelWrapper label={"created biomes"}>
          <TagCloud value={getBiomes.map(d => d.name)}
                    onChange={val => setBiomes(getBiomes.filter(item => val.indexOf(item.name) !== -1))}/>
        </LabelWrapper>
        <Button onClick={exportData} disabled={!isFill}>Export all</Button>
      </div>
    </Phase>
    <Phase
      show={getSelectedTab === 1}
      onStarting
      enter={{keyframes: KeyframesConfig.fadeIn, delay: 250}}
      exit={{keyframes: KeyframesConfig.fadeOut}}>
      <ExtendedDiv>
        <DimensionPanels
          dimensions={getDimensions}
          onSubmit={dims => {
            setDimensions(dims);
            setSelectedTab(0);
          }}
          customBiomes={getBiomes.map(b => `${getNamespace}:${b.name}`)}/>
      </ExtendedDiv>
    </Phase>
    <Phase
      show={getSelectedTab === 2}
      onStarting
      enter={{keyframes: KeyframesConfig.fadeIn, delay: 250}}
      exit={{keyframes: KeyframesConfig.fadeOut}}>
      <ExtendedDiv>
        <DimensionTypePanels
          onSubmit={dts => {
            setDimensionType(dts);
            setSelectedTab(0);
          }}
          dimensionTypes={getDimensionType}/>
      </ExtendedDiv>
    </Phase>
    <Phase
      show={getSelectedTab === 3}
      onStarting
      enter={{keyframes: KeyframesConfig.fadeIn, delay: 250}}
      exit={{keyframes: KeyframesConfig.fadeOut}}>
      <ExtendedDiv>
      </ExtendedDiv>
    </Phase>
    <Phase
      show={getSelectedTab === 4}
      onStarting
      enter={{keyframes: KeyframesConfig.fadeIn, delay: 250}}
      exit={{keyframes: KeyframesConfig.fadeOut}}>
      <ExtendedDiv>
        <BiomesPanels biomes={getBiomes} onSubmit={b => {
          setBiomes(b);
          setSelectedTab(0);
        }}/>
      </ExtendedDiv>
    </Phase>
    <FixedBottomLeft>
      <Button onClick={scrollTop}>▲</Button>
    </FixedBottomLeft>

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
