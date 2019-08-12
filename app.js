
let app = {
    baseLayer: undefined,
    map: undefined,
    filter: 'none',
    key: undefined,
    init: function(){
        this.baseLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
            })
        });

        this.map = new ol.Map({
            target: 'map',
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [118, 36],
                zoom: 7
            }),
            layers: [this.baseLayer]
        });

        this.map.on('postcompose', function(evt){
            console.log(this.filter);
            let ctx = evt.context;
            ctx.filter = this.filter;
        }.bind(this))
    }
}

app.init();

function fs(type){
    if(type !== 'none'){
        type += '(100%)';
    }
    app.filter = type;
    app.map.render();
}