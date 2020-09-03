import JSZip from 'jszip';
import {Data} from '../interface/data';
import {saveAs} from 'file-saver';

export const exportFiles = (data: Data) => {
  const zip = new JSZip();
  zip.file('pack.mcmeta', JSON.stringify({
    "pack": {
      "pack_format": 6,
      "description": "Dimensions generator by Vol4n3 on https://tools.volcraft.fr"
    }
  }, null, 2))
  const dataFolder = zip.folder('data');
  const rootMinecraftFolder = dataFolder?.folder('minecraft');
  const dimensionFolder = rootMinecraftFolder?.folder('dimension');
  const mcNsDimFolder = dimensionFolder?.folder(data.namespace)
  data.dimensions.forEach((dim) => {
    mcNsDimFolder?.file(dim.name + '.json', JSON.stringify({
      type: dim.type,
      generator: dim.generator
    }, null, 2))
  });
  const rootNamespaceFolder = dataFolder?.folder(data.namespace);
  const dimensionType = rootNamespaceFolder?.folder('dimension_type');
  data.dimensionType.forEach((dim) => {
    dimensionType?.file(dim.name + '.json', JSON.stringify(dim, null, 2))
  });
  const worldgenFolder = rootNamespaceFolder?.folder('worldgen');
  const biomeFolder = worldgenFolder?.folder('biome');
  data.biomes.forEach((biome) => {
    biomeFolder?.file(biome.name + '.json', JSON.stringify(biome, null, 2))
  })
  zip.generateAsync({type: "blob"})
    .then(function (content) {
      saveAs(content, "generator_dimension.zip");
    });
}