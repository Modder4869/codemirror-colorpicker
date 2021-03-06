import './scss/index.scss'

import CodeMirror from 'codemirror'
import Color from './util/Color'
import HueColor from './util/HueColor'
import ColorNames from './util/ColorNames'
import ImageFilter from './util/ImageFilter'
import ColorView from './colorview/index'
import ColorPicker from './colorpicker/index'

if (CodeMirror) {

    CodeMirror.defineOption("colorpicker", false, function (cm, val, old) {
        if (old && old != CodeMirror.Init) {
    
            if (cm.state.colorpicker)
            { 
                cm.state.colorpicker.destroy(); 
                cm.state.colorpicker = null;  
    
            } 
            // remove event listener
        }
    
        if (val)
        {
            cm.state.colorpicker = new ColorView(cm, val);
        }
    });
}
 

export default {
    Color,
    ImageFilter,
    ColorNames,
    HueColor,
    ColorPicker
}