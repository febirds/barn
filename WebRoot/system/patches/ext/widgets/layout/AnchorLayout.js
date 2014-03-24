/**
 * Anchor布局管理器的补丁
 * Anchor在Ext2.x中并不完全完成
 */
Ext.override(Ext.layout.AnchorLayout,{
    onLayout : function(ct, target){
        Ext.layout.AnchorLayout.superclass.onLayout.call(this, ct, target);
        var size = this.getAnchorViewSize(ct, target);
        var w = size.width, h = size.height;
        if(w < 20 || h < 20){
            return;
        }
        var aw, ah;
        if(ct.anchorSize){
            if(typeof ct.anchorSize == 'number'){
                aw = ct.anchorSize;
            }else{
                aw = ct.anchorSize.width;
                ah = ct.anchorSize.height;
            }
        }else{
            aw = ct.initialConfig.width;
            ah = ct.initialConfig.height;
        }
        var cs = ct.items.items, len = cs.length, i, c, a, cw, ch;
        var ha = 0;
        for(i = 0; i < len; i++){
            c = cs[i];
            if(c.anchor){
                a = c.anchorSpec;
                if(!a){ 
                    var vs = c.anchor.split(' ');
                    c.anchorSpec = a = {
                        right: this.parseAnchor(vs[0], c.initialConfig.width, aw),
                        bottom: this.parseAnchor(vs[1], c.initialConfig.height, ah)
                    };
                }
                cw = a.right ? this.adjustWidthAnchor(a.right(w), c) : undefined;
                ch = a.bottom ? this.adjustHeightAnchor(a.bottom(h), c) : undefined;

                if(cw || ch){
                    c.setSize(cw || undefined, ch ? ch-ha : undefined);
                }
            }
            ha = ha + c.el.getHeight();
        }
    }
});