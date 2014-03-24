/**
*补丁
*/
Ext.override(Ext.grid.GridView,{
    destroy : function(){
        if(this.colMenu){
            this.colMenu.destroy();
            delete this.colMenu;
        }
        if(this.hmenu){
            this.hmenu.destroy();
            delete this.hmenu;
        }
        if(this.grid.enableColumnMove){
            var dds = Ext.dd.DDM.ids['gridHeader' + this.grid.getGridEl().id];
            if(dds){
                for(var dd in dds){
                    if(!dds[dd].config.isTarget && dds[dd].dragElId){
                        var elid = dds[dd].dragElId;
                        dds[dd].unreg();
                        Ext.get(elid).remove();
                    } else if(dds[dd].config.isTarget){
                        dds[dd].proxyTop.remove();
                        dds[dd].proxyBottom.remove();
                        dds[dd].unreg();
                    }
                    if(Ext.dd.DDM.locationCache[dd]){
                        delete Ext.dd.DDM.locationCache[dd];
                    }
                }
                delete Ext.dd.DDM.ids['gridHeader' + this.grid.getGridEl().id];
            }
        }
        Ext.destroy(this.splitone);
        this.scroller.removeAllListeners();
        this.mainHd.removeAllListeners();
        Ext.fly(this.innerHd).removeAllListeners();
        this.focusEl.removeAllListeners();
        Ext.destroy(this.resizeMarker, this.resizeProxy);
        if(this.dragZone){
            this.dragZone.unreg();
        }
        this.initData(null, null);
        Ext.EventManager.removeResizeListener(this.onWindowResize, this);
    }
});
