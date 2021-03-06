import Color from '../util/Color'
import Dom from '../util/Dom'
import Event from '../util/Event'
import EventMachin from '../util/EventMachin'

export default class ColorPallet extends EventMachin {
    constructor (colorpicker) {
        super();

        this.colorpicker = colorpicker; 
        this.initialize();
    } 
    
    initialize () {
        this.$el = new Dom('div', 'color');
        this.$saturation = this.$el.createChild('div', 'saturation' );    
        this.$value = this.$saturation.createChild('div', 'value' );
        this.$drag_pointer = this.$value.createChild('div', 'drag-pointer' );
    }

    setBackgroundColor (color) {
        this.$el.css("background-color", color);
    }

    refresh () {
        this.setColorUI();
    }

    caculateSV () {
        var pos = this.drag_pointer_pos || { x : 0, y : 0 };

        var width = this.state.get('$el.width');
        var height = this.state.get('$el.height');

        var s = (pos.x / width);
        var v = ((height - pos.y) / height);

        return { s , v, width, height }
    }

    setColorUI() {
        var  x = this.state.get('$el.width') * this.colorpicker.currentS, y = this.state.get('$el.height') * ( 1 - this.colorpicker.currentV );
    
        this.$drag_pointer.css({
            left : (x - 5) + "px",
            top : (y - 5) + "px"
        });
    
        this.drag_pointer_pos = { x , y };
    }


    setMainColor(e) {
        e.preventDefault();
        var pos = this.$el.position();         // position for screen
        var w = this.state.get('$el.contentWidth');
        var h = this.state.get('$el.contentHeight');

        var x = e.clientX - pos.left;
        var y = e.clientY - pos.top;
    
        if (x < 0) x = 0;
        else if (x > w) x = w;
    
        if (y < 0) y = 0;
        else if (y > h) y = h;
    
        this.$drag_pointer.css({
            left: (x - 5) + 'px',
            top: (y - 5) + 'px'
        });
    
        this.drag_pointer_pos = { x , y }
    
        this.colorpicker.caculateHSV()
        this.colorpicker.setInputColor();
    }    


    EventDocumentMouseUp (e) {
        this.isDown = false; 
    }

    EventDocumentMouseMove(e) {
        if (this.isDown) {
            this.setMainColor(e);
        }
    } 


    mousedown (e) {
        this.isDown = true; 
        this.setMainColor(e);
    }
    
    mouseup (e) {
        this.isDown = false; 
    }

}
