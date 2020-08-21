import JSZip from 'jszip';
import {Data} from '../interface/data';
import {saveAs} from 'file-saver';

export const exportFiles = (data:Data)=>{
  const zip = new JSZip();
  zip.file('pack.mcmeta',JSON.stringify({
    "pack": {
      "pack_format": 6,
      "description": "Dimensions generator by Vol4n3 on https://tools.volcraft.fr"
    }
  },null,2))
  const dataFolder = zip.folder('data');
  dataFolder?.folder(data.namespace);

  zip.generateAsync({type:"blob"})
    .then(function(content) {
      saveAs(content, "generator_dimension.zip");
    });
}